// import { deleteCustomerError } from './deleteCustomerError'
// import { getCustomerDataError } from './getCustomerDataError'
// import { getCustomersListError } from './getCustomersListError'
// import { postNewCustomerError } from './postNewCustomerError'
// import { putCustomerDataError } from './putCustomerDataError'
// import { refreshCustomersListError } from './refreshCustomersListError'
// import { activateServiceRequestError } from './activateServiceRequestError'
// import { schedulingServiceRequestError } from './schedulingServiceRequestError'
// import { invalidServiceDeliveryStatusRequest } from './invalidServiceDeliveryStatusRequest'

// export {
//   deleteCustomerError,
//   getCustomerDataError,
//   getCustomersListError,
//   postNewCustomerError,
//   putCustomerDataError,
//   refreshCustomersListError,
//   activateServiceRequestError,
//   schedulingServiceRequestError,
//   invalidServiceDeliveryStatusRequest
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
