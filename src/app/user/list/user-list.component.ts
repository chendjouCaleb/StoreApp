import {Component} from '@angular/core';
import {List} from '@everest/collections';
import {User} from '../../models/user.model';
import {UserRepository} from '../user.repository';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserAddComponent} from '../add/user-add.component';


@Component({
  templateUrl: 'user-list.component.html'
})
export class UserListComponent {
  users = new List<User>();

  constructor(private _repository: UserRepository, private _ngbModal: NgbModal) {
    this.users = this._repository.list();
  }

  openAddUserModal() {
    const modalRef = this._ngbModal.open(UserAddComponent, {backdrop: 'static'});
    modalRef.componentInstance.users = this.users;
  }
}
