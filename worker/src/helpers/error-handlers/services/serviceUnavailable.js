export const serviceUnavailable = function (serviceName = '') {
  return {
    status: 403,
    action: 'get',
    route: 'services',
    error: true,
    errorType: `Service ${serviceName} unavailable`,
    errorMessage: 'It looks like this service was previously assigned to you but is not available now.'
  }
}
