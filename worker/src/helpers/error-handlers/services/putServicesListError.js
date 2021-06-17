export const putServicesListError = function (status) {
  return {
    status,
    action: 'put',
    route: 'services',
    error: true,
    errorType: 'Services',
    errorMessage: 'Failed to save services to local DB'
  }
}
