import {
  // servicesInfoHandler,
  messagesHandler
} from '../data-handlers'

class DashboardController {
  // getCustomersServicesInfo () {
  //   self.postMessage({ status: 200, route: 'dashboard', action: 'info', result: servicesInfoHandler() })
  // }

  async refreshMessages () {
    self.postMessage(await self.controller.refreshMessages())
  }

  getMessages () {
    self.postMessage({ status: 200, route: 'dashboard', action: 'get-messages', result: messagesHandler() })
  }

  async patchMessage (request) {
    self.postMessage(await self.controller.patchMessage(request.messageId, request.fields))
  }
}

export const dashboardController = new DashboardController()
