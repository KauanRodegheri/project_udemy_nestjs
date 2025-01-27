import { Module } from '@nestjs/common';
import { MessagesService } from './recados.service';
import { MessagesController } from './recados.controller';

@Module({
  providers: [MessagesService],
  controllers: [MessagesController],
})
export class RecadosModule {}
