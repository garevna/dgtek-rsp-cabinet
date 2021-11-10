import { partnerUniqueCodeHandler } from './data-handlers'

function removeVowels (string) {
  string = string.split(' ').join('')
  for (const vowel of 'aeiouyAEIOU'.split('')) {
    string = string[0] + string.slice(1).split(vowel).join('')
  }
  return string.toUpperCase()
}

export const getCustomerUniqueCode = function (addressComponents) {
  if (!addressComponents) return ''
  const { number, postCode, street, streetType } = addressComponents
  return `${partnerUniqueCodeHandler()}.${postCode}.${removeVowels(street)}.${streetType}.${number}`
}

export const getBuildingUniqueCode = function (addressComponents) {
  if (!addressComponents) return ''
  let { number, postCode, street, streetType } = addressComponents
  streetType = streetType === 'LINE' ? 'LN' : streetType === 'PDE' ? 'PD' : streetType
  return `${postCode}.${removeVowels(street)}.${streetType}.${number}`
}
