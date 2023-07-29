import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Reflector } from '@nestjs/core'
import { ResponseMessageKey } from '../../decorators/http.decorator'

export interface Response<T> {
  status_code: number
  message: string
  data: T
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        message:
          this.reflector.get<string>(
            ResponseMessageKey,
            context.getHandler(),
          ) ||
          data.message ||
          '',
        status_code: context.switchToHttp().getResponse().statusCode,
        data: data.result || data,
      })),
    )
  }
}
