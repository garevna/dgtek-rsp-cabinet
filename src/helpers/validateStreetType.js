import { availableStreetTypes, availableStreetTypeInputs } from '@/configs'

export const validateStreetType = function (value) {
  if (!value) return false
  const tested = value.toLowerCase()

  let index = availableStreetTypeInputs.findIndex(item => item === tested)
  index = index !== -1 ? index : availableStreetTypes.findIndex(item => item === tested.toUpperCase())
  const found = index !== -1 ? availableStreetTypes[index] : 'Not found'
  console.log(found)

  return found
}
