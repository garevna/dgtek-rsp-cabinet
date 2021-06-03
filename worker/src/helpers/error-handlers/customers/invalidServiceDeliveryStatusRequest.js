export const invalidServiceDeliveryStatusRequest = function (customerId, serviceId) {
  return {
    status: 422,
    error: true,
    errorType: 'Update service delivery status',
    errorMessage: `Invalid request: customer ${customerId}, service ${serviceId}`
  }
}
