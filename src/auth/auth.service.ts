import { BadRequestException, Injectable, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { HashingServices } from './hashing/hashing.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly hashingService: HashingServices,
  ) {}

  async login(loginDto: LoginDto): Promise<boolean> {
    const existingUser = await this.userRepository.findOneBy({
      email: loginDto.email,
    });
    if (!existingUser) {
      throw new BadRequestException('email nao cadastrado');
    }
    const password = loginDto.password;
    const passwordHash = existingUser.password;

    const validPassword = await this.hashingService.compare(
      password,
      passwordHash,
    );
    return validPassword;
  }
}
