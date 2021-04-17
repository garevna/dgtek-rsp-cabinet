import { get } from '../AJAX'
import { putRecordByKey } from '../db'
import { idHandler } from '../env'
import { refreshClientDataError } from '../error-handlers'

export const getFromRemoteServer = async function () {
  const [route, action] = ['rsp', 'refresh']

  const { status, result } = await get(`user/${idHandler()}`)

  if (status !== 200) return refreshClientDataError(status)

  // await clearStore('rsp')

  const { _id, ...data } = result

  const { status: clientStatus, result: clientData } = await putRecordByKey('rsp', _id, data)

  if (clientStatus !== 200) return refreshClientDataError(clientStatus)

  return { status: clientStatus, route, action, result: clientData }
}
