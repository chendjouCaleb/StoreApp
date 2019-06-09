/**
 * Entité représentant un client.
 *
 * @author Chendjou
 * @version 1
 * @since 07-06-2019
 */
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  phoneNumber: string;

  @Column()
  nationalId: string;

  @Column({type: 'date'})
  registrationDate = Date.now();
}
