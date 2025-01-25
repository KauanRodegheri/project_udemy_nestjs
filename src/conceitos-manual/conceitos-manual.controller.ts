/* eslint-disable prettier/prettier */
import { Controller, Get } from "@nestjs/common";
import { ConceitosManualService } from "./conceitos-manual.service";

@Controller('oi')
export class ConceitosManualController {
    constructor(private readonly conceitosService: ConceitosManualService){}

    @Get()
    helloWorld(): string{
        return this.conceitosService.helloWorld();
    }

    @Get(':id')
    getHelloWorldById(): number{
        return 25 + 36
    }
};