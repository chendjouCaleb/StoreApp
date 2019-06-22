import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonsModule} from '../commons/commons.module';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from './login/login.component';
import {AuthenticatedGuard} from './authenticated-guard';
import {AuthenticationService} from './authentication-service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, FormsModule, CommonsModule, NgbModalModule],
  providers: [AuthenticatedGuard, AuthenticationService],
  declarations: [LoginComponent],
  entryComponents: [LoginComponent]
})
export class AuthenticationModule {

}
