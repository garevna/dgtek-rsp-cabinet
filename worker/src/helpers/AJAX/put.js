import {
  hostHandler,
  apiKeyHandler,
  credentialsHandler
} from '../env'

export const put = async (path, data) => {
  if (!navigator.onLine) return { status: 0, result: 'Offline mode: Data has not been saved. Try later' }

  // self.postMessage({ status: 300, message: 'DATA', data: JSON.parse(JSON.stringify(data)) })

  const response = await fetch(`${hostHandler()}/${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: apiKeyHandler(),
      Credentials: credentialsHandler()
    },
    body: JSON.stringify(data)
  })

  const result = await response.json()

  // self.postMessage({ status: 300, message: 'PUT TO REMOTE SERVER', response: { status: response.status, result } })

  return { status: response.status, result }
}
