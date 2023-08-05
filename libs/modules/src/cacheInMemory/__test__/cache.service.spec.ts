/* eslint-disable prettier/prettier */
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test } from '@nestjs/testing';

import { CacheInMemoryService } from '../service';

let mockCacheManager = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  reset: jest.fn(),
};

describe('CacheInMemoryModule', () => {
  let cacheService: CacheInMemoryService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const moduleRef = await Test.createTestingModule({
      providers: [
        CacheInMemoryService,
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    cacheService = moduleRef.get<CacheInMemoryService>(CacheInMemoryService);
  });

  afterEach(() => {
    jest.clearAllMocks();

    mockCacheManager = {
        get: jest.fn(),
        set: jest.fn(),
        del: jest.fn(),
        reset: jest.fn(),
      };
  });

  it('should be defined', () => {
    expect(cacheService).toBeDefined();
  });

  describe('get', () => {
    it('should be get value in cache success', async () => {
      const expected = 'MOCK_VALUE_1';

      mockCacheManager.get.mockResolvedValue(expected);

      await expect(cacheService.get('KEY')).resolves.toBe(expected);
    });

    it('should be get value in cache unsuccess', async () => {
      const expected = undefined;

      mockCacheManager.get.mockResolvedValue(expected);

      await expect(cacheService.get('KEY_FAIL')).rejects.toThrow(
        `key KEY_FAIL not found`,
      );
    });
  });

  describe('set', () => {
    it('should be set value in cache success with default ttl', async () => {
      cacheService.set('KEY', 'VALUE');

      expect(mockCacheManager.set).toHaveBeenCalledWith('KEY', 'VALUE', 0);
    });

    it('should be set value in cache success with custom ttl', async () => {
      cacheService.set('KEY', 'VALUE', 1000);

      expect(mockCacheManager.set).toHaveBeenCalledWith('KEY', 'VALUE', 1000);
    });

    it('should be set value in cache unsuccess', async () => {
        mockCacheManager.set.mockRejectedValue(new Error('ERROR'));

      await expect(cacheService.set('KEY', 'VALUE')).rejects.toThrow(
        `key KEY can't set value, errror: ERROR`,
      );
    });
  });

  describe('del', () => {
    it('should be del value in cache success', async () => {
      cacheService.del('KEY');

      expect(mockCacheManager.del).toHaveBeenCalledWith('KEY');
    });

    it('should be del value in cache unsuccess', async () => {
        mockCacheManager.del.mockRejectedValue(new Error('ERROR'));

      await expect(cacheService.del('KEY')).rejects.toThrow(
        `key KEY can't delete, error :ERROR`,
      );
    });
  });

 
});
