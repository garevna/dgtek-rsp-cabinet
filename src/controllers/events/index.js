import { rsp } from './rsp'
import { customers } from './customers'
import { tickets } from './tickets'
import { services } from './services'
import { schedule } from './schedule'
import { mapWorkerEvents } from './map-worker-events'

const rspWorkerEvents = {
  customers,
  tickets,
  services,
  schedule,
  rsp
}

export {
  rspWorkerEvents,
  mapWorkerEvents
}
