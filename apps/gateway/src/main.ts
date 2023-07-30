import { PrismaService } from '@app/modules/database'
import { LoggerService } from '@app/modules/globals/logger'
import { AllExceptionsFilter } from '@app/utils/filtters/httpException'
import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'

import { AppModule } from './app.module'
import { setupAuthen } from './middlewares/auth'
import { setupProxies } from './middlewares/routes'
// Contants
import routes from './routes/routes'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  )
  const adapterHost = app.get(HttpAdapterHost)
  app.useLogger(app.get(LoggerService))
  app.useGlobalFilters(
    new AllExceptionsFilter(adapterHost, app.get(LoggerService)),
  )
  app.enableCors()

  // Load Configuration
  const configService = app.get(ConfigService)
  const PORT = configService.get<number>('PORT')

  // Routes - Authen , Rate Limit, Public
  setupAuthen(app, routes)
  setupProxies(app, routes)

  // Close Hook Prisma
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  await app.listen(PORT)
}
bootstrap()
