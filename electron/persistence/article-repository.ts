import {ipcMain, IpcMain} from 'electron';
import {Repository} from 'typeorm';
import {Article} from '../models/article';

export class ArticleRepository<T> {
  constructor(private _ipc: IpcMain, private _repository: Repository<T>, private _resource: string) {  }

  addListener() {
    ipcMain.on(`${this._resource}/list`, async (event: any, ...args: any[]) => {
      try {
        const articles = await this._repository.find();
        console.log('find article ' + articles.length);
        event.returnValue = articles;
      } catch (err) {
        throw err;
      }
    });

    ipcMain.on(`${this._resource}/add`, async (event: any, _item: any) => {
      try {
        event.returnValue = await this._repository.save(_item);
        console.log('save item');
        console.log(_item);
      } catch (err) {
        throw err;
      }
    });

    ipcMain.on(`${this._resource}/update`, async (event: any, _item: any) => {
      try {
        event.returnValue = await this._repository.save(_item);
        console.log('update item');
        console.log(event.returnValue);
      } catch (err) {
        throw err;
      }
    });

    ipcMain.on(`${this._resource}/delete`, async (event: any, _item: any) => {
      try {
        event.returnValue = await this._repository.remove(_item);
        console.log('delete item');
      } catch (err) {
        throw err;
      }
    });

    ipcMain.on(`${this._resource}/find`, async (event: any, criteria: {}) => {
      try {
        const articles = await this._repository.find(criteria);
        event.returnValue = articles;
      } catch (err) {
        throw err;
      }
    });
  }
}
