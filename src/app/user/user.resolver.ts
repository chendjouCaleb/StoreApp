import {Component, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserRepository} from './user.repository';
import {CurrentItems} from '../commons/current-items.service';
import {User} from '../models/user.model';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(private _repository: UserRepository, private _items: CurrentItems) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
    const id = +route.paramMap.get('userId');

    const user = this._repository.findById(id);
    this._items.put('user', user);
    return user;
  }

}
