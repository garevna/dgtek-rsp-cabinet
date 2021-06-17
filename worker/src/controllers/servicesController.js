class ServicesController {
  async refresh (request) {
    self.postMessage(await self.controller.refreshListOfServices())
  }

  async list (request) {
    self.postMessage(await self.controller.getListOfServices())
  }

  async get (request) {
    self.postMessage(await self.controller.getServiceById(request.key))
  }

  async getFreeLotsForSchedule () {
    self.postMessage(await self.controller.getFreeLotsForSchedule())
  }
}

export const servicesController = new ServicesController()
