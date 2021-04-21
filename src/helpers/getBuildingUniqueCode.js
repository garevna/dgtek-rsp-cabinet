function removeVowels (string) {
  string = string.split(' ').join('.')
  for (const vowel of 'aeiouyAEIOUY'.split('')) {
    string = string.split(vowel).join('')
  }
  return string.toUpperCase()
}

export const getBuildingUniqueCode = function (addressComponents) {
  const { number, postCode, street } = addressComponents
  return `PA.${postCode}.${removeVowels(street)}.${number}`
}
