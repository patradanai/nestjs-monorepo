import { ErrCodeException } from '@app/models'
import { LoggerService } from '@app/modules/globals/logger'
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: LoggerService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost

    const ctx = host.switchToHttp()

    const httpStatus =
      exception instanceof ErrCodeException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
    const errCode =
      exception instanceof ErrCodeException ? exception.getCode() : ''
    const errDesc =
      exception instanceof ErrCodeException ? exception.getDescription() : ''
    const errMsg =
      exception instanceof ErrCodeException ? exception.getMessage() : ''
    // const errStack =
    //   exception instanceof ErrCodeException ? exception.getStack() : ''

    const responseBody = {
      err_code: errCode,
      err_description: errDesc,
      err_message: errMsg,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
  }
}
