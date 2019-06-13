import {IsNotEmpty, Matches, MinLength} from 'class-validator';

/**
 * Entité représentant un client.
 *
 * @author Chendjou
 * @version 1
 * @since 07-06-2019
 */
export class Customer {
  id: number;

  @IsNotEmpty()
  @MinLength(3)
  @Matches(/^[a-zàâçéèêëîïôûùüÿñæœ .-]*$/i, {message: 'Nom incorrect'})
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  @Matches(/^[a-zàâçéèêëîïôûùüÿñæœ .-]*$/i, {message: 'Contient des caractères non autorisés'})
  surname: string;

  @IsNotEmpty()
  @Matches(/^6[98765][0-9]{7}$/i, {message: 'Numéro de téléphone incorrect'})
  phoneNumber: string;

  @IsNotEmpty()
  @Matches(/^[0-9]{9}$/i, {message: 'Numéro d\'indentité national incorrect'})
  nationalId: string;

  image = 'assets/default-customer.jpg';

  registrationDate = Date.now();

  static anyToType(value: any): Customer {
    const customer = new Customer();
    customer.id = value.id;
    customer.name = value.name;
    customer.surname = value.surname;
    customer.nationalId = value.nationalId;
    customer.phoneNumber = value.phoneNumber;
    customer.registrationDate = value.registrationDate;

    return customer;
  }
}
