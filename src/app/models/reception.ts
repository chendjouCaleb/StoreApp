import {Article} from './article';
import {List} from '@everest/collections';
import {IsNotEmpty, IsNumber, Matches, Min, MinLength} from 'class-validator';

export class Reception {
  id: number;

  /**
   * Nom du fournisseur des marchandises.
   */
  @IsNotEmpty()
  @MinLength(3)
  @Matches(/^[0-9a-zàâçéèêëîïôûùüÿñæœ .-]*$/i, {message: 'Contient des caractères non autorisés'})
  providerName: string;

  /**
   * Numéro de la facture.
   */
  @IsNotEmpty()
  @MinLength(3)
  @Matches(/^[0-9a-z .-]*$/i, {message: 'Contient des caractères non autorisés'})
  billId: string;

  registrationDate: Date;

  items: List<ReceptionItem>;

  static anyToType(value: any):Reception {
    if (!value) {
      return null;
    }

    const reception = new Reception();
    reception.id = value.id;
    reception.registrationDate = value.registrationDate;

    if (value.items) {
      reception.items = new List<ReceptionItem>();

      value.items.forEach(i => reception.items.add(ReceptionItem.anyToType(i)));
    }
    return reception;
  }
}

export class ReceptionItem {
  id: number;
  article: Article;
  reception: Reception;

  @IsNotEmpty()
  @IsNumber({}, {message: 'Renseignez un nombre positif'})
  @Min(0, {message: 'Renseignez un nombre positif'})
  quantity: number;

  @IsNotEmpty()
  @IsNumber({}, {message: 'Renseignez un nombre positif'})
  @Min(0, {message: 'Renseignez un nombre positif'})
  price: number;

  get totalPrice() {
    return this.quantity * this.price;
  }

  static anyToType(value: any): ReceptionItem {
    if (!value) {
      return null;
    }

    const item = new ReceptionItem();
    item.id = value.id;
    item.article = Article.anyToType(value.article);
    item.reception = Reception.anyToType(value.reception);
    item.quantity = value.quantity;
    item.price = value.price;

    return item;

  }
}
