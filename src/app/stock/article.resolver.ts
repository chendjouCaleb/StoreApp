import {Component, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Article} from '../models/article';
import {Observable} from 'rxjs';
import {ArticleRepository} from './article.repository';
import {CurrentItems} from '../commons/current-items.service';

@Injectable()
export class ArticleResolver implements Resolve<Article> {
  constructor(private _repository: ArticleRepository, private _items: CurrentItems) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article> | Promise<Article> | Article {
    const id = +route.paramMap.get('articleId');

    const article = this._repository.find(id);
    this._items.put('article', article);
    return article;
  }

}
