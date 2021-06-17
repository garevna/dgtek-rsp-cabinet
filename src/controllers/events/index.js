import { rsp } from './rsp'
import { customers } from './customers'
import { tickets } from './tickets'
import { services } from './services'
import { lots } from './schedule'
import { mapWorkerEvents } from './map-worker-events'

const rspWorkerEvents = {
  customers,
  tickets,
  services,
  lots,
  rsp,
  dashboard: {
    info: 'dashboard-services-info'
  }
}

export {
  rspWorkerEvents,
  mapWorkerEvents
}
