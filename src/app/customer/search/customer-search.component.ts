import {Component, EventEmitter, Output} from '@angular/core';
import {CustomerRepository} from '../customer.repository';
import {List} from '@everest/collections';
import {Customer} from '../../models/customer';


@Component({
  templateUrl: 'customer-search.component.html',
  selector: 'app-customer-search'
})
export class CustomerSearchComponent {

  @Output()
  choose = new EventEmitter();

  keyword = '';
  customers = new List<Customer>();
  list = new List<Customer>();

  suggest = false;

  constructor(private _repository: CustomerRepository) {
    this.customers = _repository.list();
  }

  search(keyword: string) {
    console.log('Key: ' + keyword);
    const result = new List<Customer>();
    this.list.clear();

    if (keyword.length === 0) {
      return;
    }

    result.addRange(this.customers.findAll(c => c.nationalId.indexOf(keyword) > -1));

    result.addRange(this.customers.findAll(c => c.phoneNumber.indexOf(keyword) > -1));

    result.addRange(this.customers.findAll(c => (c.name + ' ' + c.surname).indexOf(keyword) > -1));

    for (const c of result) {
      if (!this.list.contains(c)) {
        this.list.add(c);
      }
    }
  }

  emitChoose(customer: Customer) {
    this.choose.emit(customer);
    this.list.clear();
  }
}
