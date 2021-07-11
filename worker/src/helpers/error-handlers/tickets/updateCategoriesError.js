export const updateCategoriesError = function (status) {
  return {
    status,
    route: 'ticket-categories',
    action: 'update',
    error: true,
    errorType: 'Ticket categories',
    errorMessage: 'Failed to update ticket\'s categories'
  }
}
