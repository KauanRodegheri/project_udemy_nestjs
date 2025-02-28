/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MessagesEntity } from './entities/recados.entidade';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDTO } from './DTO/recados.dto';
import { UpdateMessageDTO } from './DTO/update-recados.dto';
import { User } from 'src/users/entities/user.entity';
import { PaginationDto } from 'src/commom/pagination.dto';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(MessagesEntity)
        private readonly messagesRepository: Repository<MessagesEntity>,

        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {}

    async findAll(pagination: PaginationDto): Promise<any> {
        const { limit = 50, offset= 0 } = pagination
        const messages = await this.messagesRepository.find({
            take: limit,
            skip: offset,
            relations: ['de', 'para' ]
        })
        console.log(messages)
        const data = {
            items: messages.length,
            pagination: "",
            data: {
                ...messages
            }
        }
        return data;
    }

    async findOneById(id: number): Promise<MessagesEntity> {
        const messageUnic = await this.messagesRepository.findOne({
            where: { id: +id }
        })

        return messageUnic
    }

    async create(createMessageDTO: CreateMessageDTO): Promise<MessagesEntity> {
        const de = this.usersRepository.findOne({
            where: { id: createMessageDTO.de.id }
        })
        const para = this.usersRepository.findOne({
            where: { id: createMessageDTO.para.id }
        })

        if (!de || !para) {
            throw new NotFoundException('remetente ou destinatario não foi encontrado')
        }

        const newMessage = {
            texto: createMessageDTO.texto,
            de: createMessageDTO.de,
            para: createMessageDTO.para,
            lido: false,
        }
        const message = await this.messagesRepository.create(newMessage)
        return await this.messagesRepository.save(message)
    }

    async update(id: number, updateMessageDTO: UpdateMessageDTO): Promise<MessagesEntity> {
        const updatesPartial = {
            lido: updateMessageDTO?.lido,
            texto: updateMessageDTO?.texto
        }
        const updateMessage = await this.messagesRepository.preload({
            id,
            ...updatesPartial
        })
        if (!updateMessage) {
            throw new BadRequestException('mensagem não encontrada')
        }
        return await this.messagesRepository.save(updateMessage)
    }

    async remove(id: number): Promise<MessagesEntity> {
        const message = await this.messagesRepository.findOne({
            where: { id: +id }
        })
        return await this.messagesRepository.remove(message)
    }
}

