export const duplicatedCustomerError = function (status, customerUniqueCode) {
  return {
    status,
    action: 'post',
    route: 'customers',
    error: true,
    errorType: 'Attempt to duplicate customer',
    errorMessage: `Customer ${customerUniqueCode} already exists`
  }
}
