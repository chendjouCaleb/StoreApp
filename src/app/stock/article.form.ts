import {EvFormControl, EvFormGroup} from '../commons/forms/forms';
import {Article} from '../models/article';

export class ArticleForm extends EvFormGroup<Article> {
  constructor(article = new Article()) {
    super({
      name: new EvFormControl('nom', 'name', article.name, null),
      reference: new EvFormControl('reference', 'reference', article.reference, null),
      quantity: new EvFormControl('quantity', 'quantity', article.quantity, null),
      buyingPrice: new EvFormControl('buyingPrice', 'buyingPrice', article.buyingPrice, null),
      sellingPrice: new EvFormControl('sellingPrice', 'sellingPrice', article.sellingPrice, null),
    });
  }

  getModel(): Article {
    const article = new Article();
    article.quantity = +this.value.quantity;
    article.name = this.value.name;
    article.reference = this.value.reference;
    article.buyingPrice = +this.value.buyingPrice;
    article.sellingPrice = +this.value.sellingPrice;
    return article;
  }
}
