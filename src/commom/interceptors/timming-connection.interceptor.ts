import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class TimmingConnectionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    // AQUI O INTERCEPTOR É EXECUTADO ANTES DO METODO SER CHAMADO (CONTROLLERS)
    const now = Date.now();
    console.log('TimmingConnectionInterceptor executado antes do metodo');

    await new Promise((resolve) => setTimeout(resolve, 3000));

    // METODO USADO PARA EXECUTAR O INTERCEPTOR DEPOIS DA REQUISIÇÃO
    return next.handle().pipe(
      tap(() => {
        const last = Date.now();
        console.log('executado depois');
        console.log(
          `TimmingConnectionInterceptorlast levou cerca de ${last - now}ms para ser executado`,
        );
      }),
    );
  }
}