export const availableServiceStatusHandler = (function () {
  let availableServiceStatus = []
  return function (data) {
    if (data) availableServiceStatus = data
    else return availableServiceStatus
  }
})()
