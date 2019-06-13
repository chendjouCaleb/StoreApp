import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Customer} from './customer';
import {Article} from './article';
import {List} from '@everest/collections';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  registrationDate: Date;

  @Column()
  public price: number;

  @Column({name: 'payment'})
  private _payment: number;

  @ManyToOne(type => Customer, customer => customer.orders)
  public customer: Customer;

  @OneToMany(type => OrderItem, orderItem => orderItem.order, {cascade: true})
  orderItems: List<OrderItem>;

  @OneToMany(type => Payment, payment => payment.order, {cascade: true})
  payments: Order;


  get payment(): number {
    return this._payment;
  }

  set payment(value: number) {
    this._payment = value;
  }
}


@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Order, order => order.orderItems)
  order: Order;

  @ManyToOne(type => Article, article => article.orderItems)
  public article: Article;

  @Column({name: 'quantity'})
  private _quantity: number;

  @Column()
  price: number;


  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }
}

@Entity()
export class Payment {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  registrationDate: Date;

  @Column()
  amount: number;

  @ManyToOne(type => Order, order => order.payments)
  order: Order;
}
