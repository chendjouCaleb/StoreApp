import {Component, Input, OnInit} from '@angular/core';
import {ArticleRepository} from '../article.repository';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertEmitter} from '../../commons/alert.emitter';
import {Article} from '../../models/article';
import {ArticleForm} from '../article.form';

@Component({
  templateUrl: 'article-edit.component.html'
})
export class ArticleEditComponent implements OnInit {
  form = new ArticleForm();

  @Input()
  article: Article;

  constructor(private articleRepository: ArticleRepository, public modal: NgbActiveModal, private alertEmitter: AlertEmitter) {

  }

  ngOnInit(): void {
    this.form = new ArticleForm(this.article);
    const reference = this.form.getControl('reference');
    const name = this.form.getControl('name');

    reference.valueChanges.subscribe(value => {
      const used = this.articleRepository.findByReference(value);
      if (used && used.id !== this.article.id) {
        reference.addError('Cette reference est déjà utilisé par un article');
      }
    });

    name.valueChanges.subscribe(value => {
      const used = this.articleRepository.findByName(value);
      if (used && used.id !== this.article.id) {
        name.addError('Ce nom est déjà utilisé par un article');
      }
    });
  }

  add() {
    const model = this.form.getModel();

    if (this.form.valid) {
      this.article.name = model.name;
      this.article.reference = model.reference;
      this.article.buyingPrice = model.buyingPrice;
      this.article.sellingPrice = model.sellingPrice;
      this.articleRepository.update(this.article);
      this.alertEmitter.info('L\'article a été modifié');
      this.modal.close();
    }

  }


}
