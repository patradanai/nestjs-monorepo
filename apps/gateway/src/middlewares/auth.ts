import { ErrCodeByName, errorName } from '@app/utils/filtters/httpException'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { NextFunction, Request, Response } from 'express'

import { AuthService } from '../auth/auth.service'
import type routes from '../routes/routes'

export const setupAuthen = (
  app: NestFastifyApplication,
  router: typeof routes,
) => {
  router.map((val) => {
    if (val.auth) {
      app.use(
        val.url,
        mwAuthenication(app),
        (req: Request, res: Response, next: NextFunction) => {
          next()
        },
      )
    }
  })
}

const mwAuthenication =
  (app: NestFastifyApplication) =>
  (req: Request, res: Response, next: NextFunction) => {
    // const appService = app.get(AuthService)

    const authorization = req.headers['Authorization']
    if (!authorization) {
      throw ErrCodeByName(errorName.e1005000)
    }

    req.headers['request_id'] = '111'
    req.headers['userId'] = '123'
    next()
  }
