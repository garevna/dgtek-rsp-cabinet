import { init } from './init'
import { credentials } from './credentials'

import dashboard from './dashboard'
import { getFreeLotsOfSchedule } from './getFreeLotsOfSchedule'
import services from './services'
import customers from './customers'
import tickets from './tickets'
import map from './map.worker'
import rsp from './rsp'

export const actions = Object.assign({ init, credentials, getFreeLotsOfSchedule },
  dashboard,
  services,
  rsp,
  customers,
  tickets,
  map
)
