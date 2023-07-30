import { Inject, Injectable } from '@nestjs/common'
import { Logger, Params, PARAMS_PROVIDER_TOKEN, PinoLogger } from 'nestjs-pino'

import { ILoggerService } from './adapter'

@Injectable()
export class LoggerService extends Logger implements ILoggerService {
  constructor(
    logger: PinoLogger,
    @Inject(PARAMS_PROVIDER_TOKEN) params: Params,
  ) {
    super(logger, params)
  }
}
