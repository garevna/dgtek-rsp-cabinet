export const adminKeyHandler = (function () {
  let key = ''
  return function (value) {
    if (value) { key = value } else return key
  }
})()
