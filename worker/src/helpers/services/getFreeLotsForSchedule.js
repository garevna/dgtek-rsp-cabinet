// import { get } from '../AJAX'
// import { putRecordByKey } from '../db'
// import { refreshServicesListError } from '../error-handlers'

// const route = 'services'
//
// export const getFromRemoteServer = async function () {
//   const action = 'refresh'
//   const response = await get('service')
//
//   if (response.status !== 200) return refreshServicesListError(status)
//
//   for (const service of response.result) {
//     await putRecordByKey('services', service._id, service)
//   }
//
//   return Object.assign(response, { route, action })
// }

export const getFreeLotsForSchedule = async function () {
  const date = Date.now()

  const lots = {}

  for (let d = 1; d < 50; d++) {
    const nextDate = new Date(date + d * 24 * 60 * 60 * 1000)
    lots[nextDate.toISOString().slice(0, 10)] = {
      am: Math.random() > 0.5,
      pm: Math.random() > 0.5
    }
  }
  return { status: 200, route: 'schedule', action: 'get', result: lots }
}
