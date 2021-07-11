export const messagesHandler = (function () {
  let messages = []
  return function (data) {
    if (!data) return messages
    messages = data
  }
})()
