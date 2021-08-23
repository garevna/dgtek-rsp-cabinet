import { searchAwaitingForConnectionCustomers } from '../db'

const [route, action] = ['customers', 'awaiting-for-connection']

export const getAwaitingCustomerShortList = async function () {
  const { status, result } = await searchAwaitingForConnectionCustomers()

  return { status, route, action, result }
}
