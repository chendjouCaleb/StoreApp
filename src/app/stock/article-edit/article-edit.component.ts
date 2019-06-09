import {Component, Input, OnInit} from '@angular/core';
import {ArticleRepository} from '../article.repository';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertEmitter} from '../../commons/alert.emitter';
import {Article} from '../../models/article';
import {ArticleForm} from '../article.form';
import {Router} from '@angular/router';

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
    this.form.getControl('reference').valueChanges.subscribe(value => {
      const used = this.articleRepository.findByReference(value);
      if (used && used.id !== this.article.id) {
        this.form.addError('reference', 'Cette reference est déjà utilisé par un article');
      }
    });

    this.form.getControl('name').valueChanges.subscribe(value => {
      const used = this.articleRepository.findByName(value);
      if (used && used.id !== this.article.id) {
        this.form.addError('name', 'Ce nom est déjà utilisé par un article');
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
