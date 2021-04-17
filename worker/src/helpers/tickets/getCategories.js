import { getRecordByKey } from '../db'

export const getCategories = async function () {
  const [route, action] = ['tickets', 'categories']
  return Object.assign(await getRecordByKey('categories', 'ticketsCategories'), { route, action })
}
