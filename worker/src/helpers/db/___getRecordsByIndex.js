import { openDB } from './openDB'

export async function getRecordsByIndex (storeName, indexName, indexValue) {
  const { result: db } = await openDB()

  if (!db) return { status: 500, result: null }

  const store = db.transaction(storeName, 'readonly').objectStore(storeName)
  const index = store.index(indexName)

  return new Promise((resolve) => {
    Object.assign(index.getAll(indexValue), {
      onsuccess: event => resolve({ status: 200, result: event.target.result }),
      onerror: event => resolve({ status: event, result: null })
    })
  })
}
