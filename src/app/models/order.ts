import {Article} from './article';
import {List} from '@everest/collections';
import {Customer} from './customer';

export class Order extends List<OrderItem> {
  id: number;
  registrationDate = Date.now();
  public itemCount = 0;
  public price = 0;

  private _payment = 0;

  public customer: Customer;

  public payments: Payment[] = [];

  static anyToType(value: any): Order {
    console.log(value);
    const order = new Order();
    order._payment = value._payment;

    order.price = value.price;

    order.id = value.id;
    order.registrationDate = value.registrationDate;
    if (value.customer) {
      order.customer = Customer.anyToType(value.customer);
    }

    if (value.orderItems) {
      value.orderItems.forEach(item => order.add(OrderItem.anyToType(item)));
    }

    if (value.payments) {
      value.payments.forEach(item => order.payments.push(Payment.anyToType(item)));
    }
    return order;
  }

  addItem(article: Article, quantity = 1) {
    const item = this.find(i => i.article.id === article.id);
    if (item && item.quantity < article.quantity) {
      item.quantity++;
      article.countInCart++;
    } else if (!item && quantity > 0 && article.quantity >= quantity) {
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
    this.forEach(i => i.article.countInCart = 0);
    super.clear();
    this.price = 0;
    this.itemCount = 0;

    this.payment = 0;
    this.customer = null;
  }

  calculate() {
    this.itemCount = 0;
    this.price = 0;
    this.forEach(i => {
      this.itemCount += i.quantity;
      this.price += i.quantity * i.article.sellingPrice;
    });
  }


  get payment(): number {
    return this._payment;
  }

  set payment(value: number) {
    if (value < 0) {
      value = -value;
    }
    if (value > this.price) {
      value = this.price;
    }
    this._payment = value;
  }

  // for relation in typeORM
  get orderItems() {
    return this.toArray();
  }


}

export class OrderItem {
  constructor(public article?: Article, public _quantity?: number) {
    if (article) {
      this.price = article.sellingPrice;
    }
  }

  id: number;
  price = 0;

  order: Order;

  get totalPrice() {
    return this.article.sellingPrice * this._quantity;
  }


  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    if (value < 0) {
      value = -value;
    }
    this._quantity = value;
  }

  static anyToType(value: any): OrderItem {
    const item = new OrderItem();
    item._quantity = value._quantity;
    item.price = value.price;
    item.id = value.id;
    if (value.article) {
      item.article = Article.anyToType(value.article);
    }
    return item;
  }
}


export class Payment {
  registrationDate: Date;

  constructor(amount: number, order: Order) {
    this.amount = amount;
    this.order = order;
  }

  amount = 0;
  order: Order;

  static anyToType(value: any): Payment {
    return new Payment(value.amount, value.order);
  }
}
