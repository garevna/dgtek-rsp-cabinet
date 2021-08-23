import { openDB } from '../openDB'

export async function searchAwaitingForConnectionCustomers () {
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
          const found = cursor.value.services.find(service => service.status === 'Awaiting for connection')
          if (found) {
            const { uniqueCode, _id: customerId } = cursor.value

            result.push(Object.assign({}, { uniqueCode, customerId }))
          }
        }
        cursor.continue()
      } else {
        resolve({ status: 200, result })
      }
    }
  })
}
