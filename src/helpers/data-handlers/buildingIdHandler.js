export const buildingIdHandler = (function () {
  let buildingId = null
  return function (value) {
    if (!value) return buildingId
    buildingId = value === 'reset' ? null : value
  }
})()
