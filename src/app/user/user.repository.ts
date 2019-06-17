import {Injectable} from '@angular/core';
import {Repository} from '../commons/repository';
import {User} from '../models/user.model';
import {ElectronService} from 'ngx-electron';

@Injectable()
export class UserRepository extends Repository<User> {
  public constructor(public _electron: ElectronService) {
    super(_electron);
  }
  anyToType(value: any): User {
    return User.anyToType(value);
  }

  get resource(): string {
    return 'users';
  }

}
