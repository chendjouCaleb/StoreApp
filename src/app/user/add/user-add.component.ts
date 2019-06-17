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
    if (this.form.valid) {
      let user = this.form.getModel();
      user.password = CryptoJS.SHA256(user.password).toString(CryptoJS.enc.Hex);
      user = this._repository.add(user);
      this.users.add(user);
      this._alert.success('L\'utilisateur a été crée!');
      this.modal.close();
    }

  }

  ngOnInit(): void {

    this.form.getControl('name').valueChanges.subscribe(value => {
      const user = this._repository.find({'name': value});
      if (user) {
        this.form.getControl('name').addError('Ce nom est déjà utilisé par un autre utilisateur.');
      }
    });

    this.form.getControl('phoneNumber').valueChanges.subscribe(value => {
      const user = this._repository.find({'phoneNumber': value});
      if (user) {
        this.form.getControl('phoneNumber').addError('Ce numéro de téléphone est déjà utilisé par un autre utilisateur.');
      }
    });

    this.form.getControl('passwordMatcher').valueChanges.subscribe(value => {
      const password = this.form.getControl('password').value;
      if (value !== password) {
        this.form.getControl('passwordMatcher').clearValidators();
        this.form.getControl('passwordMatcher')
          .addMessageErrors({'passwordMatcher': 'Les deux mots de passe ne correspondent pas.'});
      }
    });
  }
}
