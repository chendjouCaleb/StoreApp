import {Component, Input} from '@angular/core';

@Component({
  templateUrl: 'order-item.component.html',
  selector: 'app-order-item'
})
export class OrderItemComponent {
  @Input()
  order;
}
