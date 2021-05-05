import {
  getFromRemoteServer,
  getFromLocalDb,
  getServiceById
} from '../helpers/services'

class ServicesController {
  async refresh (request) {
    self.postMessage(await getFromRemoteServer())
  }

  async list (request) {
    self.postMessage(await getFromLocalDb())
  }

  async get (request) {
    self.postMessage(await getServiceById(request.key))
  }
}

export const servicesController = new ServicesController()
