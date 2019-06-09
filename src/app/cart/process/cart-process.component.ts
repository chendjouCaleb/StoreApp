import {Component, Input} from '@angular/core';
import {Cart} from '../cart';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: 'cart-process.component.html',
  selector: 'app-cart-process'
})
export class CartProcessComponent {
  @Input()
  cart: Cart;

  step = 1;

  constructor(public modal: NgbActiveModal) {
  }

  nextStep() {
    if (this.step < 3) {
      this.step++;
    }
  }

  prevStep() {
    if (this.step > 1) {
      this.step--;
    }
  }
}
