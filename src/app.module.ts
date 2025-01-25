import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConceitosManualModule } from './conceitos-manual/conceitos-manual.module';
import { ConceitosAutomaticosModule } from './conceitos-automaticos/conceitos-automaticos.module';


@Module({
  imports: [ConceitosManualModule, ConceitosAutomaticosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
