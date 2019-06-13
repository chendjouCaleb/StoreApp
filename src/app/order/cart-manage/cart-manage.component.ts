import {Component, Input} from '@angular/core';
import {Cart} from '../../cart/cart';
import {NgbActiveModal, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Customer} from '../../models/customer';
import {CustomerAddComponent} from '../../customer/add/customer-add.component';
import {OrderAddComponent} from '../add/order-add.component';
import {AlertEmitter} from '../../commons/alert.emitter';

@Component({
  templateUrl: 'cart-manage.component.html',
  selector: 'app-cart-process'
})
export class CartManageComponent {
  @Input()
  cart: Cart;

  constructor(public modal: NgbActiveModal, private ngbModal: NgbModal, private _alertEmitter: AlertEmitter) {
  }

  chooseCustomer(customer: Customer) {
    this.cart.customer = customer;
  }

  addCustomer() {
    const modalRef: NgbModalRef = this.ngbModal.open(CustomerAddComponent, {backdrop: 'static'});

    modalRef.result.then(customer => {
      if (customer) {
        this.cart.customer = customer;
      }
    });
  }

  clear() {
    this.cart.customer = null;
    this.cart.payment = 0;
    this.cart.clear();
    this.modal.close();
  }

  addOrderModal() {
    if (!this.cart.customer) {
      this._alertEmitter.error('Veuillez renseigner le client de la commande');
      return;
    }
    const modalRef = this.ngbModal.open(OrderAddComponent, {size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.order = this.cart;

    modalRef.result.then(order => {
      if (order && order.id) {
        this.modal.close();
      }
    });

  }
}
