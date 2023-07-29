import { HttpStatus } from '@nestjs/common'
import { ErrorName } from './errorCode'

export interface ErrorCode {
  status: number
  code: ErrorName
  description: string
  message: string
}

export const eCodeList: ErrorCode[] = [
  {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    code: ErrorName.E1005000,
    description: 'internal server error',
    message: '',
  },
]
