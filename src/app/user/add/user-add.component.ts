import {Component, Input, OnInit} from '@angular/core';
import {UserForm} from '../user.form';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserRepository} from '../user.repository';
import {AlertEmitter} from '../../commons/alert.emitter';
import {User} from '../../models/user.model';
import {List} from '@everest/collections';
import CryptoJS from 'crypto-js';

@Component({
  templateUrl: 'user-add.component.html'
})
export class UserAddComponent implements OnInit {
  form = new UserForm();

  @Input()
  users: List<User>;

  constructor(public modal: NgbActiveModal, private _repository: UserRepository, private _alert: AlertEmitter) {

  }

  add() {
    this.checkName();
    this.checkPhoneNumber();
    this.checkPhoneNumber();
    if (this.form.valid) {
      let user = this.form.getModel();
      user.password = CryptoJS.SHA256(user.password).toString(CryptoJS.enc.Hex);
      user = this._repository.add(user);
      if (this.users) {
        this.users.add(user);
      }

      this._alert.success('L\'utilisateur a été crée!');
      this.modal.close(user);
    }

  }

  ngOnInit(): void { }

  checkName() {
    const nameControl = this.form.getControl('name');
    const user = this._repository.find({'name': nameControl.value});
    if (user) {
      nameControl.addError('Ce nom est déjà utilisé par un autre utilisateur.');
    }
  }

  checkPhoneNumber() {
    const phoneNumberControl = this.form.getControl('phoneNumber');
    const user = this._repository.find({'phoneNumber': phoneNumberControl.value});
    if (user) {
      phoneNumberControl.addError('Ce numéro de téléphone est déjà utilisé par un autre utilisateur.');
    }
  }

  checkPassword() {
    const passwordMatcherControl = this.form.getControl('passwordMatcher');

    const password = this.form.getControl('password').value;
    if (passwordMatcherControl.value !== password) {
      passwordMatcherControl.addError('Les deux mots de passe ne correspondent pas.');
    }
  }
}
