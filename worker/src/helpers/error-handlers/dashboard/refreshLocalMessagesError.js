export const refreshLocalMessagesError = function (status) {
  return {
    status,
    action: 'refresh',
    route: 'messages',
    error: true,
    errorType: 'Messages from DGtek',
    errorMessage: 'Failed to save messages to local DB'
  }
}
