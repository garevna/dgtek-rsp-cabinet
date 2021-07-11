import ticketsErrors from './tickets'

import servicesErrors from './services'

import rspErrors from './rsp'

import customersErrors from './customers'

import dashboardErrors from './dashboard'

const result = Object.assign({}, ticketsErrors, servicesErrors, rspErrors, customersErrors, dashboardErrors)

export default result
