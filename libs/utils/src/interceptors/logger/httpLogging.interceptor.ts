import { Injectable, NestMiddleware, Logger } from '@nestjs/common'

import { Request, Response, NextFunction } from 'express'

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP')

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl: url, body, headers } = request

    this.logger.log(
      `REQUEST ${method} ${url} ${ip} headers: ${JSON.stringify(
        headers,
      )} request_body: ${JSON.stringify(body)}`,
    )

    this.logResponseBody(request, response)

    next()
  }

  logResponseBody = (req: Request, res: Response) => {
    const { ip, method, originalUrl: url } = req
    const oldWrite = res.write
    const oldEnd = res.end

    const chunks = []

    res.write = (chunk, ...args) => {
      chunks.push(chunk)
      return oldWrite.apply(res, [chunk, ...args])
    }

    res.end = (chunk, ...args) => {
      if (chunk) {
        chunks.push(chunk)
      }
      const body = Buffer.concat(chunks).toString('utf8')

      const { statusCode } = res
      const contentLength = res.get('content-length')
      const headers = res.getHeaders() || ''

      this.logger.log(
        `RESPONSE ${method} ${url} ${statusCode} ${contentLength} ${ip} headers: ${JSON.stringify(
          headers,
        )} response_body: ${body}`,
      )

      return oldEnd.apply(res, [chunk, ...args])
    }
  }
}
