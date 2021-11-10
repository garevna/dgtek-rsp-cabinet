import { buildingDetailsHandler } from './data-handlers'
import { newBuilding } from '@/configs'
import { getBuildingUniqueCode } from './'

export const createNewBuilding = (buildingDetails) => {
  if (!buildingDetails.addressComponents) return console.error('Address components required')
  if (!buildingDetails.uniqueCode) buildingDetails.uniqueCode = getBuildingUniqueCode(buildingDetails.addressComponents)
  buildingDetailsHandler(Object.assign(JSON.parse(JSON.stringify(newBuilding)), buildingDetails))
  console.log(buildingDetailsHandler('save'))
}
