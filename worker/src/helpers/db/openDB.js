import { dbName, storeNames } from '../../configs'

export const openDB = () => new Promise((resolve) => Object.assign(indexedDB.open(dbName), {
  onupgradeneeded: (event) => {
    for (const storeName in storeNames) {
      event.target.result.createObjectStore(storeName)
    }
    return event.target.result
  },
  onsuccess: event => resolve({
    status: 200,
    result: event.target.result
  }),
  onerror: event => resolve({
    status: 500,
    result: null,
    error: true,
    errorType: 'Local DB',
    errorMessage: 'Error opening the local DB'
  })
}))
