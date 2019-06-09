import {Article} from '../models/article';
import {List} from '@everest/collections';
import {ElectronService} from 'ngx-electron';
import {Injectable} from '@angular/core';

@Injectable()
export class ArticleRepository {
  constructor(private _electron: ElectronService) {
  }

  static anyToType(item: any): Article {
    const article = new Article();
    article.countInCart = 0;
    article.sellingPrice = item.sellingPrice;
    article.buyingPrice = item.buyingPrice;
    article.id = item.id;
    article.quantity = item.quantity;
    article.name = item.name;
    article.reference = item.reference;

    return article;
  }

  list(): List<Article> {
    const result = this._electron.ipcRenderer.sendSync('articles/list');
    const articles = new List<Article>();
    result.forEach(a => articles.add(ArticleRepository.anyToType(a)));
    return articles;
  }

  find(id: number): Article {
    const articles = this._electron.ipcRenderer.sendSync('articles/find', {id: id});
    if (articles.length === 0) {
      return null;
    }
    return ArticleRepository.anyToType(articles[0]);
  }

  add(article: Article): Article {
    const result = this._electron.ipcRenderer.sendSync('articles/add', article);
    return ArticleRepository.anyToType(result);
  }

  update(article: Article): Article {
    const result = this._electron.ipcRenderer.sendSync('articles/update', article);
    return ArticleRepository.anyToType(result);
  }

  delete(article: Article): Article {
    return this._electron.ipcRenderer.sendSync('articles/delete', article);
  }

  findByReference(reference: string): Article {
    const articles = this._electron.ipcRenderer.sendSync('articles/find', {reference: reference});
    if (articles.length === 0) {
      return null;
    }
    return ArticleRepository.anyToType(articles[0]);
  }

  findByName(name: string) {
    const articles = this._electron.ipcRenderer.sendSync('articles/find', {name: name});
    if (articles.length === 0) {
      return null;
    }
    return ArticleRepository.anyToType(articles[0]);
  }


}
