/**
 * Entité représentant un stock en stock.
 *
 * @author Chendjou
 * @version 1
 * @since 04-06-2019
 */
import {Category} from './category';
import {IsNotEmpty, IsNumber, Matches, Min, MinLength} from 'class-validator';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {OrderItem} from './order';
import {ReceptionItem} from './reception';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;
  /**
   * Le nom de l'article en stock.
   */
  @Column()
  @IsNotEmpty()
  @MinLength(3)
  @Matches(/^[0-9a-zàâçéèêëîïôûùüÿñæœ .-]*$/i, {message: 'Contient des caractères non autorisés'})
  name: string;

  /**
   * Reference permettant d'indentifier l'article de façon unique.
   * Aussi bien dans l'application que sur le marché réel.
   */
  @Column()
  @IsNotEmpty()
  @MinLength(3)
  @Matches(/^[0-9a-z .-]*$/i)
  reference: string;

  /**
   * Le nombre d'unité de l'stock en stock.
   */
  @Column()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  quantity: number;

  /**
   * Le prix d'achat de l'stock. (En FCFA)
   */
  @Column()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  buyingPrice: number;

  /**
   * Le prix de vente de l'stock. (En FCFA)
   */
  @Column()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  sellingPrice: number;

  /**
   * Catégorie à laquelle l'stock appartient.
   */
  category: Category;

  @OneToMany(type => OrderItem, orderItem => orderItem.article)
  orderItems: OrderItem[];

  @OneToMany(type => ReceptionItem, receptionItem => receptionItem.article)
  receptionItems: ReceptionItem[];

  /**
   * Le prix d'achat total.
   */
  get totalBuyingPrice(): number {
    return this.buyingPrice * this.quantity;
  }

  /**
   * Le prix de vente total.
   */
  get totalSellingPrice(): number {
    return this.sellingPrice * this.quantity;
  }
}
