import {EvFormControl, EvFormGroup} from '../commons/forms/forms';
import {Customer} from '../models/customer';

export class CustomerForm extends EvFormGroup<Customer> {
  constructor(customer = new Customer()) {
    super({
      name: new EvFormControl('nom', 'name', customer.name, null),
      surname: new EvFormControl('surname', 'surname', customer.surname, null),
      phoneNumber: new EvFormControl('phoneNumber', 'phoneNumber', customer.phoneNumber, null),
      nationalId: new EvFormControl('nationalId', 'nationalId', customer.nationalId, null),
    });
  }

  getModel(): Customer {
    const customer = new Customer();
    customer.phoneNumber = this.value.phoneNumber;
    customer.name = this.value.name;
    customer.surname = this.value.surname;
    customer.nationalId = this.value.nationalId;
    return customer;
  }
}
