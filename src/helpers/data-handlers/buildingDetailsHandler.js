import { management, owner } from '../../configs'

import { getBuildingUniqueCode } from '@/helpers'

const events = {
  'on-net': 'LIT',
  footprint: 'Footprint',
  'construction-commenced': 'BuildCommenced',
  'coming-soon': 'ComingSoon',
  'not-available': 'Other'
}

const showError = errorMessage => window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
  errorType: 'Invalid building details',
  errorMessage
})

const prepareToSave = buildingDetails => buildingDetails
  ? Object.assign({}, buildingDetails, {
    management: Object.assign({}, management, ...Object.keys(buildingDetails.management).map(key => ({ [key]: buildingDetails.management[key].value }))),
    owner: Object.assign({}, owner, ...Object.keys(buildingDetails.owner).map(key => ({ [key]: buildingDetails.owner[key].value })))
  })
  : null

export const buildingDetailsHandler = (function () {
  let buildingDetails = null

  return function (value) {
    if (!value) return buildingDetails

    if (typeof value === 'string') {
      if (value.indexOf('save') !== -1) return prepareToSave(buildingDetails)
      if (value === 'reset') {
        buildingDetails = null
        return
      }
    }

    if (!value.address) return showError('Address required')
    if (!value.coordinates && !value.buildingId && !value.id) return showError('Building coordinates required')

    buildingDetails = {}

    let { address, addressComponents, uniqueCode, coordinates, status, estimatedServiceDeliveryTime } = value

    status = status === 'UnderConstruction' ? 'BuildCommenced' : status
    uniqueCode = uniqueCode || addressComponents ? getBuildingUniqueCode(addressComponents) : ''
    const postCode = addressComponents ? addressComponents.postCode : ''

    if (!status) {
      if (value.event) status = events[value.event]
      else showError(`Invalid building status: ${value.status} (${value.event})`)
    }

    Object.assign(buildingDetails, { address, addressComponents, uniqueCode, coordinates, status, estimatedServiceDeliveryTime, postCode })

    Object.assign(buildingDetails, { management, owner })

    ;['management', 'owner'].forEach(sectionName => {
      for (const key in value[sectionName]) {
        buildingDetails[sectionName][key].value = value[sectionName][key]
      }
    })
  }
})()
