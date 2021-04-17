// import { hosthandler } from '../env'
// import { getRecordByKey } from '../indexedDB'
//
// export async function upload (target, formData) {
//   const { status, result: token } = await getRecordByKey('pineapple', 'common', 'token')
//   if (status !== 200) return { status: 403, result: 'Unauthorized user. Access denied' }
//   if (!navigator.onLine) return { status: 0, result: 'Offline mode: Operation failed. Try later' }
//
//   const response = await fetch(hosthandler(), {
//     method: 'POST',
//     headers: {
//       Authorization: token
//     },
//     body: formData
//   })
//   return { status: response.status, result: await response.text() }
// }
