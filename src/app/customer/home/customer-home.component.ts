import {Component} from '@angular/core';
import {Customer} from '../../models/customer';
import {CurrentItems} from '../../commons/current-items.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomerEditComponent} from '../edit/customer-edit.component';
import {CustomerDeleteComponent} from '../delete/customer-delete.component';
import {OrderRepository} from '../../order/order.repository';
import {List} from '@everest/collections';
import {Order} from '../../models/order';

@Component({
  templateUrl: 'customer-home.component.html'
})
export class CustomerHomeComponent {
  customer: Customer;
  orders = new List<Order>();

  constructor(private _items: CurrentItems, private _ngbModal: NgbModal, private _orderRepository: OrderRepository) {
    this.customer = this._items.find('customer');

    this.orders = this.customer.orders;
  }

  back() {
    if (history.length > 1) {
      history.back();
    }
  }

  openEditModal() {
    const modalRef = this._ngbModal.open(CustomerEditComponent, {backdrop: 'static'});
    modalRef.componentInstance.customer = this.customer;
  }

  openDeleteModal() {
    const modalRef = this._ngbModal.open(CustomerDeleteComponent, {backdrop: 'static'});
    modalRef.componentInstance.customer = this.customer;
  }

}
