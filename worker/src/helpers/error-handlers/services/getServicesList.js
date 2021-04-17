export const getServicesListError = function (status) {
  return {
    status,
    action: 'get',
    route: 'services',
    error: true,
    errorType: 'Services',
    errorMessage: 'Failed to get services from local DB'
  }
}
