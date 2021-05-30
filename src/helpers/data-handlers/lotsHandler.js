export const lotsHandler = (function () {
  let lots = null
  return function (value) {
    if (!value) return lots
    lots = value
  }
})()
