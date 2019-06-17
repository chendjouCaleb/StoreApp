import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {AlertEmitter} from '../../commons/alert.emitter';
import {UserRepository} from '../user.repository';
import {User} from '../../models/user.model';

@Component({
  templateUrl: 'user-delete.component.html'
})
export class UserDeleteComponent implements OnInit {
  @Input()
  user: User;

  constructor(private userRepository: UserRepository, public modal: NgbActiveModal, private router: Router,
              private alertEmitter: AlertEmitter) {  }

  ngOnInit(): void {  }

  deleteUser() {
    this.userRepository.delete(this.user);
    this.alertEmitter.info(`L'utilisateur' ${this.user.name} a été supprimé.`);
    this.router.navigateByUrl('/users/list');
    this.modal.close();
  }
}
