const remoteServerError = 'Error reading the data from remote server'

export const errors = {
  rsp: {
    refresh: {
      errorType: 'Company Details',
      errorMessage: remoteServerError
    },
    get: {
      errorType: 'Company Details',
      errorMessage: 'Reading the data failed'
    },
    put: {
      errorType: 'Company Details',
      errorMessage: 'Data update failed'
    },
    password: {
      errorType: 'Company Details',
      errorMessage: 'Password change failed'
    }
  },
  customers: {
    refresh: {
      errorType: 'Customers',
      errorMessage: remoteServerError
    },
    list: {
      errorType: 'Customers',
      errorMessage: 'Reading the list of customers failed'
    },
    get: {
      errorType: 'Customer',
      errorMessage: 'Reading the customer data failed'
    },
    put: {
      errorType: 'Customer',
      errorMessage: 'Customer data update failed'
    },
    activate: {
      errorType: 'Customer service activation',
      errorMessage: 'Operation failed. You service delivery update request has not been sent.'
    }
  },
  tickets: {
    refresh: {
      errorType: 'Tickets',
      errorMessage: remoteServerError
    },
    list: {
      errorType: 'Tickets',
      errorMessage: 'Reading the tickets list failed'
    },
    get: {
      errorType: 'Tickets',
      errorMessage: 'Reading the ticket data failed'
    }
  },
  services: {
    refresh: {
      errorType: 'Services',
      errorMessage: remoteServerError
    },
    list: {
      errorType: 'Services',
      errorMessage: 'Reading the services list failed'
    }
  }
}
