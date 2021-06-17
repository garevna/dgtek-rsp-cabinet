// import { credentialsError } from './credentialsError'
// import { getClientDataError } from './getClientDataError'
// import { putClientCredentialsError } from './putClientCredentialsError'
// import { putClientDataError } from './putClientDataError'
// import { refreshClientDataError } from './refreshClientDataError'

// export {
//   credentialsError,
//   getClientDataError,
//   putClientCredentialsError,
//   putClientDataError,
//   refreshClientDataError
// }

const modules = {}

const context = require.context('./', false)

let modulesNames = context.keys()
  .filter(key => key !== './' && key !== './index' && key !== './index.js')
  .map(key => key.split('.js').join(''))

modulesNames = Array.from(new Set(modulesNames))

modulesNames.forEach((moduleName) => {
  const name = moduleName.split('./').join('')
  modules[name] = context(moduleName)
})

const result = Object.assign({}, ...Object.keys(modules).map(key => ({ [key]: modules[key][key] })))

export default result
