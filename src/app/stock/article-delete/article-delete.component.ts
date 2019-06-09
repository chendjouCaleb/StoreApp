import {Component, Input, OnInit} from '@angular/core';
import {ArticleRepository} from '../article.repository';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertEmitter} from '../../commons/alert.emitter';
import {Article} from '../../models/article';
import {ArticleForm} from '../article.form';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'article-delete.component.html'
})
export class ArticleDeleteComponent implements OnInit {
  @Input()
  article: Article;

  constructor(private articleRepository: ArticleRepository, public modal: NgbActiveModal, private router: Router,
              private alertEmitter: AlertEmitter) {  }

  ngOnInit(): void {  }

  deleteArticle() {
    this.articleRepository.delete(this.article);
    this.alertEmitter.info('L\'article a été supprimé.');
    this.router.navigateByUrl('/articles/list');
    this.modal.close();
  }


}
