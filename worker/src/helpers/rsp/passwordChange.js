import { hash, encrypt } from '../crypto'
import { loginHandler, passwordHandler, credentialsHandler } from '../env'
import { post } from '../AJAX'
import { putClientCredentialsError } from '../error-handlers'

export const passwordChange = function (request) {
  const { login, userName, password, userPhone } = request

  const newPasswordHash = hash(password)

  const { status: encryptStatus, result: cryptoPassword } = encrypt(newPasswordHash)
  if (encryptStatus !== 200) return putClientCredentialsError(encryptStatus)

  const { status } = post('pass/change', {
    newPass: cryptoPassword,
    login,
    userName,
    userPhone
  })

  if (status !== 200) return putClientCredentialsError(status)

  loginHandler(login)
  passwordHandler(newPasswordHash)

  const { status: cryptoStatus, result: credentials } = encrypt(JSON.stringify({
    login,
    password: passwordHandler()
  }))

  if (cryptoStatus !== 200) return putClientCredentialsError(cryptoStatus)

  credentialsHandler(credentials)

  return {
    status,
    route: 'rsp',
    action: 'change-password',
    result: 'Password changed',
    message: true,
    messageType: 'Company credentials',
    messageText: 'Password changed'
  }
}
