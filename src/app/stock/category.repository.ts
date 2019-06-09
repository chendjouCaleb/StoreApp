import {Category} from '../models/category';
import { List } from '@everest/collections';

export class CategoryRepository {
  private _categories = new List<Category>();

  constructor() {
    this.add(new Category('Habits'));
    this.add(new Category('Chassures'));
    this.add(new Category('Sac'));
    this.add(new Category('Pagnes'));
  }

  list() {
    return this._categories.clone();
  }

  add(category: Category) {
    category.id = this._categories.size;
    this._categories.add(category);
  }
}
