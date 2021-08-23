import { secretHandler } from '../env'
import { emptyData, secretError, encryptError } from '../../configs'

export const encrypt = (data) => {
  const action = 'encrypt'
  if (!data) {
    return {
      status: 422,
      route: 'encrypt',
      action,
      error: true,
      errorType: 'Crypto',
      result: emptyData
    }
  }

  if (!secretHandler()) {
    return {
      status: 500,
      route: 'encrypt',
      action,
      error: true,
      errorType: 'Crypto',
      result: secretError
    }
  }

  const result = require('crypto-js/aes').encrypt(data, secretHandler()).toString()

  return result ? { status: 200, action, result } : { status: 500, action, result: encryptError }
}
