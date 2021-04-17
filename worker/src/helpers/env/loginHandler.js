export const loginHandler = (function () {
  let login = ''
  return function (value) {
    if (value) { login = value } else return login
  }
})()
