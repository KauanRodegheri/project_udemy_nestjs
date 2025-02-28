/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query,} from '@nestjs/common';
import { MessagesService } from './recados.service';
import { CreateMessageDTO } from './DTO/recados.dto';
import { UpdateMessageDTO } from './DTO/update-recados.dto';
import { MessagesEntity } from './entities/recados.entidade';
import { PaginationDto } from 'src/commom/pagination.dto';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messageService: MessagesService){}

    @Get()
    findAll(@Query() pagination: PaginationDto){
        return this.messageService.findAll(pagination)
    };

    @Get(':id')
    findOne(@Param('id') id: number){
        return this.messageService.findOneById(id)
    }

    @Post()
    create(@Body() createMessageDTO: CreateMessageDTO): Promise<MessagesEntity> {
        return this.messageService.create(createMessageDTO)
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateMessageDTO: UpdateMessageDTO): any{
        return this.messageService.update(id, updateMessageDTO)
    }

    @Delete(':id')
    remove(@Param('id') id: number): any{
        return this.messageService.remove(id)
    }
}
