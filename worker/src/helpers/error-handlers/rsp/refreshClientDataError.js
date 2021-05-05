export const refreshClientDataError = function (status) {
  return {
    status,
    action: 'refresh',
    route: 'rsp',
    error: true,
    errorType: 'Company details',
    errorMessage: 'Failed to get company details data from remote server'
  }
}
