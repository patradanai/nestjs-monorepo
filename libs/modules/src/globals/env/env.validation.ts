import { plainToInstance } from 'class-transformer'
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator'

enum Environment {
  Development = 'development',
  Production = 'production',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  ENVIRONMENT: Environment

  @IsNumber()
  PORT: number

  @IsNumber()
  HTTP_TIMEOUT: number

  @IsNumber()
  HTTP_MAX_REDIRECTS: number

  @IsString()
  JWT_SECRET: string

  @IsString()
  JWT_EXPIRES_IN: string

  @IsString()
  REDIS_URL: string
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  })

  const errors = validateSync(validatedConfig, { skipMissingProperties: false })
  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return validatedConfig
}
