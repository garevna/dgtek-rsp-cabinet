import { openDB } from './openDB'

export async function searchRecords (storeName, propName, partialValue) {
  const response = await openDB()

  if (response.status !== 200) return response

  const { result: db } = response

  const store = db.transaction(storeName, 'readonly').objectStore(storeName)

  const result = []

  return new Promise((resolve) => {
    store.openCursor().onsuccess = (event) => {
      const cursor = event.target.result
      if (cursor) {
        if (cursor.value[propName].indexOf(partialValue) !== -1) result.push(cursor.value)
        cursor.continue()
      } else {
        // self.postMessage({ status: 300, action: 'SEARCH', propName, partialValue, result })
        resolve({ status: 200, result })
      }
    }
  })
}
