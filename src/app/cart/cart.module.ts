import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonsModule} from '../commons/commons.module';
import {CartBarComponent} from './cart-bar/cart-bar.component';
import {Cart} from './cart';
import {CartItemComponent} from './item/cart-item.component';
import {CartProcessComponent} from './process/cart-process.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [BrowserModule, CommonsModule, FormsModule],
  declarations: [CartBarComponent, CartItemComponent, CartProcessComponent],
  exports: [CartBarComponent, CartProcessComponent, CartItemComponent],
  entryComponents: [CartProcessComponent],
  providers: [Cart],
})
export class CartModule {

}
