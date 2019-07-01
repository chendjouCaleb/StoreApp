import {Component} from '@angular/core';
import {Cart} from '../cart';

@Component({
  templateUrl: 'cart-bar.component.html',
  selector: 'app-cart-bar'
})
export class CartBarComponent {
  constructor(public cart: Cart) {
  }
}
