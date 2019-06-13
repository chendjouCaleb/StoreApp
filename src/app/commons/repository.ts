import {Article} from '../models/article';
import {List} from '@everest/collections';
import {ElectronService} from 'ngx-electron';
import {Injectable} from '@angular/core';

@Injectable()
export abstract class Repository<T> {
  public constructor(public _electron: ElectronService) {
  }

  abstract get resource(): string;

  abstract anyToType(value: any): T ;

  list(criteria = {}, relations = []): List<T> {
    const result = this._electron.ipcRenderer.sendSync(`${this.resource}/find`, criteria, relations) as Array<T>;
    const items = new List<T>();
    result.forEach(item => items.add(this.anyToType(item)));
    return items;
  }

  findById(id: number, relations = []): T {
    const articles = this._electron.ipcRenderer.sendSync(`${this.resource}/find`, {id: id}, relations);
    if (articles.length === 0) {
      return null;
    }
    return this.anyToType(articles[0]);
  }

  add(item: T): T {
    const result = this._electron.ipcRenderer.sendSync(`${this.resource}/add`, item);
    console.log(result);
    return this.anyToType(result);
  }

  update(item: T): T {
    const result = this._electron.ipcRenderer.sendSync(`${this.resource}/update`, item);
    return this.anyToType(result);
  }

  delete(item: T) {
    return this._electron.ipcRenderer.sendSync(`${this.resource}/delete`, item);
  }

  find(criteria: {}): T {
    const result = this._electron.ipcRenderer.sendSync(`${this.resource}/find`, criteria);
    if (result.length === 0) {
      return null;
    }
    return this.anyToType(result[0]);
  }

}
