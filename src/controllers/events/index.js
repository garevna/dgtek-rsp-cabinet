import { rsp } from './rsp'
import { customers } from './customers'
import { tickets } from './tickets'
import { services } from './services'
import { mapWorkerEvents } from './map-worker-events'

const rspWorkerEvents = {
  customers,
  tickets,
  services,
  rsp
}

export {
  rspWorkerEvents,
  mapWorkerEvents
}
