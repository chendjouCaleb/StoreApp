import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertEmitter} from '../../commons/alert.emitter';
import {List} from '@everest/collections';
import {Customer} from '../../models/customer';
import {CustomerForm} from '../customer.form';
import {CustomerRepository} from '../customer.repository';

@Component({
  templateUrl: 'customer-add.component.html'
})
export class CustomerAddComponent implements OnInit {
  form = new CustomerForm();

  @Input()
  customers = new List<Customer>();

  constructor(private customerRepository: CustomerRepository, public modal: NgbActiveModal, private alertEmitter: AlertEmitter) {

  }

  ngOnInit(): void {
    this.form.getControl('phoneNumber').valueChanges.subscribe(value => {
      if (this.customerRepository.find({phoneNumber: value})) {
        this.form.addError('phoneNumber', 'Ce numéro de téléphone est déjà utilisé par un client');
      }
    });

    this.form.getControl('nationalId').valueChanges.subscribe(value => {
      if (this.customerRepository.find({nationalId: value})) {
        this.form.addError('name', 'Ce numéro d\'indentité est déjà utilisé par un client');
      }
    });
  }

  add() {
    const model = this.form.getModel();

    if (this.form.valid) {
      const result = this.customerRepository.add(model);
      this.customers.add(result);
      this.alertEmitter.success('Le nouveau client a été ajouté');
      this.modal.close(result);
    }

  }


}
