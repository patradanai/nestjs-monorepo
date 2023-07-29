export abstract class IEnvService {
  abstract ENVIRONMENT: string
  abstract PORT: number
  abstract HTTP_TIMEOUT: number
  abstract HTTP_MAX_REDIRECTS: number
  abstract JWT_SECRET: string
  abstract JWT_EXPIRES_IN: string
  abstract REDIS_URL: string
}
