import {Component} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {ArticleAddComponent} from '../article-add/article-add.component';
import {AlertEmitter} from '../../commons/alert.emitter';
import {ArticleRepository} from '../article.repository';
import {Article} from '../../models/article';
import {List} from '@everest/collections';
import {ArticleSQLRepository} from '../article-SQLRepository';
import {ElectronService} from 'ngx-electron';
import {StockSummary} from '../../models/stock-summary';
import {Cart} from '../../cart/cart';

@Component({
  templateUrl: 'article-list.component.html'
})
export class ArticleListComponent {
  articles: List<Article> = new List();
  summary = new StockSummary();

  constructor(private ngbModal: NgbModal, private articleRepository: ArticleRepository,
              private alertEmitter: AlertEmitter, public cart: Cart) {

    this.articles = this.articleRepository.list();
    this.summary = new StockSummary(this.articles);
    this.summary.compute();
  }

  openAddArticleModal() {
    const modalRef = this.ngbModal.open(ArticleAddComponent, {backdrop: 'static'});
    modalRef.componentInstance.articles = this.articles;
  }

  alert() {
    this.alertEmitter.error('Message d\'erreur à votre attention');
  }

  addToCart(article: Article) {
    this.cart.addItem(article);
  }
}
