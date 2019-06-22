import {Component} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {CurrentItems} from './commons/current-items.service';
import * as moment from 'moment';
import {AuthenticationService} from './authentication/authentication-service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from './authentication/login/login.component';
import {InitUserService} from './user/init-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _router: Router, private _items: CurrentItems, public auth: AuthenticationService,
              private _ngbModal: NgbModal, private _userInit: InitUserService) {
    moment.locale('fr');
    // this._router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     console.log('URL: ' + event.url);
    //   }
    // });

    if (!this._userInit.hasInitialUser()) {
      this._userInit.openAddModal();
    }

    if (this._userInit.hasInitialUser() && !this.auth.isAuthenticated) {
      this._ngbModal.open(LoginComponent, {backdrop: 'static'});
    }
  }
}
