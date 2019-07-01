import {EvFormControl, EvFormGroup} from '../../commons/forms/forms';
import {Reception, ReceptionItem} from '../../models/reception';

export class ReceptionForm extends EvFormGroup<Reception> {
  constructor() {
    super({
      providerName: new EvFormControl('', 'providerName', null, null),
      billId: new EvFormControl('', 'billId', null, null)
    });
  }

  getModel(): Reception {
    const reception = new Reception();
    reception.providerName = this.value.providerName;
    reception.billId = this.value.billId;

    return reception;
  }
}

export class ReceptionItemForm extends EvFormGroup<ReceptionItem> {
  constructor() {
    super({
      quantity: new EvFormControl('', 'quantity', null, null),
      price: new EvFormControl('', 'price', null, null)
    });
  }

  getModel(): ReceptionItem {
    const item = new ReceptionItem();

    item.price = +this.value.price;
    item.quantity = +this.value.quantity;

    return item;
  }
}

