import { Test } from '@nestjs/testing'
import { EnvService } from '../env.service'
import { ConfigService } from '@nestjs/config'
import { EnvModule } from '../env.module'

describe('EnvService', () => {
  let envService: EnvService
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [EnvModule],
      providers: [
        EnvService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile()

    envService = moduleRef.get<EnvService>(EnvService)
  })

  it('should be defined', () => {
    expect(envService).toBeDefined()
  })

  test('should be get value PORT', () => {
    expect(envService.PORT).toEqual(3000)
  })
})

const mockConfigService = {
  get(key: string) {
    switch (key) {
      case 'PORT':
        return 3000 // Replace with your predefined values
      case 'ENVIRONMENT':
        return 'development'
      // Add more cases for other environment variables if needed
      default:
        return null
    }
  },
}
