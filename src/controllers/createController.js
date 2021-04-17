import * as actions from './actions'

export const createController = function () {
  Object.assign(window[Symbol.for('vue.prototype')], {
    __refreshClientData: actions.refreshClientData,
    __refreshCustomers: actions.refreshCustomers,
    __refreshTickets: actions.refreshTickets,
    __refreshServices: actions.refreshServices,

    __getClientData: actions.getClientData,
    __putClientData: (data) => actions.putClientData(data),
    __putClientCredentials: (data) => actions.putClientCredentials(data),

    __getCustomers: actions.getCustomers,
    __getCustomerData: (id) => actions.getCustomerById(id),
    __putCustomer: (id, data) => actions.putCustomer(id, data),
    __postCustomer: (data) => actions.postCustomer(data),
    __deleteCustomer: (id) => actions.deleteCustomer(id),

    __getTickets: actions.getTickets,
    __getCategories: actions.getCategories,
    __getTicketData: (id) => actions.getTicketById(id),
    __putTicketData: (id, data) => actions.putTicketById(id, data),
    __postNewTicket: (data) => actions.postNewTicket(data),
    __getServices: actions.getServices
  })
}
