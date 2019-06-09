import {Component, Input, OnInit} from '@angular/core';
import {ArticleForm} from '../article.form';
import {ArticleRepository} from '../article.repository';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertEmitter} from '../../commons/alert.emitter';
import {List} from '@everest/collections';
import {Article} from '../../models/article';

@Component({
  templateUrl: 'article-add.component.html'
})
export class ArticleAddComponent implements OnInit {
  form = new ArticleForm();

  @Input()
  articles: List<Article>;

  constructor(private articleRepository: ArticleRepository, public modal: NgbActiveModal, private alertEmitter: AlertEmitter) {

  }

  ngOnInit(): void {
    this.form.getControl('reference').valueChanges.subscribe(value => {
      if (this.articleRepository.findByReference(value)) {
        this.form.addError('reference', 'Cette reference est déjà utilisé par un article');
      }
    });

    this.form.getControl('name').valueChanges.subscribe(value => {
      if (this.articleRepository.findByName(value)) {
        this.form.addError('name', 'Ce nom est déjà utilisé par un article');
      }
    });
  }

  add() {
    const model = this.form.getModel();

    if (this.form.valid) {
      const result = this.articleRepository.add(model);
      this.articles.insert(0, result);
      this.alertEmitter.info('L\'article a été ajouté');
      this.modal.close();
    }

  }


}
