import {Component, OnInit} from '@angular/core';
import {Order} from '../../models/order';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderRepository} from '../order.repository';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PaymentAddComponent} from '../payment/payment-add.component';

@Component({
  templateUrl: 'order-home.component.html',
  selector: 'app-order-home'
})
export class OrderHomeComponent implements OnInit {
  order: Order;

  paymentAmount = 0;

  constructor(private route: ActivatedRoute, private _repository: OrderRepository, private _ngbModal: NgbModal) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['orderId'];

    this.order = this._repository.findById(id, ['customer', 'orderItems', 'orderItems.article', 'payments']);
  }

  back() {
    if (history.length > 1) {
      history.back();
    }
  }

  paymentModal() {
    const modalRef = this._ngbModal.open(PaymentAddComponent, {backdrop: 'static'});

    modalRef.componentInstance.order = this.order;
    modalRef.componentInstance.paymentAmount = this.paymentAmount;

  }
}
