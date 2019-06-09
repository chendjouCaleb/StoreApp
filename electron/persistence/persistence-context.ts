import {Article} from '../models/article';
import {Connection, createConnection} from 'typeorm';
import IpcMain = Electron.IpcMain;
import {ArticleRepository} from './article-repository';
import {Customer} from '../models/customer';

export class PersistenceContext {
  private _connection: Connection;

  constructor(private _ipcMain: IpcMain) {
  }

  async init() {
    this._connection = await createConnection(
      {
        type: 'sqlite',
        synchronize: true,
        logging: true,
        logger: 'simple-console',
        database: './assets/database.sqlite',

        entities: [Article, Customer],
      });

    this.addListener();
  }

  addListener() {
    new ArticleRepository(this._ipcMain, this._connection.getRepository(Article), 'articles').addListener();
    new ArticleRepository(this._ipcMain, this._connection.getRepository(Customer), 'customers').addListener();
  }


  get connection(): Connection {
    return this._connection;
  }
}
