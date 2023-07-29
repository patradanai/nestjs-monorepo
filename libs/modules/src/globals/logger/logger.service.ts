import { Inject, Injectable } from '@nestjs/common'
import { Logger, PARAMS_PROVIDER_TOKEN, Params, PinoLogger } from 'nestjs-pino'

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
