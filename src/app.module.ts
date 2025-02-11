import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from './recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesEntity } from './recados/entities/recados.entidade';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Walker0078.',
      database: 'postgres',
      entities: [MessagesEntity, User],
      synchronize: true,
    }),
    RecadosModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
