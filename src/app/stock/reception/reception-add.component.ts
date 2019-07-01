import {Component, Input, OnInit} from '@angular/core';
import {ReceptionForm, ReceptionItemForm} from './reception.form';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {List} from '@everest/collections';
import {Article} from '../../models/article';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ReceptionItem} from '../../models/reception';
import {ArticleAddComponent} from '../article-add/article-add.component';
import {AlertEmitter} from '../../commons/alert.emitter';
import {ReceptionItemRepository, ReceptionRepository} from '../reception.repository';
import {ArticleRepository} from '../article.repository';

@Component({
  templateUrl: 'reception-add.component.html'
})
export class ReceptionAddComponent implements OnInit {
  form: ReceptionForm;
  itemForm = new ReceptionItemForm();

  @Input()
  articles: List<Article>;

  searchArticleList: List<Article>;

  articleName: any;

  article: Article;

  items = new List<ReceptionItem>();

  constructor(public modal: NgbActiveModal, private _ngbModal: NgbModal, private _alert: AlertEmitter,
              private _receptionRepository: ReceptionRepository, private _receptionItemRepository: ReceptionItemRepository,
              private _articleRepository: ArticleRepository) {
    this.form = new ReceptionForm();
    this.form.doValidation();
  }

  ngOnInit(): void {
    this.searchArticleList = this.articles.clone();
    this.form.doValidation();
  }

  addItem() {

    const item = this.itemForm.getModel();
    item.article = this.article;

    this.items.insert(0, item);

    this.searchArticleList.remove(this.article);
    this.articleName = null;
    this.article = null;
    this.itemForm.reset();


  }

  removeItem(item: ReceptionItem) {
    this.items.remove(item);
  }

  select(article: Article) {
    console.log(article);
    this.article = article;
  }

  search = (text$: Observable<string>): Observable<Article[]> => {
    return text$.pipe(map(
      t => {

        return this.searchArticleList
          .findAll(a => a.name.toLocaleLowerCase().indexOf(t.toLocaleLowerCase()) > -1)
          .toArray();
      }
    ));
  };

  formatter = (x: Article) => x.name;

  openAddArticleModal() {
    const modalRef = this._ngbModal.open(ArticleAddComponent, {backdrop: 'static'});
    modalRef.componentInstance.articles = this.articles;
    modalRef.result.then(article => {
      if (article) {
        this.article = article;
      }
    });
  }


  addReception() {
    this.form.doValidation();
    if (this.form.invalid) {
      return;
    }

    let reception = this.form.getModel();
    reception = this._receptionRepository.add(reception);

    this.items.forEach(item => {
      item.reception = reception;
      this._receptionItemRepository.add(item);
      item.article.quantity += item.quantity;
      this._articleRepository.update(item.article);
    });

    this._alert.info('La reception de marchandise à été correctement effectuée.');
    this.modal.close();
  }

}
