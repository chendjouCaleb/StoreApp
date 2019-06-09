import {Input, Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {EvFormControl} from './forms';

@Component({
    selector: 'app-control-error',
    templateUrl: 'control.error.component.html'
})
export class ControlErrorComponent implements OnChanges {
    @Input('control')
    control: EvFormControl;

  ngOnChanges(changes: SimpleChanges): void {
  }
}
