import {
  customerHandler,
  buildingIdHandler,
  buildingDetailsHandler,
  messagesHandler,
  showServiceSelectHandler,
  estimatesHandler,
  customersListPageNumberHandler
} from './data-handlers'

import { auth } from './auth'

import { loadGoogleMapsScript } from './loadGoogleMapsScript'
import { unloadGoogleMapsScript } from './unloadGoogleMapsScript'

import { normalizeAddress } from './normalizeAddress'
import { testTextField } from './testTextField'
import { validateAddress } from './validateAddress'
import { validateABN } from './validateABN'
import { validateStreetType } from './validateStreetType'
import { createNewCustomer } from './createNewCustomer'
import { createNewBuilding } from './createNewBuilding'
import { readFile } from './readFile'
import { getCustomerUniqueCode, getBuildingUniqueCode } from './getBuildingUniqueCode'
import { setAPIHost } from './setAPIHost'

export {
  auth,

  loadGoogleMapsScript,
  unloadGoogleMapsScript,

  setAPIHost,
  customerHandler,
  buildingIdHandler,
  buildingDetailsHandler,
  messagesHandler,
  showServiceSelectHandler,
  estimatesHandler,
  customersListPageNumberHandler,

  normalizeAddress,
  testTextField,
  validateAddress,
  validateABN,
  validateStreetType,

  createNewCustomer,
  createNewBuilding,

  readFile,
  getBuildingUniqueCode,
  getCustomerUniqueCode
}
