import {Component, Input} from '@angular/core';
import {User} from '../../models/user.model';
import {List} from '@everest/collections';

@Component({
  templateUrl: 'order-tab.component.html',
  selector: 'app-order-tab'
})
export class OrderTabComponent {
  @Input()
  orders: List<User>;
}
