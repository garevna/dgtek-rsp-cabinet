const modules = {}

const context = require.context('./', false)

let modulesNames = context.keys()
  .filter(key => key !== './' && key !== './index' && key !== './index.js')
  .map(key => key.split('.js').join(''))

modulesNames = Array.from(new Set(modulesNames))

modulesNames.forEach((moduleName) => {
  modules[moduleName.split('./').join('')] = context(moduleName)
})

const result = Object.assign({}, ...Object.keys(modules).map(key => ({ [key]: modules[key][key] })))

export default result
