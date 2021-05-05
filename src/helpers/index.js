import {
  customerHandler,
  buildingHandler,
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
import { getBuildingUniqueCode } from './getBuildingUniqueCode'

export {
  customerHandler,
  buildingHandler,
  serviceHandler,
  showServiceSelectHandler,
  estimatesHandler,
  customersListPageNumberHandler,

  normalizeAddress,
  testTextField,
  validateAddress,
  validateABN,
  readFile,
  getBuildingUniqueCode
}
