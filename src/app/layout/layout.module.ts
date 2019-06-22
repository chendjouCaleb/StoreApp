import {NgModule} from '@angular/core';
import {AppComponent} from '../app.component';
import {BrowserModule} from '@angular/platform-browser';

import {NgbDropdownModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {LayoutComponent} from './layout.component';
import {RouterModule} from '@angular/router';
import {LayoutInstance} from './layout-instance';
import {CartModule} from '../cart/cart.module';
import {CommonsModule} from '../commons/commons.module';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  exports: [ LayoutComponent ],
  imports: [
    BrowserModule,
    RouterModule,
    NgbDropdownModule,
    NgbModalModule,
    CommonsModule,
    CartModule
  ],
  providers: [LayoutInstance],
  bootstrap: [AppComponent]
})
export class LayoutModule { }
