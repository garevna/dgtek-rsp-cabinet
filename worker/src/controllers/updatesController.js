import {
  getCustomerUpdates,
  getTicketCategoryUpdates,
  getTicketUpdates,
  getMessageUpdates
} from '../helpers/updates'

// import { putRecordByKey } from '../helpers/db'

class UpdatesController {
  async getTicketCategoryUpdates () {
    self.postMessage(await getTicketCategoryUpdates())
  }

  async getTicketUpdates () {
    self.postMessage(await getTicketUpdates())
  }

  async getCustomerUpdates () {
    self.postMessage(await getCustomerUpdates())
  }

  async getMessageUpdates () {
    self.postMessage(await getMessageUpdates())
  }

  async getLastUpdates () {
    const [customers, tickets] = await Promise.all([
      getCustomerUpdates(),
      getTicketUpdates()
    ])

    self.postMessage({ status: 200, route: 'updates', action: '*', result: { customers: customers.result, tickets: tickets.result } })
  }
}

export const updatesController = new UpdatesController()
