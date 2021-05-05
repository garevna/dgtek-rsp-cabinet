const remoteServerError = 'Error reading the data from remote server'
const localDbError = 'Error reading the data from local DB'

export const rspWorkerErrors = {
  rsp: {
    refresh: {
      errorType: 'Client details',
      errorMessage: remoteServerError
    },
    get: {
      errorType: 'Client details',
      errorMessage: localDbError
    },
    put: {
      errorType: 'Client details',
      errorMessage: 'Data was not updated'
    }
  },
  customers: {
    refresh: {
      errorType: 'Customers',
      errorMessage: remoteServerError
    },
    list: {
      errorType: 'Customers',
      errorMessage: localDbError
    },
    get: {
      errorType: 'Customer details',
      errorMessage: localDbError
    },
    put: {
      errorType: 'Customer details',
      errorMessage: 'Data was not updated'
    }
  },
  tickets: {
    refresh: {
      errorType: 'Tickets',
      errorMessage: remoteServerError
    },
    list: {
      errorType: 'Tickets list',
      errorMessage: localDbError
    },
    get: {
      errorType: 'Ticket details',
      errorMessage: localDbError
    },
    put: {
      errorType: 'Ticket details',
      errorMessage: 'Data was not updated'
    },
    post: {
      errorType: 'Create a ticket',
      errorMessage: 'New ticket was not created'
    }
  },
  categories: {
    get: {
      errorType: 'Ticket categories',
      errorMessage: localDbError
    }
  },
  services: {
    refresh: {
      errorType: 'Services',
      errorMessage: remoteServerError
    },
    list: {
      errorType: 'Services list',
      errorMessage: localDbError
    },
    get: {
      errorType: 'Service details',
      errorMessage: localDbError
    }
  }
}
