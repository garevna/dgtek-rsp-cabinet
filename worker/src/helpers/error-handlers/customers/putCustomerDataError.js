export const putCustomerDataError = function (status, customerUniqueCode) {
  return {
    status,
    action: 'put',
    route: 'customers',
    error: true,
    errorType: `Customer ${customerUniqueCode} details`,
    errorMessage: 'Customer details were successfully saved to remote server but saving the data to local DB failed'
  }
}
