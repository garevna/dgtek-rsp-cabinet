export const putCustomerDataError = function (status, customerUniqueCode, local) {
  return {
    status,
    action: 'put',
    route: 'customers',
    error: true,
    errorType: `Customer ${customerUniqueCode} details`,
    errorMessage: local ? 'Customer details were successfully saved to remote server but saving the data to local DB failed'
      : 'Failed to save customer details to remote server'
  }
}
