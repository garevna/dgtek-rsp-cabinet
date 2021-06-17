import { put } from '../AJAX'
import { idHandler } from '../env'
import { getRecordByKey, putRecordByKey } from '../db'

const { putClientDataError } = require('../error-handlers').default

export const updateClientDetails = async function (data) {
  const [route, action, key] = ['rsp', 'put', idHandler()]

  const { status: getStatus, result: getResult } = await getRecordByKey('rsp', key, data)

  if (getStatus !== 200) return { status: getStatus, route, action, result: getResult, message: 'Worker DB error: read from local DB failed' }

  const { company, general, technic } = data

  const requestData = Object.assign(getResult, { company, general, technic })

  const { status: putStatus } = await putRecordByKey('rsp', idHandler(), requestData)

  if (putStatus !== 200) return putClientDataError(putStatus)

  const { status, result } = await put(`user/${key}`, requestData)

  if (status !== 200) return putClientDataError(status)

  return {
    status,
    route,
    action,
    result,
    message: true,
    messageType: 'Company details',
    messageText: 'Details saved'
  }
}
