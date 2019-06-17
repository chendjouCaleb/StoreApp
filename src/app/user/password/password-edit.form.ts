import {EvFormControl, EvFormGroup} from '../../commons/forms/forms';
import {IsNotEmpty, MinLength} from 'class-validator';


export class EditPasswordForm extends EvFormGroup<EditPasswordModel> {
  constructor() {
    super({
      oldPassword: new EvFormControl('oldPassword', 'oldPassword', null, null),
      password: new EvFormControl('password', 'password', null, null),
      passwordMatcher: new EvFormControl('passwordMatcher', 'passwordMatcher', null, null)
    });
  }

  getModel(): EditPasswordModel {
    const model = new EditPasswordModel();
    model.oldPassword = this.value.oldPassword;
    model.password = this.value.password;
    model.passwordMatcher = this.value.passwordMatcher;

    return model;
  }
}

export class EditPasswordModel {
  @IsNotEmpty()
  @MinLength(6)
  oldPassword: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  passwordMatcher: string;
}
