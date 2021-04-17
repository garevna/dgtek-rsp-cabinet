export const idHandler = (function () {
  let id = ''
  return function (value) {
    if (value) { id = value } else return id
  }
})()
