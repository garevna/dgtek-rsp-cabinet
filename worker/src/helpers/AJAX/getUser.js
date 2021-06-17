import { hostHandler, adminKeyHandler, adminCredHandler } from '../env'

const error = {
  status: 401,
  route: 'user',
  action: 'get',
  error: true,
  errorType: 'Authentification error',
  errorMessage: 'Invalid credentials'
}

export const getUser = async function (login, password) {
  if (!navigator.onLine) return { status: 0, result: 'Offline mode' }

  const [route, action] = ['user', 'get']

  const response = await fetch(`${hostHandler()}/user`, {
    method: 'GET',
    headers: {
      Authorization: adminKeyHandler(),
      Credentials: adminCredHandler()
    }
  })

  const result = (await (response.json())).data

  if (response.status !== 200) return error

  const rsp = result.find(user => user.userInfo.login === login && user.userInfo.password === password)

  if (!rsp) return error

  return { status: 200, route, action, result: rsp }
}
