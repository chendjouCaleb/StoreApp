import {List} from '@everest/collections';
import {Article} from './article';

export class StockSummary {
  constructor(private _items = new List<Article>()) {
  }

  quantity = 0;

  buyingPrice = 0;

  sellingPrice = 0;

  get margin() {
    return this.sellingPrice - this.buyingPrice;
  }

  compute() {
    for (const item of this._items) {
      this.quantity += item.quantity;
      this.buyingPrice += item.buyingPrice * item.quantity;
      this.sellingPrice += item.sellingPrice * item.quantity;
    }
  }
}
