import { getCredentials } from '../AJAX'
import { encrypt, decrypt } from '../crypto'
import {
  loginHandler,
  idHandler,
  passwordHandler,
  credentialsHandler
} from '../env'

export const credentials = async function () {
  const [route, action] = ['rsp', 'credentials']

  const { status, result } = await getCredentials()

  if (status !== 200) return { status, route, action, result }

  const { _id, userInfo } = result
  idHandler(_id)

  const { login, password } = userInfo
  loginHandler(login)

  const { status: decryptStatus, action: decryptAction, result: decryptResult } = decrypt(password)

  if (decryptStatus !== 200) return { status: decryptStatus, route, action: decryptAction, key: 'password description', result: decryptResult }

  passwordHandler(decryptResult)

  const { status: encryptStatus, action: encryptAction, result: credentials } = encrypt(JSON.stringify({
    login,
    password: passwordHandler()
  }))

  if (encryptStatus !== 200) return { status: encryptStatus, action: encryptAction, key: 'credentials', result: credentials }

  credentialsHandler(credentials)

  return {
    status: 200,
    route,
    action,
    result: {
      id: idHandler(),
      login: loginHandler()
      // role: userInfo.role,
      // passHash: passwordHandler(),
      // credentials: credentialsHandler()
    }
  }
}
