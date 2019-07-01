import {Article} from './article';
import {List} from '@everest/collections';
import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {OrderItem} from './order';
import {Customer} from './customer';

@Entity()
export class Reception {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Nom du fournisseur de la facture.
   */
  @Column()
  providerName: string;

  /**
   * Numéro de la facture.
   */
  @Column()
  billId: string;

  @CreateDateColumn()
  registrationDate: Date;

  @OneToMany(type => ReceptionItem, receptionItem => receptionItem.reception, {cascade: true})
  items: ReceptionItem[];

}


@Entity()
export class ReceptionItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(type => Article, article => article.receptionItems)
  article: Article;

  @ManyToOne(type => Reception, reception => reception.items)
  reception: Reception;


}
