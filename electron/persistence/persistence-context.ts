import {Article} from '../models/article';
import {Connection, createConnection} from 'typeorm';
import IpcMain = Electron.IpcMain;
import {ArticleRepository} from './article-repository';
import {Customer} from '../models/customer';
import {Order, OrderItem, Payment} from '../models/order';
import {User} from '../models/user.model';
import {Reception, ReceptionItem} from '../models/reception';

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

        entities: [User, Article, Customer, Order, OrderItem, Payment, Reception, ReceptionItem],
      });

    this.addListener();
  }

  addListener() {
    new ArticleRepository(this._ipcMain, this._connection.getRepository(Article), 'articles').addListener();
    new ArticleRepository(this._ipcMain, this._connection.getRepository(Customer), 'customers').addListener();
    new ArticleRepository(this._ipcMain, this._connection.getRepository(Order), 'orders').addListener();
    new ArticleRepository(this._ipcMain, this._connection.getRepository(OrderItem), 'orderItems').addListener();
    new ArticleRepository(this._ipcMain, this._connection.getRepository(Payment), 'payments').addListener();
    new ArticleRepository(this._ipcMain, this._connection.getRepository(User), 'users').addListener();
    new ArticleRepository(this._ipcMain, this._connection.getRepository(Reception), 'receptions').addListener();
    new ArticleRepository(this._ipcMain, this._connection.getRepository(ReceptionItem), 'receptionItems').addListener();
  }


  get connection(): Connection {
    return this._connection;
  }
}
