// import { credentials } from './credentials'
// import { passwordChange } from './passwordChange'
// import { getFromRemoteServer } from './getFromRemoteServer'
// import { getFromLocalDb } from './getFromLocalDb'
// import { update } from './update'
//
// export {
//   credentials,
//   passwordChange,
//   getFromRemoteServer,
//   getFromLocalDb,
//   update
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
