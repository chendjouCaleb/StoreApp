import {Repository} from '../commons/repository';
import {Customer} from '../models/customer';
import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Injectable()
export class CustomerRepository extends Repository<Customer> {

  public constructor(public _electron: ElectronService) {
    super(_electron);
  }

  anyToType(value: any): Customer {
    return Customer.anyToType(value);
  }

  get resource(): string {
    return 'customers';
  }

}
