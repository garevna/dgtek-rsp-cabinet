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
import { readFile } from './readFile'
import { getCustomerUniqueCode, getBuildingUniqueCode } from './getBuildingUniqueCode'

export {
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
  readFile,
  getBuildingUniqueCode,
  getCustomerUniqueCode
}
