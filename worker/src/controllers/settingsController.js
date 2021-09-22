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
}

export const settingsController = new SettingsController()
