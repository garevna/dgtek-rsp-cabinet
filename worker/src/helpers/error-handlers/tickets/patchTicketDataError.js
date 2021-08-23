export const patchTicketDataError = function (status) {
  return {
    status,
    action: 'patch',
    route: 'tickets',
    error: true,
    errorType: 'Ticket details',
    errorMessage: 'Failed to update ticket details'
  }
}
