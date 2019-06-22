import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication-service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from './login/login.component';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private _authenticationService: AuthenticationService, private _ngbModal: NgbModal) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authenticationService.isAuthenticated) {
      return true;
    }

    this._ngbModal.open(LoginComponent);
    return false;
  }

}
