// import {
//   getCustomerUpdates,
//   getTicketCategoryUpdates,
//   getTicketUpdates,
//   getMessageUpdates
// } from '../helpers/updates'

// import { putRecordByKey } from '../helpers/db'

class UpdatesController {
  async sendNotification (request) {
    self.postDebugMessage({ request })
    self.postMessage(await self.controller.sendNotification(request.target, request.id))
  }

  async getTicketUpdates () {
    self.postMessage(await self.controller.getTicketUpdates())
  }

  async getCustomerUpdates () {
    self.postMessage(await self.controller.getCustomerUpdates())
  }

  async getMessageUpdates () {
    self.postMessage(await self.controller.getMessageUpdates())
  }

  async getLastUpdates () {
    const [customers, tickets] = await Promise.all([
      self.controller.getCustomerUpdates(),
      self.controller.getTicketUpdates(),
      self.controller.getServicesUpdates(),
      self.controller.getMessageUpdates()
    ])

    self.postMessage({ status: 200, route: 'updates', action: '*', result: { customers: customers.result, tickets: tickets.result } })
  }
}

export const updatesController = new UpdatesController()
