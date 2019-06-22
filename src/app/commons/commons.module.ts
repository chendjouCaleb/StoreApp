import { NgModule } from '@angular/core';
import { AlertEmitter } from './alert.emitter';
import {ControlErrorComponent} from './forms/control.error.component';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {StateBadgeDirective} from './state-badge.directive';
import {PricePipe} from './pipe/price.pipe';
import {CurrentItems} from './current-items.service';
import {PhoneNumberPipe} from './pipe/phone-number.pipe';
import {OrderTabComponent} from './tab/order-tab.component';
import {RouterModule} from '@angular/router';
import {MomentModule} from 'angular2-moment';

@NgModule({
  imports: [ BrowserModule, RouterModule, CommonModule, MomentModule ],
    providers: [ AlertEmitter, CurrentItems ],
    declarations: [ ControlErrorComponent, StateBadgeDirective, PricePipe, PhoneNumberPipe, OrderTabComponent ],
  exports: [ ControlErrorComponent, StateBadgeDirective, PricePipe, PhoneNumberPipe, OrderTabComponent ]
})
export class CommonsModule {}
