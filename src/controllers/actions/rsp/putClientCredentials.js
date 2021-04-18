export const putClientCredentials = function (data) {
  const { login, userPhone, password: newPass } = data
  if (!login || !userPhone || !newPass) {
    window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
      errorType: 'Update credentials',
      ErrorMessage: 'Invalid credentials\' values'
    })
    return
  }
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'rsp',
    action: 'password',
    data: { login, userPhone, newPass }
  })
}
