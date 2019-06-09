import {Component, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Customer} from '../models/customer';
import {Observable} from 'rxjs';
import {CustomerRepository} from './customer.repository';
import {CurrentItems} from '../commons/current-items.service';

@Injectable()
export class CustomerResolver implements Resolve<Customer> {
  constructor(private _repository: CustomerRepository, private _items: CurrentItems) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Customer> | Promise<Customer> | Customer {
    const id = +route.paramMap.get('customerId');

    const customer = this._repository.findById(id);
    this._items.put('customer', customer);
    return customer;
  }

}
