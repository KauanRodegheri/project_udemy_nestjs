/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { MessagesEntity } from './entities/recados.entidade';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDTO } from './DTO/recados.dto';
import { UpdateMessageDTO } from './DTO/update-recados.dto';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(MessagesEntity)
        private readonly messagesRepository: Repository<MessagesEntity>
    ) {}

    async findAll(): Promise<MessagesEntity[]> {
        const messages = await this.messagesRepository.find()
        return messages;
    }

    async findOneById(id: number): Promise<MessagesEntity> {
        const messageUnic = await this.messagesRepository.findOne({
            where: { id: +id }
        })

        return messageUnic
    }

    async create(createMessageDTO: CreateMessageDTO): Promise<MessagesEntity> {
        const newMessage = {
            ...createMessageDTO,
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

