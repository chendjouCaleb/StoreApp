/**
 * Entité représentant un client.
 *
 * @author Chendjou
 * @version 1
 * @since 07-06-2019
 */
import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Order} from './order';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  phoneNumber: string;

  @Column()
  nationalId: string;

  @CreateDateColumn()
  registrationDate: Date;

  @OneToMany(type => Order, order => order.customer)
  orders: Order[];
}
