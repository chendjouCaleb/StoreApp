import {Article} from '../models/article';
import {List} from '@everest/collections';
import {ElectronService} from 'ngx-electron';
import {Injectable} from '@angular/core';
import {Repository} from '../commons/repository';
import {Reception, ReceptionItem} from '../models/reception';

@Injectable()
export class ReceptionRepository extends Repository<Reception> {
  constructor(public _electron: ElectronService) {
    super(_electron);
  }


  anyToType(value: any): Reception {
    return Reception.anyToType(value);
  }

  get resource(): string {
    return 'receptions';
  }
}


@Injectable()
export class ReceptionItemRepository extends Repository<ReceptionItem> {
  constructor(public _electron: ElectronService) {
    super(_electron);
  }


  anyToType(value: any): ReceptionItem {
    return ReceptionItem.anyToType(value);
  }

  get resource(): string {
    return 'receptionItems';
  }
}
