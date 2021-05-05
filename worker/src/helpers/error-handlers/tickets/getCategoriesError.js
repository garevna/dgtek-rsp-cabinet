export const getCategoriesError = function (status) {
  return {
    status,
    route: 'categories',
    action: 'get',
    error: true,
    errorType: 'Ticket categories list',
    errorMessage: 'Failed to get ticket\'s categories from local DB'
  }
}
