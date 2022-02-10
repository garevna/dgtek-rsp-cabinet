import { get } from '../AJAX'

const [route, action] = ['schedule', 'get']

export const getFreeLotsForSchedule = async function () {
  return Object.assign(await get('slot'), { route, action })
}
