export const saveCustomerDataError = function (status, customerUniqueCode) {
  return {
    status,
    action: 'put',
    route: 'customers',
    error: true,
    errorType: 'Customer details',
    errorMessage: `Failed to save customer ${customerUniqueCode} details to remote server`
  }
}
