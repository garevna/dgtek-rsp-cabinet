import {
  getFromRemoteServer,
  getFromLocalDb,
  getServiceById,
  getFreeLotsForSchedule
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

  async getFreeLotsForSchedule () {
    self.postMessage(await getFreeLotsForSchedule())
  }
}

export const servicesController = new ServicesController()
