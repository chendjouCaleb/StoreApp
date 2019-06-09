
import {Article} from './article';

/**
 * Entité représentant une catégorie d'stock en stock.
 *
 * @author Chendjou
 * @version 1
 * @since 04-06-2019
 */
export class Category {

  constructor(name: string) {
    this.name = name;
  }

  id: number;
  /**
   * Le nom de la catégorie.
   */
  name: string;
  article: Article[];
}
