import {Component, Input} from '@angular/core';
import {Customer} from '../../models/customer';

@Component({
  templateUrl: 'customer-item.component.html',
  selector: 'app-customer-item'
})
export class CustomerItemComponent {
  @Input()
  customer: Customer;
}
