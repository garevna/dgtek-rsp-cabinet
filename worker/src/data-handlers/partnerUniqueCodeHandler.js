export const partnerUniqueCodeHandler = (function () {
  let partnerUniqueCode = ''
  return function (code) {
    if (code) partnerUniqueCode = code
    else return partnerUniqueCode
  }
})()
