import { HttpStatus } from '@nestjs/common'
import { errorName } from './errorCode'

export interface errorCode {
  status: number
  code: string
  description: string
  message: string
}

export const eCodeList: errorCode[] = [
  {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    code: errorName['e1005000'],
    description: 'internal server error',
    message: '',
  },
]
