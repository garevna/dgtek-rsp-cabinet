export const putClientDataError = function (status) {
  return {
    status,
    action: 'put',
    route: 'rsp',
    error: true,
    errorType: 'Company details',
    errorMessage: 'Failed to save company details'
  }
}
