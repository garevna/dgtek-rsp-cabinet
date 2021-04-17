import { put } from '../AJAX'
import { idHandler } from '../env'
import { getRecordByKey, putRecordByKey } from '../db'

export const update = async function (data) {
  const [route, action, key] = ['rsp', 'put', idHandler()]

  const { status: getStatus, result: getResult } = await getRecordByKey('rsp', key, data)

  if (getStatus !== 200) return { status: getStatus, route, action, result: getResult, message: 'Worker DB error: read from local DB failed' }

  self.postMessage({ status: 300, route, action, result: getResult, message: 'Data from local DB' })
  self.postMessage({ status: 300, route, action, result: data.key, message: 'Data from app to be stored' })

  const { company, general, technic } = data

  const requestData = Object.assign(getResult, { company, general, technic })

  const { status: putStatus, result: putResult } = await putRecordByKey('rsp', idHandler(), requestData)

  self.postMessage({ status: 300, route, action, result: getResult, message: 'Data from local DB' })

  if (putStatus !== 200) return { status: putStatus, route, action, key, result: putResult, message: 'WORKER DB error: store to local DB failed' }

  const { status, result } = await put(`user/${key}`, requestData)

  return { status, route, action, key, result, message: 'Worker: AJAX error' }
}
