import { openDB } from '../openDB'

export async function getTicketNumbers () {
  const response = await openDB()

  if (response.status !== 200) return response

  const { result: db } = response

  const store = db.transaction('tickets', 'readonly').objectStore('tickets')

  const result = []

  return new Promise((resolve) => {
    store.openCursor().onsuccess = (event) => {
      const cursor = event.target.result
      if (cursor) {
        result.push(cursor.value.number)
        cursor.continue()
      } else {
        resolve({ status: 200, result })
      }
    }
  })
}
