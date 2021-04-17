import {
  getFromRemoteServer,
  getCategories,
  getFromLocalDb,
  getTicketData,
  putTicketData,
  postNewTicket
} from '../helpers/tickets'

class TicketsController {
  async refresh (request) {
    self.postMessage(await getFromRemoteServer(request))
  }

  async getCategories () {
    self.postMessage(await getCategories())
  }

  async list () {
    self.postMessage(await getFromLocalDb())
  }

  async get (request) {
    self.postMessage(await getTicketData(request.id))
  }

  async put (request) {
    self.postMessage(await putTicketData(request.id, request.data))
  }

  async post (request) {
    self.postMessage(await postNewTicket(request))
  }
}

export const ticketsController = new TicketsController()
