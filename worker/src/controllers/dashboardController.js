import { servicesInfoHandler } from '../data-handlers'

class DashboardController {
  getCustomersServicesInfo () {
    self.postMessage({ status: 200, route: 'dashboard', action: 'info', result: servicesInfoHandler() })
  }
}

export const dashboardController = new DashboardController()
