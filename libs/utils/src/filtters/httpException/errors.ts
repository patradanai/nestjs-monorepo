import { ErrCodeException } from '@app/models'

import { eCodeList, ErrorName } from '../../statics/errors'

export const ErrCodeByName = (errCode: ErrorName): ErrCodeException => {
  for (const error of eCodeList) {
    if (error.code === errCode) {
      return new ErrCodeException(error)
    }
  }

  return new ErrCodeException(
    eCodeList.find((val) => val.code === ErrorName.E1005000),
  )
}
