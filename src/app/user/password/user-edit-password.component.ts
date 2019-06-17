import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {EditPasswordForm} from './password-edit.form';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserRepository} from '../user.repository';
import {AlertEmitter} from '../../commons/alert.emitter';
import CryptoJS from 'crypto-js';

@Component({
  templateUrl: 'user-edit-password.component.html'
})
export class UserEditPasswordComponent implements OnInit {
  @Input()
  user: User;

  form = new EditPasswordForm();

  constructor(public modal: NgbActiveModal, private _repository: UserRepository, private _alert: AlertEmitter) {

  }

  editPassword() {
    if (this.form.valid) {
      const model = this.form.getModel();
      const hash = CryptoJS.SHA256(model.password).toString(CryptoJS.enc.Hex);
      this.user.password = hash;

      this._repository.update(this.user);
      this._alert.info('Le mot de passe a été modifié');
      this.modal.close();
    }
  }

  ngOnInit(): void {
    console.log(this.user);
    this.form.getControl('oldPassword').valueChanges.subscribe(value => {
      const hash = CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex);
      if (this.user.password !== hash) {
        this.form.getControl('oldPassword').addError('Mot de passe actuel incorrect.');
      }
    });

    this.form.getControl('passwordMatcher').valueChanges.subscribe(value => {
      const password = this.form.getControl('password').value;
      if (value !== password) {
        this.form.getControl('passwordMatcher').addError('Les deux mots de passe ne correspondent pas.');
      }
    });
  }
}
