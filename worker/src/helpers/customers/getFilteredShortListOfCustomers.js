const getShortListOfCustomers = async function () {
  const [route, action] = ['customers', 'short-list']

  const response = await self.controller.getAllCustomers()

  if (response.status !== 200) return Object.assign(response, { route, action })

  const result = response.result.map(customer => ({
    customerId: customer._id,
    uniqueCode: customer.uniqueCode,
    address: customer.address
  }))

  return { status: 200, route, action, result }
}

export const getFilteredShortListOfCustomers = async function (filter) {
  const [route, action] = ['customers', 'filtered-short-list']

  const response = await getShortListOfCustomers()

  if (response.status !== 200) return Object.assign(response, { route, action })

  const result = response.result.filter(customer => filter.includes(customer.customerId))

  return { status: 200, route, action, result }
}
