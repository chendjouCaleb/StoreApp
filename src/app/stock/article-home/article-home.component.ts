import {Component} from '@angular/core';
import {Article} from '../../models/article';
import {CurrentItems} from '../../commons/current-items.service';
import {ArticleAddComponent} from '../article-add/article-add.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ArticleEditComponent} from '../article-edit/article-edit.component';
import {ArticleDeleteComponent} from '../article-delete/article-delete.component';
import {ArticleQuantityComponent} from '../article-quantity/article-quantity.component';
import {Cart} from '../../cart/cart';

@Component({
  templateUrl: 'article-home.component.html'
})
export class ArticleHomeComponent {
  article: Article;

  constructor(private _items: CurrentItems, private _ngbModal: NgbModal, public cart: Cart) {
    this.article = this._items.find('article');
    this.article.image = 'assets/default-article.jpg';
  }

  back() {
    if (history.length > 1) {
      history.back();
    }
  }

  openEditArticleModal() {
    const modalRef = this._ngbModal.open(ArticleEditComponent, {backdrop: 'static'});
    modalRef.componentInstance.article = this.article;
  }

  openDeleteArticleModal() {
    const modalRef = this._ngbModal.open(ArticleDeleteComponent, {backdrop: 'static'});
    modalRef.componentInstance.article = this.article;
  }

  addQuantity() {
    const modalRef = this._ngbModal.open(ArticleQuantityComponent, {backdrop: 'static'});
    modalRef.componentInstance.article = this.article;
    modalRef.componentInstance.mode = 'add';
  }

  minusQuantity() {
    const modalRef = this._ngbModal.open(ArticleQuantityComponent, {backdrop: 'static'});
    modalRef.componentInstance.article = this.article;
    modalRef.componentInstance.mode = 'minus';
  }
}
