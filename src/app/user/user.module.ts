import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {UserListComponent} from './list/user-list.component';
import {RouterModule, Routes} from '@angular/router';
import {LayoutModule} from '../layout/layout.module';
import {UserRepository} from './user.repository';
import {UserAddComponent} from './add/user-add.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonsModule} from '../commons/commons.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MomentModule} from 'angular2-moment';
import {UserHomeComponent} from './home/user-home.component';
import {UserResolver} from './user.resolver';
import {UserDeleteComponent} from './delete/user-delete.component';
import {UserEditPasswordComponent} from './password/user-edit-password.component';

const routes: Routes = [
  {path: 'users/:userId/home', component: UserHomeComponent, resolve: [ UserResolver ] },
  {path: 'users/list', component: UserListComponent}
];

@NgModule({
  imports: [ BrowserModule, LayoutModule, CommonsModule, FormsModule, ReactiveFormsModule, MomentModule,
    NgbModalModule, RouterModule.forRoot(routes, {useHash: true}) ],
  declarations: [ UserListComponent, UserAddComponent, UserHomeComponent, UserDeleteComponent, UserEditPasswordComponent ],
  providers: [ UserRepository, UserResolver ],
  entryComponents: [ UserAddComponent, UserDeleteComponent, UserEditPasswordComponent ]
})
export class UserModule {

}
