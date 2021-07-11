import { put } from '../AJAX'
import { putRecordByKey } from '../db'

const { updateCategoriesError } = require('../error-handlers').default

export const updateCategories = async function (array) {
  const [route, action] = ['ticket-categories', 'update']

  const response = await put('dictionary/ticket-categories', array)
  if (response.status !== 200) return updateCategoriesError(response.status)

  self.postDebugMessage({ route, action, result: response.result })

  const { status, result } = putRecordByKey('categories', 'ticketsCategories', response.result)

  if (status !== 200) return updateCategoriesError(status)

  return Object.assign(result, { route, action })
}
