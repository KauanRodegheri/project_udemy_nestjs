import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingServices } from 'src/auth/hashing/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingServices,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user_email = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (user_email) {
      throw new BadRequestException('email ja existe no nosso banco');
    }

    const password = createUserDto.password;
    const passwordHash = await this.hashingService.hash(password);

    const user = {
      username: createUserDto.username,
      email: createUserDto.email,
      password: passwordHash,
    };

    const userSaved = await this.userRepository.create(user);

    await this.userRepository.save(userSaved);

    return userSaved;
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException('usuario não encontrado');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const objeto = {
      username: updateUserDto?.username,
      email: updateUserDto?.email,
    };
    const user = await this.userRepository.preload({
      id,
      ...objeto,
    });

    if (!user) {
      throw new NotFoundException('usuario não encontrado');
    }

    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException('usuario não encontrado');
    }

    await this.userRepository.remove(user);
    return user;
  }
}
