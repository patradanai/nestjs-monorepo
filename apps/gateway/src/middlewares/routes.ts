import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { createProxyMiddleware } from 'http-proxy-middleware'

import type routes from '../routes/routes'

export const setupProxies = (
  app: NestFastifyApplication,
  router: typeof routes,
) => {
  router.map((val) => {
    app.use(val.url, createProxyMiddleware(val.proxy))
  })
}
