export const pendingConnectionStatusHandler = (function () {
  let pendingConnections = []
  return function (data) {
    if (data) pendingConnections = data
    else return pendingConnections
  }
})()
