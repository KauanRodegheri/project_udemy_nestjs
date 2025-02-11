import { Module } from '@nestjs/common';
import { MessagesService } from './recados.service';
import { MessagesController } from './recados.controller';
import { MessagesEntity } from './entities/recados.entidade';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MessagesEntity])],
  providers: [MessagesService],
  controllers: [MessagesController],
})
export class RecadosModule {}
