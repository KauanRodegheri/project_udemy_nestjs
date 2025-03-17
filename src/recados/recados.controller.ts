/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors, UsePipes,} from '@nestjs/common';
import { MessagesService } from './recados.service';
import { CreateMessageDTO } from './DTO/recados.dto';
import { UpdateMessageDTO } from './DTO/update-recados.dto';
import { MessagesEntity } from './entities/recados.entidade';
import { PaginationDto } from 'src/commom/pagination.dto';
import { AddHeaderInterceptor } from 'src/commom/interceptors/add-header.interceptor';
import { TimmingConnectionInterceptor } from 'src/commom/interceptors/timming-connection.interceptor';
import { LogErrorsInterceptor } from 'src/commom/interceptors/log-errors.interceptor';

@Controller('messages')
@UseInterceptors(TimmingConnectionInterceptor, AddHeaderInterceptor, LogErrorsInterceptor)
export class MessagesController {
    constructor(private readonly messageService: MessagesService){}

    @Get(':id/all')
    findAll(@Query() pagination: PaginationDto, @Param('id') userId: number){
        return this.messageService.findAll(pagination, userId)
    };

    @Get(':id')
    findOne(@Param('id') id: number){
        console.log(id, typeof id)
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
