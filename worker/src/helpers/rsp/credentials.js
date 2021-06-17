import { getUser } from '../AJAX'
import { putRecordByKey } from '../db'
import { decrypt } from '../crypto'
import {
  hostHandler,
  apiKeyHandler,
  secretHandler,
  loginHandler,
  idHandler,
  passwordHandler,
  credentialsHandler,
  adminKeyHandler,
  adminCredHandler
} from '../env'

const { credentialsError } = require('../error-handlers').default

export const credentials = async function (data) {
  const [route, action] = ['rsp', 'credentials']

  const { credentials, host, key, secret, adminKey, adminCred } = data

  if (!credentials || !host || !key || !secret || !adminKey || !adminCred) return credentialsError()

  hostHandler(host)
  apiKeyHandler(key)
  secretHandler(secret)
  adminKeyHandler(adminKey)
  adminCredHandler(adminCred)

  credentialsHandler(credentials)

  const { status: decryptStatus, action: decryptAction, result: decryptResult } = decrypt(credentials)

  if (decryptStatus !== 200) return { status: decryptStatus, route, action: decryptAction, key: 'password description', result: decryptResult }

  const { login, password } = JSON.parse(decryptResult)

  loginHandler(login)
  passwordHandler(password)

  const response = await getUser(login, password)

  if (response.status !== 200) return response

  putRecordByKey('rsp', response.result._id, response.result)

  idHandler(response.result._id)

  return {
    status: 200,
    route,
    action,
    result: { role: response.result.userInfo.role }
  }
}
