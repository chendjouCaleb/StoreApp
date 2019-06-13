import {Repository} from '../commons/repository';
import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {OrderItem} from '../models/order';

@Injectable()
export class OrderItemRepository extends Repository<OrderItem> {
  public constructor(public _electron: ElectronService) {
    super(_electron);
  }


  anyToType(value: any): OrderItem {
    return OrderItem.anyToType(value);
  }

  get resource(): string {
    return 'orderItems';
  }
}
