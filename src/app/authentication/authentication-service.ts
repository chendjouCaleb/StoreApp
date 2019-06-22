import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {UserRepository} from '../user/user.repository';

@Injectable()
export class AuthenticationService {
  isAuthenticated = false;
  connectedUser: User;

  constructor(private _userRepository: UserRepository) {
    const userId = localStorage.getItem('login_userId');
    if (userId) {
      const user = _userRepository.findById(+userId);
      if (user) {
        this.isAuthenticated = true;
        this.connectedUser = user;
      }
    }
  }

  login(user: User) {
    this.connectedUser = user;
    this.isAuthenticated = true;
    localStorage.setItem('login_userId', user.id.toString());
  }

  logout() {
    localStorage.removeItem('login_userId');
    this.connectedUser = null;
    this.isAuthenticated = false;
  }
}
