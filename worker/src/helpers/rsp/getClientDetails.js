import { idHandler } from '../env'
import { getRecordByKey } from '../db'

const { getClientDataError } = require('../error-handlers').default

export const getClientDetails = async function () {
  const [route, action] = ['rsp', 'get']
  const { status, result } = await getRecordByKey('rsp', idHandler())

  const response = { status, route, action, key: idHandler(), result }
  if (status !== 200) return getClientDataError(status)

  return response
}
