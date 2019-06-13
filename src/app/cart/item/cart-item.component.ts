import {Component, Input} from '@angular/core';
import {Cart} from '../cart';
import {OrderItem} from '../../models/order';

@Component({
  templateUrl: 'cart-item.component.html',
  selector: 'app-cart-item'
})
export class CartItemComponent {
  @Input()
  cart: Cart;

  updateQuantity(item: OrderItem, value: string) {
    const quantity = +value;

    if (quantity > item.article.quantity) {
      item.quantity = item.article.quantity;
    }
    item.article.countInCart = quantity;
    this.cart.calculate();
  }

}
