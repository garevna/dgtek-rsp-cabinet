import { get } from '../AJAX'

export const getFreeLotsForSchedule = async function () {
  return Object.assign(await get('slot'), { route: 'lots', action: 'get' })
}
