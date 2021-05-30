import {
  getFromRemoteServer,
  getAllCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  updateCustomerServices,
  deleteCustomer,
  activateServiceRequest,
  schedulingRequest,
  // getFreeLotsForSchedule,
  getAllActiveServices
} from '../helpers/customers'

class CustomersController {
  async getFromRemote () {
    self.postMessage(await getFromRemoteServer())
  }

  async getAllCustomers () {
    self.postMessage(await getAllCustomers())
  }

  async getCustomer (request) {
    self.postMessage(await getCustomer(request.key))
  }

  async deleteCustomer (request) {
    self.postMessage(await deleteCustomer(request.key))
  }

  async updateCustomer (request) {
    self.postMessage(await updateCustomer(request.key, request.data))
  }

  async createCustomer (request) {
    self.postMessage(await createCustomer(request.data))
  }

  async updateCustomerServices (request) {
    const response = await updateCustomerServices(request.key, request.data)
    self.postMessage(Object.assign(response, {
      message: true,
      messageType: 'Customer services',
      messageText: 'Customer services were successfully updated'
    }))
  }

  async activateServiceRequest (request) {
    const { customerId } = request.customerId ? request : request.data

    const response = await activateServiceRequest(request)

    const { result: services } = response

    self.postMessage(response)

    self.postMessage(await updateCustomerServices(customerId, services))

    // self.postMessage(await activateServiceRequest(request))
  }

  async scheduling (request) {
    const { customerId } = request.customerId ? request : request.data
    const response = await schedulingRequest(request)
    self.postMessage(response)
    const { result: services } = response
    self.postMessage(await updateCustomerServices(customerId, services))
  }

  // async getScheduleLots () {
  //   self.postMessage(await getFreeLotsForSchedule())
  // }

  async getActiveServicesInfo () {
    self.postMessage(await getAllActiveServices())
  }
}

export const customersController = new CustomersController()
