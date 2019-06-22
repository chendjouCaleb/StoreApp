import {Component, Input, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {LayoutInstance} from './layout-instance';
import {Cart} from '../cart/cart';
import {CartManageLauncher} from '../order/cart-manage/cart-manage-launcher';
import {AuthenticationService} from '../authentication/authentication-service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from '../authentication/login/login.component';
import {AlertEmitter} from '../commons/alert.emitter';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {
  @Input()
  title: string;
  visible = false;
  username: string;

  constructor(private appTitle: Title, private _instance: LayoutInstance, public cart: Cart,
              public orderProcessLauncher: CartManageLauncher, public auth: AuthenticationService,
              private _alert: AlertEmitter,
              private _ngbModal: NgbModal) {
    this.visible = this._instance.showSidebar;
  }

  ngOnInit(): void {
    if (!this.title) {
      this.title = 'Application';
    }

    this.appTitle.setTitle(this.title);

  }

  toggle() {
    this.visible = !this.visible;
    this._instance.showSidebar = !this._instance.showSidebar;
  }

  processCart() {
    this.orderProcessLauncher.launch();
  }

  logout() {
    this.auth.logout();
    this._ngbModal.open(LoginComponent);
    this._alert.info('Vous êtes maintenant déconnecté');
  }
}
