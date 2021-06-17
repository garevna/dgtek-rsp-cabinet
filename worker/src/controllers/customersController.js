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
    const response = await self.controller.updateCustomerServices(request.key, request.data)
    self.postMessage(Object.assign(response, {
      message: true,
      messageType: 'Customer services',
      messageText: 'Customer services were successfully updated'
    }))
  }

  async getCustomersListForTicket (postCode, addressPart) {
    self.postMessage(await self.controller.getShortListOfCustomers(postCode, addressPart))
  }

  async activateServiceRequest ({ customerId, serviceId }) {
    // self.postMessage({ status: 300, message: 'CUSTOMER CONTROLLER', customerId, serviceId })
    const response = await self.controller.activateServiceRequest(customerId, serviceId)

    self.postMessage(response)

    const { result: services } = response

    self.postMessage(await self.controller.updateCustomerServices(customerId, services))
  }

  async scheduling (request) {
    self.postMessage({ status: 300, message: 'SCHEDULING', request: request.data })

    self.postMessage(await self.controller.schedulingRequest(request.data))
  }

  async getActiveServicesInfo () {
    self.postMessage(await self.controller.getAllActiveServices())
  }
}

export const customersController = new CustomersController()
