import { Test, TestingModule } from '@nestjs/testing'
import { BcryptService } from '../bcrypt.service'
import { SALT_ROUND } from '../bcrypt.module'

describe('BcryptService', () => {
  let service: BcryptService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BcryptService,
        {
          provide: SALT_ROUND,
          useValue: 10,
        },
      ],
    }).compile()

    service = module.get<BcryptService>(BcryptService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be hashed and compared', async () => {
    const plainPwd = '123456'
    const hashedPwd = await service.hash(plainPwd)
    const isMatched = await service.comparing(plainPwd, hashedPwd)
    expect(isMatched).toBeTruthy()
  })
})
