import {Component} from '@angular/core';
import {CurrentItems} from '../../commons/current-items.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../models/user.model';
import {UserDeleteComponent} from '../delete/user-delete.component';
import {UserEditPasswordComponent} from '../password/user-edit-password.component';

@Component({
  templateUrl: 'user-home.component.html'
})
export class UserHomeComponent {
  user: User;

  constructor(private _items: CurrentItems, private _ngbModal: NgbModal) {
    this.user = this._items.find('user');
  }

  back() {
    if (history.length > 1) {
      history.back();
    }
  }

  openEditPasswordModal() {
    const modalRef = this._ngbModal.open(UserEditPasswordComponent, {backdrop: 'static'});
    modalRef.componentInstance.user = this.user;
  }

  openDeleteModal() {
    const modalRef = this._ngbModal.open(UserDeleteComponent, {backdrop: 'static'});
    modalRef.componentInstance.user = this.user;
  }

}
