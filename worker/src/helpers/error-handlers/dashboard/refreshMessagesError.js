export const refreshMessagesError = function (status) {
  return {
    status,
    action: 'refresh',
    route: 'messages',
    error: true,
    errorType: 'Messages from DGtek',
    errorMessage: 'Failed to fetch messages from remote server'
  }
}
