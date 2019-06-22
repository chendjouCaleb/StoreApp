import {Article} from '../models/article';
import {List} from '@everest/collections';
import {ElectronService} from 'ngx-electron';
import {Injectable} from '@angular/core';
import {Repository} from '../commons/repository';

@Injectable()
export class ArticleRepository extends Repository<Article> {
  constructor(public _electron: ElectronService) {
    super(_electron);
  }


  anyToType(value: any): Article {
    return Article.anyToType(value);
  }

  get resource(): string {
    return 'articles';
  }


  findByReference(reference: string): Article {
    const articles = this._electron.ipcRenderer.sendSync('articles/find', {reference: reference});
    if (articles.length === 0) {
      return null;
    }
    return this.anyToType(articles[0]);
  }

  findByName(name: string) {
    const articles = this._electron.ipcRenderer.sendSync('articles/find', {name: name});
    if (articles.length === 0) {
      return null;
    }
    return this.anyToType(articles[0]);
  }



}
