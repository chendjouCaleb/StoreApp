import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  registrationDate: Date;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @Column('text', {nullable: true})
  imageName: string;
  imageURL: string;

  role = 'USER';
}
