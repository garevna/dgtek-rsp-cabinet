import { idHandler } from '../env'
import { getRecordByKey } from '../db'
import { getClientDataError } from '../error-handlers'

export const getFromLocalDb = async function () {
  const [route, action] = ['rsp', 'get']
  const { status, result } = await getRecordByKey('rsp', idHandler())

  const response = { status, route, action, key: idHandler(), result }
  if (status !== 200) return getClientDataError(status)

  return response
}
