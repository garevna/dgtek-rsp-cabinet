import { getFromRemoteServer, getFromLocalDb } from '../helpers/services'

class ServicesController {
  async refresh (request) {
    self.postMessage(await getFromRemoteServer())
  }

  async get (request) {
    self.postMessage(await getFromLocalDb())
  }
}

export const servicesController = new ServicesController()
