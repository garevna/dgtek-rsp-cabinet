export const showServiceSelectHandler = (function () {
  let showSelect = false
  return function (value) {
    if (!value) return showSelect
    if (value === 'reset') {
      showSelect = false
    } else {
      showSelect = true
    }
  }
})()
