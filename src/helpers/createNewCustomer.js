import { customerHandler } from './data-handlers'
import { newCustomer } from '@/configs'

export const createNewCustomer = (address, buildingId, approxETA) => {
  customerHandler(Object.assign(JSON.parse(JSON.stringify(newCustomer)), { address, buildingId, approxETA }))
  console.log(customerHandler())
}
