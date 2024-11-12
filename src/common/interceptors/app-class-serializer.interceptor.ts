import { CallHandler, ClassSerializerInterceptor, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AppClassSerializerInterceptor extends ClassSerializerInterceptor {
  constructor(protected readonly reflector: unknown) {
    super(reflector);
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if ((context.getType() as string) === 'graphql') {
      const op = context.getArgByIndex(3).operation.operation;
      if (op === 'subscription') {
        return next.handle();
      }
    }
    return super.intercept(context, next);
  }
}
