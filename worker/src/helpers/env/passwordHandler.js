export const passwordHandler = (function () {
  let password = ''
  return function (value) {
    if (value) { password = value } else return password
  }
})()
