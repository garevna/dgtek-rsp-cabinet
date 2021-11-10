export const customerServicesHandler = (function () {
  let services = []

  return function (data) {
    if (!data) {
      return services
    }
    if (data === 'reset') {
      services = []
    } else {
      services = JSON.parse(JSON.stringify(data))
    }
  }
})()
