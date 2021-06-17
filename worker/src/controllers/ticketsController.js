class TicketsController {
  async refresh (request) {
    self.postMessage(await self.controller.refreshTickets(request))
  }

  async getCategories () {
    self.postMessage(await self.controller.getCategories())
  }

  async list () {
    self.postMessage(await self.controller.getListOfTickets())
  }

  async get (request) {
    self.postMessage(await self.controller.getTicketData(request.id))
  }

  async put (request) {
    self.postMessage({ status: 300, request })
    self.postMessage(await self.controller.putTicketData(request.key, request.data))
  }

  async post (request) {
    self.postMessage(await self.controller.postNewTicket(request))
  }
}

export const ticketsController = new TicketsController()
