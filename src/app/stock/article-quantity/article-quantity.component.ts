import {Component, Input, OnInit} from '@angular/core';
import {ArticleRepository} from '../article.repository';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertEmitter} from '../../commons/alert.emitter';
import {Article} from '../../models/article';
import {ArticleForm} from '../article.form';
import {Router} from '@angular/router';
import {a} from '@angular/core/src/render3';

@Component({
  templateUrl: 'article-quantity.component.html'
})
export class ArticleQuantityComponent implements OnInit {
  form = new ArticleForm();

  @Input()
  article: Article;

  @Input()
  mode: string;

  quantity;

  initQuantity = 0;

  constructor(private articleRepository: ArticleRepository, public modal: NgbActiveModal, private alertEmitter: AlertEmitter) {

  }

  title() {
    if (this.mode === 'add') {
      return 'Augmenter la quantité';
    }
    return 'Diminuer la quantité';
  }

  updateQuantity(value) {
    if (!value || !value.toString().match('[0-9]+')) {
      value = 0;
    }
    if (this.mode === 'add') {
      this.quantity = this.initQuantity + parseFloat(value);
    } else {
      this.quantity = this.initQuantity - parseFloat(value);
      if (this.quantity < 0) {
        this.quantity = 0;
      }
    }
  }

  update() {
    this.article.quantity = this.quantity;
    this.articleRepository.update(this.article);
    this.alertEmitter.info('La quantité de l\'article en stock a été modifiée');
    this.modal.close();
  }

  ngOnInit(): void {
    this.initQuantity = this.article.quantity;
    this.quantity = this.article.quantity;
  }


}
