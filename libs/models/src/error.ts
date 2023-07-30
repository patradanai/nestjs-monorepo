import { IErrorCode } from '@app/utils/statics/errors'

abstract class IErrCodeException {
  abstract getCode(): string
  abstract getDescription(): string
  abstract getMessage(): string
  abstract getStatus(): number
  abstract getStack(): string
}

export class ErrCodeException extends Error implements IErrCodeException {
  private statusCode
  private errCode
  private errDesc
  private errMsg

  constructor(error: IErrorCode) {
    super()

    this.errCode = error.code
    this.errDesc = error.description
    this.errMsg = error.message
    this.statusCode = error.status
  }

  getStack(): string {
    return this.stack
  }

  getCode(): string {
    return this.errCode
  }

  getDescription(): string {
    return this.errDesc
  }

  getMessage(): string {
    return this.errMsg
  }

  getStatus(): number {
    return this.statusCode
  }
}
