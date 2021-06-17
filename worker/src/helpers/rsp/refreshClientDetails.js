import { get } from '../AJAX'
import { putRecordByKey, clearStore } from '../db'
import { idHandler } from '../env'

const { refreshClientDataError } = require('../error-handlers').default

export const refreshClientDetails = async function () {
  const [route, action] = ['rsp', 'refresh']

  const response = await get(`user/${idHandler()}`)

  if (response.status !== 200) return refreshClientDataError(response.status)

  await clearStore('rsp')

  const { status, result } = await putRecordByKey('rsp', idHandler(), response.result)

  if (status !== 200) return refreshClientDataError(status)

  return { status, route, action, result }
}
