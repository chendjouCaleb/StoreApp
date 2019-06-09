import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {UserListComponent} from './list/user-list.component';
import {RouterModule, Routes} from '@angular/router';
import {LayoutModule} from '../layout/layout.module';

const routes: Routes = [
  {path: 'users/list', component: UserListComponent}
];

@NgModule({
  imports: [ BrowserModule, LayoutModule, RouterModule.forRoot(routes, {useHash: true}) ],
  declarations: [ UserListComponent ]
})
export class UserModule {

}
