import { buildingDetailsHandler } from './data-handlers'
import { newBuilding } from '@/configs'
import { getBuildingUniqueCode } from './'

export const createNewBuilding = (buildingDetails) => {
  const { coordinates, addressComponents, uniqueCode } = buildingDetails
  if (!coordinates) return console.error('Coordinates required')
  // if (!addressComponents) return console.error('Address components required')
  if (!uniqueCode && addressComponents) buildingDetails.uniqueCode = getBuildingUniqueCode(addressComponents)
  buildingDetailsHandler(Object.assign(JSON.parse(JSON.stringify(newBuilding)), buildingDetails))
}
