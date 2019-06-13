import {Component} from '@angular/core';
import {Order} from '../../models/order';
import {List} from '@everest/collections';
import {OrderRepository} from '../order.repository';

@Component({
  templateUrl: 'order-list.component.html'
})
export class OrderListComponent {
  orders = new List<Order>();

  constructor(private _repository: OrderRepository) {
    this.orders = this._repository.list({}, ['customer', 'orderItems', 'orderItems.article']);
  }
}
