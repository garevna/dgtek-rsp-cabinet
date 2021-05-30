export const showMainMenuHandler = (function () {
  let showMainMenu = true
  return function (value) {
    if (!value) return showMainMenu
    if (value === 'hide') {
      showMainMenu = false
    } else {
      showMainMenu = true
    }
  }
})()
