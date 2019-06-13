import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonsModule} from '../commons/commons.module';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {CartManageComponent} from './cart-manage/cart-manage.component';
import {CartManageLauncher} from './cart-manage/cart-manage-launcher';
import {CartModule} from '../cart/cart.module';
import {FormsModule} from '@angular/forms';
import {CustomerModule} from '../customer/customer.module';
import {OrderItemComponent} from './item/order-item.component';
import {OrderAddComponent} from './add/order-add.component';
import {OrderRepository} from './order.repository';
import {OrderItemRepository} from './order-item.repository';
import {RouterModule, Routes} from '@angular/router';
import {OrderHomeComponent} from './home/order-home.component';
import {OrderListComponent} from './list/order-list.component';
import {LayoutModule} from '../layout/layout.module';
import {MomentModule} from 'angular2-moment';
import {PaymentRepository} from './payment.repository';
import {PaymentAddComponent} from './payment/payment-add.component';


const routes: Routes = [
  {path: 'orders/list', component: OrderListComponent},
  {path: 'orders/:orderId/home', component: OrderHomeComponent}
];

@NgModule({
  imports: [BrowserModule, FormsModule, CommonsModule, CartModule, NgbModalModule, NgbModalModule, CustomerModule,
    RouterModule.forRoot(routes, {useHash: true}), LayoutModule, MomentModule],
  declarations: [CartManageComponent, OrderItemComponent, OrderAddComponent, OrderHomeComponent,
    OrderListComponent, PaymentAddComponent],
  entryComponents: [CartManageComponent, OrderItemComponent, OrderAddComponent, PaymentAddComponent],
  providers: [CartManageLauncher, OrderRepository, OrderItemRepository, PaymentRepository]
})
export class OrderModule {

}
