export const putTicketToLocalDBError = function (ticketNum = '') {
  return {
    status: 400,
    action: 'refresh',
    route: 'tickets',
    error: true,
    errorType: 'Store tickets',
    errorMessage: `Failed to save ticket ${ticketNum} to local DB`
  }
}
