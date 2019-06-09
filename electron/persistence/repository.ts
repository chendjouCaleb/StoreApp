import {IpcMain} from 'electron';
import {Repository} from 'typeorm';
import {Article} from '../models/article';
import {List} from '@everest/collections/dist/lib/list/list';

export class AbstractRepository<T> {
  constructor(private _ipc: IpcMain, private _repository: Repository<Article>) {
  }

  public async list(criteria: {}) {
    try {
      const articles = await this._repository.find();
      return List.fromArray(articles);
    } catch (err) {
      throw err;
    }
  }

  public async find(criteria: {}) {
    try {
      const articles = await this._repository.find();
      return List.fromArray(articles);
    } catch (err) {
      throw err;
    }
  }
}
