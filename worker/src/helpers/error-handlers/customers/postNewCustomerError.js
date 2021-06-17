export const postNewCustomerError = function (status, customerUniqueCode) {
  return {
    status,
    action: 'post',
    route: 'customers',
    error: true,
    errorType: 'New customer',
    errorMessage: `Failed to create new customer ${customerUniqueCode}`
  }
}
