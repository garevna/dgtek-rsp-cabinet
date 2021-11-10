class CustomersController {
  async getFromRemote () {
    self.postMessage(await self.controller.refreshCustomers())
  }

  async getAllCustomers () {
    self.postMessage(await self.controller.getAllCustomers())
  }

  async getCustomer (request) {
    self.postMessage(await self.controller.getCustomer(request.key))
  }

  async deleteCustomer (request) {
    self.postMessage(await self.controller.deleteCustomer(request.key))
  }

  async updateCustomer (request) {
    self.postMessage(await self.controller.updateCustomer(request.key, request.data))
  }

  async createCustomer (request) {
    self.postMessage(await self.controller.createCustomer(request.data))
  }

  async updateCustomerServices (request) {
    const response = await self.controller.updateCustomerServices(request.customerId, request.services)
    self.postMessage(Object.assign(response, {
      message: true,
      messageType: 'Customer services',
      messageText: 'Customer services were successfully updated. Please do not forget to request connection by clicking the "Not Connected" link'
    }))
  }

  async getCustomersListForTable () {
    self.postMessage(await self.controller.getCustomersListForTable())
  }

  async getCustomersListForTicket (postCode, addressPart) {
    self.postMessage(await self.controller.getShortListOfCustomers(postCode, addressPart))
  }

  async getFilteredShortListOfCustomers (request) {
    self.postMessage(await self.controller.getFilteredShortListOfCustomers(request.filter))
  }

  async getAwaitingForConnection () {
    self.postMessage(await self.controller.getAwaitingCustomerShortList())
  }

  async activateServiceRequest ({ customerId, serviceId }) {
    const response = (await self.controller.activateServiceRequest(customerId, serviceId))

    self.postMessage(response)

    const { result: services } = response

    self.postMessage(await self.controller.updateCustomerServices(customerId, services))
  }

  async scheduling (request) {
    self.postMessage(await self.controller.schedulingRequest(request.data))
  }
}

export const customersController = new CustomersController()
