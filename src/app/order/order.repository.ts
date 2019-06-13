import {Repository} from '../commons/repository';
import {Order} from '../models/order';
import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Injectable()
export class OrderRepository extends Repository<Order> {
  public constructor(public _electron: ElectronService) {
    super(_electron);
  }


  anyToType(value: any): Order {
    return Order.anyToType(value);
  }

  get resource(): string {
    return 'orders';
  }
}
