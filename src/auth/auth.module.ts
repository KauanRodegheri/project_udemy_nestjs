import { Global, Module } from '@nestjs/common';
import { HashingServices } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    {
      provide: HashingServices,
      useClass: BcryptService,
    },
    AuthService,
  ],
  exports: [HashingServices],
})
export class AuthModule {}
