import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'

// Contants
import routes from './routes/routes'
import { AppModule } from './app.module'
import { setupProxies } from './middlewares/routes'
import { setupAuthen } from './middlewares/auth'
import { PrismaService } from './configs/database/prisma.service'
import { AllExceptionsFilter } from 'libs/exceptionFilter'
import { LoggerService } from '@app/logger'

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
