export const partnerUniqueCodeHandler = (function () {
  let uniqueCode = ''
  return function (code) {
    if (!code) return uniqueCode
    else uniqueCode = code
  }
})()
