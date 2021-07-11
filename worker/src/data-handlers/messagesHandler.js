export const messagesHandler = (function () {
  let messages = []
  return function (records) {
    if (records) messages = records
    else return messages
  }
})()
