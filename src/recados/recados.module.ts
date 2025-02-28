import { Module } from '@nestjs/common';
import { MessagesService } from './recados.service';
import { MessagesController } from './recados.controller';
import { MessagesEntity } from './entities/recados.entidade';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { UsersController } from 'src/users/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MessagesEntity, User]), UsersModule],
  providers: [MessagesService, UsersService],
  controllers: [MessagesController, UsersController],
})
export class RecadosModule {}
