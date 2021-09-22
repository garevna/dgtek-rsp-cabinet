export const refreshSettingsError = function (status) {
  return {
    status,
    route: 'settings',
    action: 'get',
    error: true,
    errorType: 'Portal settings',
    errorMessage: 'Failed to fetch settings from remote server'
  }
}
