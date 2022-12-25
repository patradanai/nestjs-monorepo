import { ErrCodeException } from '../exceptionFilter/errorCodeException'
import { eCodeList } from './errorList'
import { errorName } from './errorCode'

export const ErrCodeByName = (
  errCode: typeof errorName[keyof typeof errorName],
): ErrCodeException => {
  for (const error of eCodeList) {
    if (error.code === errCode) {
      return new ErrCodeException(error)
    }
  }

  return new ErrCodeException(
    eCodeList.find((val) => val.code === errorName.e1005000),
  )
}
