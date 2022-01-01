import { hash, encrypt } from '../crypto'
import { loginHandler, passwordHandler, credentialsHandler } from '../env'
import { post } from '../AJAX'

const { putClientCredentialsError } = require('../error-handlers').default

const [route, action] = ['rsp', 'password']

export const passwordChange = async function (request) {
  const { login, password, phoneNumber } = request.data

  if (!login || !password || !phoneNumber) return putClientCredentialsError(422)

  const { result: passwordHash } = hash(password)

  const { status: encryptStatus, result: cryptoPassword } = await encrypt(JSON.stringify({ password: passwordHash }))

  if (encryptStatus !== 200) return putClientCredentialsError(encryptStatus)

  const { status, result } = await post('pass/change', {
    newPass: cryptoPassword,
    login,
    phoneNumber
  })

  if (status !== 200) {
    return {
      status,
      route,
      action,
      error: true,
      errorType: 'Partner\' credentials conflict',
      errorMessage: result.error
    }
  }

  loginHandler(login)
  passwordHandler(passwordHash)

  const { status: cryptoStatus, result: credentials } = encrypt(JSON.stringify({
    login,
    password: passwordHandler()
  }))

  if (cryptoStatus !== 200) return putClientCredentialsError(cryptoStatus)

  credentialsHandler(credentials)

  return {
    status,
    route,
    action,
    result: credentials,
    message: true,
    messageType: 'Partner\' details',
    messageText: 'Partner\'s credentials updated. You should sign in again.'
  }
}
