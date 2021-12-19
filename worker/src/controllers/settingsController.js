import {
  availableServiceStatusHandler,
  pendingConnectionStatusHandler
} from '../data-handlers'

class SettingsController {
  async refresh () {
    self.postMessage(await self.controller.refreshSettings())
  }

  async get (request) {
    self.postMessage(await self.controller.getSettings(request.section, request.key))
  }

  async getEstimatedServiceDeliveryTime (request) {
    self.postMessage(await self.controller.getEstimatedServiceDeliveryTime(request.key))
  }

  async getTicketCategories () {
    self.postMessage(await self.controller.getTicketCategories())
  }

  getAvailableServiceStatus () {
    self.postMessage(availableServiceStatusHandler())
  }

  getPendingConnectionStatus () {
    self.postMessage(pendingConnectionStatusHandler())
  }
}

export const settingsController = new SettingsController()
