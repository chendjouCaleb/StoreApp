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
    const customer = new Customer();
    customer.id = value.id;
    customer.name = value.name;
    customer.surname = value.surname;
    customer.nationalId = value.nationalId;
    customer.phoneNumber = value.phoneNumber;
    customer.registrationDate = value.registrationDate;

    return customer;
  }

  get resource(): string {
    return 'customers';
  }

}
