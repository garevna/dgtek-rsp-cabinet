export const events = {
  rsp: {
    refresh: 'client-data-refreshed',
    get: 'client-data-received',
    put: 'client-data-updated'
  },
  customers: {
    refresh: 'customers-list-refreshed',
    list: 'customers-list-received',
    get: 'customer-data-received',
    post: 'customer-created',
    put: 'customer-updated'
  },
  services: {
    refresh: 'services-list-refreshed',
    // list: 'services-list-received',
    get: 'service-data-received'
  },
  tickets: {
    refresh: 'tickets-list-refreshed',
    categories: 'categories-received',
    list: 'tickets-list-received',
    get: 'ticket-data-received',
    post: 'ticket-created',
    put: 'ticket-updated'
  }
}
