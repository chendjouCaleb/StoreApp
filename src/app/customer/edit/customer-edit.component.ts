import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertEmitter} from '../../commons/alert.emitter';
import {Customer} from '../../models/customer';
import {CustomerForm} from '../customer.form';
import {CustomerRepository} from '../customer.repository';

@Component({
  templateUrl: 'customer-edit.component.html'
})
export class CustomerEditComponent implements OnInit {
  form = new CustomerForm();

  @Input()
  customer: Customer;

  constructor(private customerRepository: CustomerRepository, public modal: NgbActiveModal, private alertEmitter: AlertEmitter) {

  }

  ngOnInit(): void {
    this.form = new CustomerForm(this.customer);
    let used: Customer;
    const phoneNumber = this.form.getControl('phoneNumber');
    const nationalId = this.form.getControl('nationalId');

    phoneNumber.valueChanges.subscribe(value => {
      used = this.customerRepository.find({phoneNumber: value});
      if (used && used.id !== this.customer.id) {
        phoneNumber.addError('Ce numéro de téléphone est déjà utilisé par un client');
      }
    });

    nationalId.valueChanges.subscribe(value => {
      used = this.customerRepository.find({nationalId: value});
      if (used && used.id !== this.customer.id) {
        nationalId.addError('Ce numéro d\'indentité est déjà utilisé par un client');
      }
    });
  }

  update() {

    if (this.form.valid) {
      const model = this.form.getModel();
      this.customer.name = model.name;
      this.customer.surname = model.surname;
      this.customer.phoneNumber = model.phoneNumber;
      this.customer.nationalId = model.nationalId;
      this.customerRepository.update(this.customer);
      this.alertEmitter.success('Les informations du client ont été mise à jour');
      this.modal.close();
    }

  }


}
