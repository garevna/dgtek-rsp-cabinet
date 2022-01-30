import { put } from '../AJAX'
import { putRecordByKey } from '../db'

const { updateCategoriesError } = require('../error-handlers').default

const [route, action] = ['ticket-categories', 'update']

export const updateCategories = async function (array) {
  const response = await put('dictionary/ticket-categories', array)
  if (response.status !== 200) return updateCategoriesError(response.status)

  const { status, result } = putRecordByKey('categories', 'ticketsCategories', response.result)

  if (status !== 200) return updateCategoriesError(status)

  return Object.assign(result, { route, action })
}
