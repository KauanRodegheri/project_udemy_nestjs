import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PipeNumericID } from './commom/pipes/transform.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // REMOVE CHAVES QUE NÃO ESTAO NO DTO
      forbidNonWhitelisted: true, // retorna o erro para o usuario
      transform: false,
    }),
    new PipeNumericID(),
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log('api na porta 3000');
}
bootstrap();
