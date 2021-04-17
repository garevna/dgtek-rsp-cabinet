export const getClientDataError = function (status) {
  return {
    status,
    action: 'get',
    route: 'rsp',
    error: true,
    errorType: 'Company details',
    errorMessage: 'Failed to get company details data from local DB'
  }
}
