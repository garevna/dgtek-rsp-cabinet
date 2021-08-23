export const showServiceSelectHandler = (function () {
  let showSelect = false
  return function (value) {
    if (!value) return showSelect
    showSelect = value !== 'reset'
  }
})()
