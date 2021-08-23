export const hash = data => ({ status: 200, result: require('crypto-js/sha256')(data).toString() })
