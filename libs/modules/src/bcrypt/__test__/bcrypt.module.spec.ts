import { Test, TestingModule } from '@nestjs/testing'

import { BcryptModule } from '../bcrypt.module'
import { BcryptService } from '../bcrypt.service'

describe('BcryptService', () => {
  let service: BcryptService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BcryptModule],
    }).compile()

    service = module.get<BcryptService>(BcryptService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
