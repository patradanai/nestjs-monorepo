import { Test } from '@nestjs/testing'

import { ICacheService } from '../adapter'
import { CacheService } from '../cache.service'
// Create Variable instant of LogService by mock func log, warn, error by jest.fn()

describe('CacheService', () => {
  let cacheService: ICacheService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: ICacheService,
          useFactory: () => {
            return new CacheService('http://localhost:6067')
          },
        },
      ],
    }).compile()

    cacheService = moduleRef.get<ICacheService>(ICacheService)
  })

  it('should be defined', () => {
    expect(cacheService).toBeDefined()
  })

  describe('isConnect', () => {
    it('should be isConnect success', async () => {
      jest
        .spyOn(cacheService.client, 'ping')
        .mockImplementation(async () => 'PONG')
      await expect(cacheService.ping()).resolves.toBeUndefined()
    })

    it('should be isConnect unSuccess', async () => {
      jest
        .spyOn(cacheService.client, 'ping')
        .mockImplementation(async () => 'FAIL')
      await expect(cacheService.ping()).rejects.toThrow(
        'Redis is not connected',
      )
    })
  })

  describe('get Redis', () => {
    it('should be get value in cache success', async () => {
      const mocks = 'TEST_VALUE'
      jest
        .spyOn(cacheService.client, 'get')
        .mockImplementation(async () => mocks)

      await expect(cacheService.get('TEST')).resolves.toBe(mocks)
    })

    it('should be get value in cache unsuccess', async () => {
      const mocks = undefined
      jest
        .spyOn(cacheService.client, 'get')
        .mockImplementation(async () => mocks)

      await expect(cacheService.get('TEST')).resolves.toBe(mocks)
    })
  })

  describe('set Redis', () => {
    it('should be set value in cache success', async () => {
      const mocks = 'OK'

      cacheService.client.set = jest.fn().mockReturnValue(mocks)

      await expect(cacheService.set('TEST', 'TEST')).resolves.toBe(mocks)
    })

    it('should be set value in cache unsuccess', async () => {
      const mocks = 'FAIL'

      cacheService.client.set = jest.fn().mockReturnValue(mocks)

      await expect(cacheService.set('TEST', 'TEST')).rejects.toThrow(
        `key TEST can't set value`,
      )
    })
  })

  describe('del Redis', () => {
    it('should be del value in cache success', async () => {
      const mocks = 1

      cacheService.client.del = jest.fn().mockReturnValue(mocks)

      await expect(cacheService.del('TEST')).resolves.toBe(mocks)
    })

    it('should be del value in cache unsuccess', async () => {
      const mocks = undefined

      cacheService.client.del = jest.fn().mockReturnValue(mocks)

      await expect(cacheService.del('TEST')).rejects.toThrow(
        "key TEST can't delete",
      )
    })
  })
})
