import {Component, Input} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PaymentRepository} from '../payment.repository';
import {Order, Payment} from '../../models/order';
import {AlertEmitter} from '../../commons/alert.emitter';

@Component({
  templateUrl: 'payment-add.component.html'
})
export class PaymentAddComponent {
  @Input()
  paymentAmount: number;

  @Input()
  order: Order;

  constructor(public modal: NgbActiveModal, private _repository: PaymentRepository, private _alert: AlertEmitter) {
  }

  addPayment() {
    const payment = new Payment(this.paymentAmount, this.order);

    this.order.payments.push(payment);

    this._repository.add(payment);
    this._alert.success('Le paiement a été effectué!');
    this.modal.close();
  }

}
