/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post,} from '@nestjs/common';
import { MessagesService } from './recados.service';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messageService: MessagesService){}

    @Get()
    findAll(){
        return this.messageService.finAll()
    };

    @Get(':id')
    findOne(@Param('id') id: number){
        return this.messageService.findOne(id)
    }

    @Post()
    create(@Body() message: any): any{
        return this.messageService.create(message)
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() message: any): any{
        return this.messageService.update(id, message)
    }

    @Delete(':id')
    remove(@Param('id') id: number): any{
        return this.messageService.delete(id)
    }
}
