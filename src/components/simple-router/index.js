/* eslint-disable no-unused-vars */

const createSimpleRouter = function (arr) {
  const wordOrNumber = /\w/gi
  const noWordOrNumber = /\W/gi
  const checkRouteName = route =>
    typeof route === 'string' &&
    wordOrNumber.test(route) &&
    !noWordOrNumber.test(route)
  const routes = arr.filter(route => checkRouteName(route))
  let currentRouteName = ''
  let currentRouteParams = {}
  const callBacks = []

  const router = {
    addListener (func) {
      if (func instanceof Function) callBacks.push(func)
      else console.error('callback is not a function')
    },
    to ({ name, params = {} }) {
      if (
        !name ||
        typeof name !== 'string' ||
        currentRouteName === name ||
        !routes.includes(name)
      ) { return }
      currentRouteName = name
      currentRouteParams = params
      callBacks.forEach(callBack =>
        callBack({
          name: currentRouteName,
          params: currentRouteParams
        })
      )
    }
  }

  return router
}

export { createSimpleRouter }
