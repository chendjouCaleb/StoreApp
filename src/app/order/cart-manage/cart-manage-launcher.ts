import {Injectable} from '@angular/core';
import {Cart} from '../../cart/cart';
import {CartManageComponent} from './cart-manage.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertEmitter} from '../../commons/alert.emitter';

@Injectable()
export class CartManageLauncher {
  constructor(private _ngbModal: NgbModal, private _cart: Cart, private _alert: AlertEmitter) {
  }

  launch() {
    if (this._cart.size > 0) {
      const modalRef = this._ngbModal.open(CartManageComponent, { size: 'lg', backdrop: 'static'});
      modalRef.componentInstance.cart = this._cart;
    } else {
      this._alert.error('La commande est vide!');
    }
  }
}
