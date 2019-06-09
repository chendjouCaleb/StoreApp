import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AlertEmitter {

constructor() {

}

    onAlert = new Subject<AlertDescriptor>();

    info(message: string, className = 'bg-info', time = 5000 ) {
        const descriptor = new AlertDescriptor(message, className, time);
        this.onAlert.next(descriptor);

        const div = document.createElement('div');
        div.classList.add('row',  'p-3', 'm-0', 'text-light', className);
        div.style.position = 'fixed';
        div.style.zIndex = '3000';
        div.style.marginLeft = 'auto';
        div.style.transition = 'all .3s';

        div.innerText = message;

        window.document.body.appendChild(div);

        const height = div.offsetHeight;

        div.style.bottom = -height + 'px';


        setTimeout(() => div.style.bottom = '0', 10);

        setTimeout(() => div.style.bottom = -height + 'px', time);
        setTimeout(() => document.body.removeChild(div), time + 400);
    }

    error(message: string, time = 5000) {
        this.info(message, 'bg-danger', time);
    }

    success(message: string, time = 5000) {
        this.info(message, 'bg-success', time);
    }
}


export class AlertDescriptor {
    constructor(
    public message: string,
    public className = 'bg-info',
    public time = 5000
    ) {}
}
