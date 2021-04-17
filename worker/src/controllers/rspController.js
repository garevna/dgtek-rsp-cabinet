import {
  credentials,
  passwordChange,
  getFromRemoteServer,
  getFromLocalDb,
  update
} from '../helpers/rsp'

class RSPController {
  async credentials () {
    self.postMessage(await credentials())
  }

  async passwordChange (password) {
    self.postMessage(await passwordChange(password))
  }

  async refresh () {
    self.postMessage(await getFromRemoteServer())
  }

  async get () {
    self.postMessage(await getFromLocalDb())
  }

  async update (request) {
    self.postMessage({ status: 300, route: 'rsp', action: 'put', key: request.key, result: request.data })
    self.postMessage(await update(request.data))
  }
}

export const rspController = new RSPController()
