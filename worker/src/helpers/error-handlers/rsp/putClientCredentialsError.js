export const putClientCredentialsError = function (status) {
  return {
    status,
    route: 'rsp',
    action: 'password',
    error: true,
    errorType: 'Company credentials',
    errorMessage: 'Failed to change company credentials'
  }
}
