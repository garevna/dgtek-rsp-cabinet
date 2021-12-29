import { get } from '../AJAX'
import { putRecordByKey } from '../db'

const [route, action] = ['updates', 'tickets']

export const getTicketUpdates = async function () {
  let currentPage = 1
  const perPage = 100

  let updated = false

  do {
    var { result } = await get(`ticket?page=${currentPage++}&per_page=${perPage}`)

    var { tickets, page, pages } = result

    // self.postDebugMessage({ tickets, page, pages })

    const promises = tickets
      .filter(record => record.modified > Date.now() - 1000 * 60 * 60)
      .map(record => putRecordByKey('tickets', record._id, record))

    /* const response = */ await Promise.all(promises)
    // self.postDebugMessage({ updated: response })

    if (promises.length > 0) updated = true
  } while (page < pages)

  return { status: 200, route, action, result: updated }
}
