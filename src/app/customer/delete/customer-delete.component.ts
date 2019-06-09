import {Component, Input, OnInit} from '@angular/core';
import {CustomerRepository} from '../customer.repository';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertEmitter} from '../../commons/alert.emitter';
import {Customer} from '../../models/customer';
import {CustomerForm} from '../customer.form';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'customer-delete.component.html'
})
export class CustomerDeleteComponent implements OnInit {
  @Input()
  customer: Customer;

  constructor(private customerRepository: CustomerRepository, public modal: NgbActiveModal, private router: Router,
              private alertEmitter: AlertEmitter) {  }

  ngOnInit(): void {  }

  deleteCustomer() {
    this.customerRepository.delete(this.customer);
    this.alertEmitter.info(`Le client ${this.customer.name} a été supprimé.`);
    this.router.navigateByUrl('/customers/list');
    this.modal.close();
  }


}
