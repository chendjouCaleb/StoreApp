import {Component} from '@angular/core';
import {LoginFormGroup} from './login-form';
import {UserRepository} from '../../user/user.repository';
import {AlertEmitter} from '../../commons/alert.emitter';
import {User} from '../../models/user.model';
import CryptoJS from 'crypto-js';
import {AuthenticationService} from '../authentication-service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  form = new LoginFormGroup();
  user: User;


  constructor(private _repository: UserRepository, private _alert: AlertEmitter,
              private _authService: AuthenticationService, public modal: NgbActiveModal, private _router: Router) {

  }

  checkPhoneNumber() {
    const phoneNumber = this.form.getControl('phoneNumber');
    const user = this._repository.find({'phoneNumber': phoneNumber.value});
    if (!user) {
      phoneNumber.addError('Ce numéro de téléphone n\'est pas reconnu.');
    } else {
      this.user = user;
    }
  }

  checkPassword() {
    const password = this.form.getControl('password');
    if (password.value && password.value.length > 5 && this.user) {
      if (CryptoJS.SHA256(password.value).toString(CryptoJS.enc.Hex) !== this.user.password) {
        password.addError('Le mot de passe ne correspond pas au compte!');
      }
    }
  }

  login() {
    this.checkPhoneNumber();
    this.checkPassword();

    if (this.form.valid) {
      this._authService.login(this.user);
      this._alert.info('Vous êtes maintenant connecté!');
      this._router.navigateByUrl('/');
      this.modal.close();
    }
  }
}
