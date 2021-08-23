import { openDB } from '../openDB'

// const pending = ['Awaiting for connection', 'Awaiting for confirmation', 'In job queue']
const pending = ['Not connected', 'Awaiting for scheduling']
// const work = ['Not connected', 'Awaiting for scheduling']

export async function searchPendingConnections (serviceId) {
  const response = await openDB()

  if (response.status !== 200) return response

  const { result: db } = response

  const store = db.transaction('customers', 'readonly').objectStore('customers')

  const result = []

  return new Promise((resolve) => {
    store.openCursor().onsuccess = (event) => {
      const cursor = event.target.result
      if (cursor) {
        if (cursor.value.services && cursor.value.services.length) {
          const found = cursor.value.services.find(service => service.id === serviceId)
          if (found && pending.includes(found.status)) {
            const { address, apartmentNumber, uniqueCode, firstName, lastName, _id: customerId } = cursor.value

            result.push(Object.assign({}, {
              address: `${apartmentNumber}/${address}`,
              uniqueCode,
              customerName: `${firstName} ${lastName}`,
              customerId,
              serviceStatus: found.status
            }))
          }
        }
        cursor.continue()
      } else {
        resolve({ status: 200, result })
      }
    }
  })
}
