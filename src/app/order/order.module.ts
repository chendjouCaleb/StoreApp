import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonsModule} from '../commons/commons.module';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [ BrowserModule, CommonsModule, NgbModalModule]
})
export class OrderModule {

}
