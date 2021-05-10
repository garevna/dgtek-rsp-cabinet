export const activateServiceRequestError = function (status) {
  return {
    status,
    action: 'activate',
    route: 'customers',
    error: true,
    errorType: 'Service activation',
    errorMessage: 'Failed to send request'
  }
}
