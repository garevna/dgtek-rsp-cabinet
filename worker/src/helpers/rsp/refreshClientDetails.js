import { get } from '../AJAX'
import { putRecordByKey, clearStore } from '../db'
import { idHandler } from '../env'
import { partnerUniqueCodeHandler } from '../../data-handlers'

const { refreshClientDataError } = require('../error-handlers').default

export const refreshClientDetails = async function () {
  const [route, action] = ['rsp', 'refresh']

  const response = await get(`user/${idHandler()}`)

  if (response.status !== 200) return refreshClientDataError(response.status)

  partnerUniqueCodeHandler(response.result.uniqueCode)

  await clearStore('rsp')

  const { status, result } = await putRecordByKey('rsp', idHandler(), response.result)

  if (status !== 200) return refreshClientDataError(status)

  return { status, route, action, result }
}
