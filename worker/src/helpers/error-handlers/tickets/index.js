// import { getCategoriesError } from './getCategoriesError'
// import { getTicketDataError } from './getTicketDataError'
// import { getTicketsListError } from './getTicketsListError'
// import { postNewTicketError } from './postNewTicketError'
// import { putTicketDataError } from './putTicketDataError'
// import { refreshTicketsListError } from './refreshTicketsListError'

// export {
//   getCategoriesError,
//   getTicketDataError,
//   getTicketsListError,
//   postNewTicketError,
//   putTicketDataError,
//   refreshTicketsListError
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
