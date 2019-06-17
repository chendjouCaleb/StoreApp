import {IsNotEmpty, Matches, MinLength} from 'class-validator';

export class User {
  id: number;

  @IsNotEmpty()
  @MinLength(3)
  @Matches(/^[a-zàâçéèêëîïôûùüÿñæœ .-]*$/i, {message: 'Contient des caractères non autorisés'})
  name: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  passwordMatcher: string;

  @IsNotEmpty()
  @Matches(/^6[98765][0-9]{7}$/i, {message: 'Numéro de téléphone incorrect'})
  phoneNumber: string;

  registrationDate: Date;

  image = 'assets/default-customer.jpg';
  imageName: string;
  imageURL: string;

  role = 'USER';

  static anyToType(value: any): User {
    const user = new User();
    user.id = value.id;
    user.name = value.name;
    user.phoneNumber = value.phoneNumber;
    user.registrationDate = value.registrationDate;
    user.imageName = value.imageName;
    user.role = value.role;
    user.password = value.password;

    return user;
  }
}
