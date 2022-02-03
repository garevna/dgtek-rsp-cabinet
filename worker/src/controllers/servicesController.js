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

  async getSLAContent (request) {
    self.postMessage(await self.controller.getSLAContent(request.key))
  }

  async getActiveConnections (request) {
    self.postMessage(await self.controller.getServiceActiveConnections(request.key))
  }

  async getPendingConnections (request) {
    self.postMessage(await self.controller.getServicePendingConnections(request.key))
  }
}

export const servicesController = new ServicesController()
