export const schedulingServiceRequestError = function (status) {
  return {
    status,
    action: 'schediling',
    route: 'customers',
    error: true,
    errorType: 'Service scheduling',
    errorMessage: 'Failed to send request data'
  }
}
