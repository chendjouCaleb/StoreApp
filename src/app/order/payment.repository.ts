import {Repository} from '../commons/repository';
import {Order, Payment} from '../models/order';
import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Injectable()
export class PaymentRepository extends Repository<Payment> {
  public constructor(public _electron: ElectronService) {
    super(_electron);
  }

  get resource(): string {
    return 'payments';
  }

  anyToType(value: any): Payment {
    return Payment.anyToType(value);
  }
}
