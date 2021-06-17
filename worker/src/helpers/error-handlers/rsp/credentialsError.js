export const credentialsError = function () {
  return {
    status: 401,
    action: 'credentials',
    route: 'rsp',
    error: true,
    errorType: 'Credentials',
    errorMessage: 'Authorization failed'
  }
}
