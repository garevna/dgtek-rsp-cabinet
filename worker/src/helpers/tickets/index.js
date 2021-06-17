// import { getFromRemoteServer } from './getFromRemoteServer'
// import { getCategories } from './getCategories'
// import { getFromLocalDb } from './getFromLocalDb'
// import { getTicketData } from './getTicketData'
// import { postNewTicket } from './postNewTicket'
// import { putTicketData } from './putTicketData'
// import { getDateString, getDateNumber } from './normalizeDate'
//
// export {
//   getFromRemoteServer,
//   getCategories,
//   getFromLocalDb,
//   getTicketData,
//   postNewTicket,
//   putTicketData,
//   getDateString,
//   getDateNumber
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
