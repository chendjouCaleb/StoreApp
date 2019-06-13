import {Database} from 'sqlite3';
import {List} from '@everest/collections';
import {Article} from '../models/article';
import {ElectronService} from 'ngx-electron';

export class ArticleSQLRepository {
  // db = new Database(':memory:');

  createTable = 'CREATE TABLE Article(' +
    ' id integer auto_increment primary key,' +
    ' name varchar(255),' +
    ' reference varchar(255),' +
    ' quantity integer,' +
    ' sellingPrice integer,' +
    ' buyingPrice integer ' +
    ');';

  _articles: List<Article> = new List<Article>();

  constructor() {
    // this.db.serialize(() => {
    //   this.db.run(this.createTable);
    //
    //   const query = this.db.prepare('INSERT INTO Article(?,?,?,?,?)');
    //
    //   for (let i = 0; i < 10; i++) {
    //     query.run('name1' + i, 'ref' + i, '10', '10000', '10000');
    //   }
    //   query.finalize();
    // });
    // const db = new sqlite.Database(':memory:');
    // console.log(db.toString());
  }

  public list(): List<Article> {
    const articles = new List<Article>();

    // this.db.each('SELECT name, reference, quantity, sellingPrice, buyingPrice FROM Article', (err, item) => {
    //   const article = new Article();
    //   article.id = item.id;
    //   article.name = item.name;
    //   article.reference = item.reference;
    //   article.quantity = item.quantity;
    //   article.sellingPrice = item.sellingPrice;
    //   article.buyingPrice = item.buyingPrice;
    //
    //   articles.cart-manage(article);
    // });

    return articles;
  }
}
