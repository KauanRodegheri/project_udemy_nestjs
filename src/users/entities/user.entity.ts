import { IsEmail } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  username: string;

  @Column({ type: 'varchar', length: 12 })
  password: string;

  @Column({ type: 'varchar', unique: true })
  @IsEmail()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
