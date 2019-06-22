import {IsEmail, IsNotEmpty, Matches, MinLength} from 'class-validator';
import {EvFormControl, EvFormGroup} from '../../commons/forms/forms';

export class LoginFormGroup extends EvFormGroup<LoginModel> {
  constructor() {
    super({
      phoneNumber: new EvFormControl('phoneNumber', 'phoneNumber', '', null),
      password: new EvFormControl('mot de passe', 'password', '', null)
    });

  }

  getModel(): LoginModel {
    const model = new LoginModel();
    model.phoneNumber = this.controls.phoneNumber.value;
    model.password = this.controls.password.value;
    return model;
  }
}

export class LoginModel {

  @IsNotEmpty()
  @Matches(/^6[98765][0-9]{7}$/i, {message: 'Numéro de téléphone incorrect'})
  phoneNumber: string;

  @IsNotEmpty({message: 'Veuillez renseigner votre mot de passe'})
  @MinLength(6)
  password: string;
}
