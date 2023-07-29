import { JwtModule } from '@nestjs/jwt'
import { TestingModule, Test } from '@nestjs/testing'
import { JwtTokenService } from '../jwt.service'

describe('JwtService', () => {
  let jwtService: JwtTokenService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'test-secret', // Provide a valid secret for testing
          signOptions: { expiresIn: '1d' },
        }),
      ],
      providers: [JwtTokenService],
    }).compile()

    jwtService = module.get<JwtTokenService>(JwtTokenService)
  })

  it('should be defined', () => {
    expect(jwtService).toBeDefined()
  })

  it('should be sign and verify', async () => {
    const payload = { userId: 1 }
    const token = await jwtService.sign(payload.userId, '1d')

    expect(token).toBeDefined()

    // Verfify
    const decodedPayload = jwtService.compare<{ userId: number }>(token)
    expect(decodedPayload.userId).toEqual(payload.userId)
  })
})
