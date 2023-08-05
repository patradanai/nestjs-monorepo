import { Test } from '@nestjs/testing'

import { ICacheInMemoryService } from '../adapter'

describe('CacheInMemoryModule', () => {
  let cacheService: ICacheInMemoryService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: ICacheInMemoryService,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
            reset: jest.fn(),
          },
        },
      ],
    }).compile()

    cacheService = moduleRef.get<ICacheInMemoryService>(ICacheInMemoryService)
  })

  it('should be defined', () => {
    expect(cacheService).toBeDefined()
  })
})
