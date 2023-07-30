import { EnvModule } from '@app/modules'
import { Test } from '@nestjs/testing'

import { CacheService } from '../cache.service'

describe('CacheService', () => {
  let cacheService: CacheService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [EnvModule],
      providers: [CacheService],
    }).compile()

    cacheService = moduleRef.get<CacheService>(CacheService)
  })

  it('should be defined', () => {
    expect(cacheService).toBeDefined()
  })
})
