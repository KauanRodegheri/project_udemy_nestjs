import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';

export class AddHeaderInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    // AQUI O INTERCEPTOR É EXECUTADO ANTES DO METODO SER CHAMADO (CONTROLLERS)
    const response = context.switchToHttp().getResponse()

    response.setHeader('X-Custom-Header', 'valor do cabeçalho')

    //atrasa o tempo de execução pelo tempo designado, no caso: 3 segundos
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return next.handle();
  }
}
