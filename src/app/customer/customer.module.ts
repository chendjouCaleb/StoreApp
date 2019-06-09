import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from '../layout/layout.module';
import {CommonModule} from '@angular/common';
import {CustomerListComponent} from './list/customer-list.component';
import {RouterModule, Routes} from '@angular/router';
import {CustomerRepository} from './customer.repository';
import {CustomerAddComponent} from './add/customer-add.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonsModule} from '../commons/commons.module';
import {CustomerHomeComponent} from './home/customer-home.component';
import {CustomerResolver} from './customer.resolver';
import {CustomerEditComponent} from './edit/customer-edit.component';
import {CustomerDeleteComponent} from './delete/customer-delete.component';


const routes: Routes = [
  {path: 'customers/list', component: CustomerListComponent},
  {path: 'customers/:customerId/home', component: CustomerHomeComponent, resolve: [ CustomerResolver ] }
];

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, LayoutModule, CommonsModule, NgbModalModule,
    RouterModule.forRoot(routes, {useHash: true})],
  providers: [ CustomerRepository, CustomerResolver ],
  declarations: [CustomerListComponent, CustomerAddComponent, CustomerHomeComponent, CustomerEditComponent, CustomerDeleteComponent ],
  entryComponents: [ CustomerAddComponent, CustomerEditComponent, CustomerDeleteComponent ]
})
export class CustomerModule {
}
