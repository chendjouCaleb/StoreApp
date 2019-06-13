import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArticleListComponent} from './article-list/article-list.component';
import {BrowserModule} from '@angular/platform-browser';
import {LayoutModule} from '../layout/layout.module';
import {ArticleAddComponent} from './article-add/article-add.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonsModule} from '../commons/commons.module';
import {ArticleRepository} from './article.repository';
import {CategoryRepository} from './category.repository';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ElectronService} from 'ngx-electron';
import {ArticleHomeComponent} from './article-home/article-home.component';
import {ArticleResolver} from './article.resolver';
import {ArticleEditComponent} from './article-edit/article-edit.component';
import {ArticleDeleteComponent} from './article-delete/article-delete.component';
import {ArticleQuantityComponent} from './article-quantity/article-quantity.component';

const routes: Routes = [
  // {path: '', redirectTo: 'articles/list', pathMatch: 'full'},
  {path: '', component: ArticleListComponent},
  {path: 'articles/list', component: ArticleListComponent },
  {path: 'articles/:articleId/home', component: ArticleHomeComponent, resolve: [ ArticleResolver ] }
];

@NgModule({
  imports: [BrowserModule, LayoutModule, RouterModule.forRoot(routes, {useHash: true}), NgbModalModule, CommonsModule,
  FormsModule, ReactiveFormsModule],
  declarations: [ ArticleListComponent, ArticleAddComponent, ArticleHomeComponent, ArticleEditComponent,
    ArticleDeleteComponent, ArticleQuantityComponent ],
  entryComponents: [ ArticleAddComponent, ArticleEditComponent, ArticleDeleteComponent, ArticleQuantityComponent ],
  providers: [ ArticleRepository, CategoryRepository, ArticleResolver, ElectronService ]
})
export class StockModule {

}
