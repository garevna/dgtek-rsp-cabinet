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
    get: 'services-list-received'
    // get: 'service-data-received'
  },
  tickets: {
    refresh: 'tickets-list-refreshed',
    categories: 'categories-received',
    list: 'tickets-list-received',
    get: 'ticket-data-received',
    post: 'ticket-created',
    put: 'ticket-updated'
  },
  buildings: {
    list: {
      LIT: 'lit-buildings-list',
      Footprint: 'footprint-buildings-list'
    },
    put: 'buildings-data-saved',
    post: 'new-building-created',
    getById: 'building-data-received',
    getByAddress: 'building-data-received'
  }
}
