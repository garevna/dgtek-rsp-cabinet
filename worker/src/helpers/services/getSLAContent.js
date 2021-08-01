import { get } from '../AJAX'
import pdf404 from '../../configs/pdf404'

const notFound = {
  id: null,
  title: 'Not found',
  result: pdf404
}

const [route, action] = ['services', 'sla']

export const getSLAContent = async function (id) {
  if (!id) return ({ status: 200, route, action, result: notFound })

  const { status, result } = await get(`sla/${id}`)

  return { status, route, action, result: status !== 200 ? notFound : result }
}
