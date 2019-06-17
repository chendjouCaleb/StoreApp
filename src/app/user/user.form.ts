import {EvFormControl, EvFormGroup} from '../commons/forms/forms';
import {User} from '../models/user.model';

export class UserForm extends EvFormGroup<User> {
  constructor(user = new User()) {
    super({
      name: new EvFormControl('nom', 'name', user.name, null),
      phoneNumber: new EvFormControl('phoneNumber', 'phoneNumber', user.phoneNumber, null),
      password: new EvFormControl('password', 'password', null, null),
      passwordMatcher: new EvFormControl('passwordMatcher', 'passwordMatcher', null, null)
    });
  }

  getModel(): User {
    const user = new User();
    user.name = this.value.name;
    user.phoneNumber = this.value.phoneNumber;
    user.password = this.value.password;
    user.passwordMatcher = this.value.passwordMatcher;

    return user;
  }
}
