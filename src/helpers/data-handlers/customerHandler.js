let customer = null

export const customerHandler = function (data) {
  if (!data) return customer

  const details = JSON.parse(JSON.stringify(data))

  if (!data.customerCreationDate) Object.assign(details, { customerCreationDate: new Date().toISOString().slice(0, 10) })

  customer = data === 'reset' ? null : details
}
