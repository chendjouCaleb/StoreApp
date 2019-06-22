import {Injectable} from '@angular/core';
import {UserRepository} from './user.repository';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserAddComponent} from './add/user-add.component';
import {AlertEmitter} from '../commons/alert.emitter';
import {LoginComponent} from '../authentication/login/login.component';

@Injectable()
export class InitUserService {
  constructor(private _userRepository: UserRepository, private _alert: AlertEmitter, private _ngbModal: NgbModal) {
  }

  openAddModal() {

    this._alert.error('Aucun administrateur. Veuillez ajouter le premier administrateur de l\'application.!', 5000);
    const modalRef = this._ngbModal.open(UserAddComponent);

    modalRef.result.then(user => {
      if (user) {
        user.role = 'ADMIN';
        this._userRepository.update(user);
        this._alert.success('L\'administrateur a été ajouté. Veuillez à présent vous connecter');
        this._ngbModal.open(LoginComponent, {backdrop: 'static'});
      }
    });

  }

  hasInitialUser() {
    return this._userRepository.find({'role': 'ADMIN'}) != null;
  }
}
