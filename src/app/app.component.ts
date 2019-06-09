import {Component} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {CurrentItems} from './commons/current-items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _router: Router, private _items: CurrentItems) {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('URL: ' + event.url);
      }
    });
  }
}
