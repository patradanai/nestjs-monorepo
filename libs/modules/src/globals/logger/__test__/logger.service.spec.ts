import { Test, TestingModule } from '@nestjs/testing'

import { LoggerModule } from '../logger.module'
import { LoggerService } from '../logger.service'
describe('LoggerService', () => {
  let service: LoggerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [LoggerService],
    }).compile()

    service = module.get<LoggerService>(LoggerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
