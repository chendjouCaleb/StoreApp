import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../../models/order';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomerRepository} from '../../customer/customer.repository';
import {OrderRepository} from '../order.repository';
import {AlertEmitter} from '../../commons/alert.emitter';
import {ArticleRepository} from '../../stock/article.repository';
import {OrderItemRepository} from '../order-item.repository';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'order-add.component.html',
  selector: 'app-order-add'
})
export class OrderAddComponent implements OnInit {
  @Input()
  order: Order;

  constructor(public modal: NgbActiveModal, private _repository: OrderRepository, private _alert: AlertEmitter,
              private _router: Router,
              private _orderItemRepository: OrderItemRepository, private _articleRepository: ArticleRepository) {
  }

  ngOnInit(): void { }

  process() {

    const order = this._repository.add(this.order);

    this.order.forEach(item => {
      item.article.quantity -= item.quantity;
      item.order = order;

      this._orderItemRepository.add(item);
      this._articleRepository.update(item.article);
    });


    this._alert.success(`La commande n° ${order.id} a été enregistrée`);
    this.modal.close(order);
    this._router.navigateByUrl(`/orders/${this.order.id}/home`);
  }

}
