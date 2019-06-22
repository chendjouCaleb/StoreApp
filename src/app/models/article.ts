/**
 * Entité représentant un stock en stock.
 *
 * @author Chendjou
 * @version 1
 * @since 04-06-2019
 */
import {Category} from './category';
import {IsNotEmpty, IsNumber, Matches, Min, MinLength} from 'class-validator';
import {List} from '@everest/collections';
import {Order, OrderItem} from './order';


export class Article {
  id: number;
  /**
   * Le nom de l'stock.
   */

  @IsNotEmpty()
  @MinLength(3)
  @Matches(/^[0-9a-zàâçéèêëîïôûùüÿñæœ .-]*$/i, {message: 'Contient des caractères non autorisés'})
  name: string;

  /**
   * Reference permettant d'indentifier l'article de façon unique.
   * Aussi bien dans l'application que sur le marché réel.
   */

  @IsNotEmpty()
  @MinLength(3)
  @Matches(/^[0-9a-z .-]*$/i)
  reference: string;

  image = 'assets/default-article.jpg';

  /**
   * Le nombre d'unité de l'stock en stock.
   */

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  quantity: number;

  /**
   * Le prix d'achat de l'stock. (En FCFA)
   */

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  buyingPrice: number;

  /**
   * Le prix de vente de l'stock. (En FCFA)
   */

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  sellingPrice: number;

  /**
   * Catégorie à laquelle l'stock appartient.
   */
  category: Category;

  countInCart = 0;

  orderItems: List<OrderItem>;

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

  static anyToType(item: any): Article {
    if (!item) {

      return null;
    }
    console.log(item);
    const article = new Article();
    article.countInCart = 0;
    article.sellingPrice = item.sellingPrice;
    article.buyingPrice = item.buyingPrice;
    article.id = item.id;
    article.quantity = item.quantity;
    article.name = item.name;
    article.reference = item.reference;

    if (item.orderItems) {
      article.orderItems = new List();

      item.orderItems.forEach(o => article.orderItems.add(OrderItem.anyToType(o)));
    }

    return article;
  }
}
