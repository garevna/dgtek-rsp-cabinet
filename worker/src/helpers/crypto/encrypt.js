import { secretHandler } from '../env'
import { emptyData, secretError, encryptError } from '../../configs'

const crypto = require('crypto-js')

export const encrypt = (data) => {
  const action = 'encrypt'
  if (!data) return { status: 422, action, result: emptyData }

  const secret = secretHandler()

  if (!secret) return { status: 500, action, result: secretError }

  const result = crypto.AES.encrypt(data, secret).toString()

  return result ? { status: 200, action, result } : { status: 500, action, result: encryptError }
}
