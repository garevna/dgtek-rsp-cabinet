export const getServiceDetailsError = function (status = 404) {
  return {
    status,
    action: 'get',
    route: 'services',
    error: true,
    errorType: 'Service details',
    errorMessage: 'Service was not found in local DB. Try to refresh service list.'
  }
}
