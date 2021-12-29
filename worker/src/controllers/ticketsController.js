const requestError = {
  status: 422,
  route: 'tickets',
  error: true,
  errorType: 'Invalid request'
}

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
    if (!request.key) {
      return self.postMessage(Object.assign(requestError, {
        action: 'put',
        errorMessage: 'Ticket id is not defined'
      }))
    }
    self.postMessage(await self.controller.putTicketData(request.key, request.data))
  }

  async patch (request) {
    if (!request.key) {
      return self.postMessage(Object.assign(requestError, {
        action: 'patch',
        errorMessage: 'Ticket id is not defined'
      }))
    }
    self.postMessage(await self.controller.patchTicket(request.key, request.data))
  }

  async updateHistory (request) {
    if (!request.key) {
      return self.postMessage(Object.assign(requestError, {
        action: 'history',
        errorMessage: 'Ticket id is not defined'
      }))
    }
    self.postMessage(await self.controller.patchTicketHistory(request.key, request.history))
  }

  async post (request) {
    self.postMessage(await self.controller.postNewTicket(request))
  }

  // async getNumber () {
  //   self.postMessage(await self.controller.getTicketNumber())
  // }
}

export const ticketsController = new TicketsController()
