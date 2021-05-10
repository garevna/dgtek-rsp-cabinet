import {
  getFromRemoteServer,
  getAllCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  updateCustomerServices,
  deleteCustomer,
  activateServiceRequest
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
    self.postMessage(await updateCustomerServices(request.key, request.data))
  }

  async activateServiceRequest (request) {
    self.postMessage(await activateServiceRequest(request))
  }
}

export const customersController = new CustomersController()
