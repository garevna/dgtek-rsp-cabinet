let messages = []

export const messagesHandler = function (records) {
  if (records) {
    messages = JSON.parse(JSON.stringify(records))
  } else return messages
}
