import {Component, OnInit} from '@angular/core';
import {CustomerRepository} from '../customer.repository';
import {List} from '@everest/collections';
import {Customer} from '../../models/customer';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomerAddComponent} from '../add/customer-add.component';

@Component({
  templateUrl: 'customer-list.component.html'
})
export class CustomerListComponent implements OnInit {
  customers: List<Customer> = new List();
  constructor(private _repository: CustomerRepository, private _ngbModal: NgbModal) {}

  ngOnInit(): void {
    this.customers = this._repository.list();
  }

  openAddModal() {
    const modalRef = this._ngbModal.open(CustomerAddComponent, { backdrop: 'static'});
    modalRef.componentInstance.customers = this.customers;
  }
}
