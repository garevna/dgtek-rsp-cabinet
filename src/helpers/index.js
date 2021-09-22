import {
  customerHandler,
  buildingIdHandler,
  buildingDetailsHandler,
  serviceHandler,
  showServiceSelectHandler,
  estimatesHandler,
  customersListPageNumberHandler
} from './data-handlers'

import { normalizeAddress } from './normalizeAddress'
import { testTextField } from './testTextField'
import { validateAddress } from './validateAddress'
import { validateABN } from './validateABN'
import { validateStreetType } from './validateStreetType'
import { readFile } from './readFile'
import { getCustomerUniqueCode, getBuildingUniqueCode } from './getBuildingUniqueCode'
import { setAPIHost } from './setAPIHost'

export {
  setAPIHost,
  customerHandler,
  buildingIdHandler,
  buildingDetailsHandler,
  serviceHandler,
  showServiceSelectHandler,
  estimatesHandler,
  customersListPageNumberHandler,

  normalizeAddress,
  testTextField,
  validateAddress,
  validateABN,
  validateStreetType,

  readFile,
  getBuildingUniqueCode,
  getCustomerUniqueCode
}
