import {Article} from './article';
import {List} from '@everest/collections';
import {Customer} from './customer';

export class Order extends List<OrderItem> {
  id: number;
  registrationDate = Date.now();
  public itemCount = 0;
  public price = 0;

  public customer: Customer = new Customer();

  addItem(article: Article, quantity = 1) {
    const item = this.find(i => i.article.id === article.id);
    if (item && item.quantity < article.quantity) {
      item.quantity++;
      article.countInCart++;
    } else if (!item && article.quantity > quantity) {
      this.add(new OrderItem(article, quantity));
      article.countInCart += quantity;
    }
    this.calculate();
  }

  remove(item: OrderItem) {
    item.article.countInCart = 0;
    super.remove(item);
    this.calculate();
    return true;
  }

  clear() {
    super.clear();
    this.price = 0;
    this.itemCount = 0;
  }

  calculate() {
    this.itemCount = 0;
    this.price = 0;
    this.forEach(i => {
      this.itemCount += i.quantity;
      this.price += i.quantity * i.article.sellingPrice;
    });
  }
}

export class OrderItem {
  constructor(public article: Article, public quantity: number) {
    this.price = article.sellingPrice;
  }

  price = 0;

  get totalPrice() {
    return this.article.sellingPrice * this.quantity;
  }
}
