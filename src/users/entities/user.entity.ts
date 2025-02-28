import { IsEmail } from 'class-validator';
import { MessagesEntity } from 'src/recados/entities/recados.entidade';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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

  @OneToMany(() => MessagesEntity, (message) => message.de)
  messagesEnviadas: MessagesEntity[];

  @OneToMany(() => MessagesEntity, (message) => message.para)
  messagesRecebidas: MessagesEntity[];
}
