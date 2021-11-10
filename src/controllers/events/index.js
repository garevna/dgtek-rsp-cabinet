import { rsp } from './rsp'
import { customers } from './customers'
import { tickets } from './tickets'
import { services } from './services'
import { lots } from './schedule'
import { mapWorkerEvents } from './map-worker-events'
import { settings } from './settings'

import { dashboard } from './dashboard'

export {
  customers,
  tickets,
  services,
  lots,
  rsp,
  dashboard,
  settings,

  mapWorkerEvents
}

// const rspWorkerEvents = {
//   customers,
//   tickets,
//   services,
//   lots,
//   rsp,
//   dashboard: {
//     info: 'dashboard-services-info',
//     'refresh-messages': 'messages-from-dgtek-refreshed'
//   },
//   settings
// }

// export {
//   rspWorkerEvents
//   // mapWorkerEvents
// }
