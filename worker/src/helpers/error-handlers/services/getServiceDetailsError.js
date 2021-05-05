export const getServiceDetailsError = function (status) {
  return {
    status,
    action: 'get',
    route: 'services',
    error: true,
    errorType: 'Service detals',
    errorMessage: 'Failed to get service data from local DB'
  }
}
