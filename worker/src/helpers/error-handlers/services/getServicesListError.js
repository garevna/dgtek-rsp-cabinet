export const getServicesListError = function (status) {
  return {
    status,
    action: 'get',
    route: 'services',
    error: true,
    errorType: 'Service list',
    errorMessage: 'Failed to get data from local DB'
  }
}
