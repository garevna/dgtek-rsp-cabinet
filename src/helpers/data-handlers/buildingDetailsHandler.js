import { management, owner } from '../../configs'

import { getBuildingUniqueCode } from '@/helpers'

const events = {
  'on-net': 'LIT',
  footprint: 'Footprint',
  'construction-commenced': 'BuildCommenced',
  'coming-soon': 'ComingSoon',
  'not-available': 'Other'
}

export const buildingDetailsHandler = (function () {
  let buildingDetails = null
  return function (value) {
    if (!value) return buildingDetails

    if (typeof value === 'string') {
      if (value.indexOf('save') !== -1) {
        return Object.assign({}, buildingDetails, {
          management: Object.assign({}, ...Object.keys(buildingDetails.management).map(key => ({ [key]: buildingDetails.management[key].value }))),
          owner: Object.assign({}, ...Object.keys(buildingDetails.owner).map(key => ({ [key]: buildingDetails.owner[key].value })))
        })
      }

      if (value === 'reset') {
        buildingDetails = null
        return
      }
    }

    // if (!value.address || !value.addressComponents) {
    //   window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
    //     errorType: 'Invalid building details',
    //     errorMessage: !value.address ? 'Address required' : 'Address components required'
    //   })
    //   return
    // }

    // if (!value.coordinates && !value.buildingId && !value.id) {
    //   window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
    //     errorType: 'Invalid new building details',
    //     errorMessage: 'Building coordinates required'
    //   })
    //   return
    // }

    buildingDetails = {}

    let { address, addressComponents, uniqueCode, coordinates, status, estimatedServiceDeliveryTime } = value

    status = status === 'UnderConstruction' ? 'BuildCommenced' : status
    uniqueCode = uniqueCode || addressComponents ? getBuildingUniqueCode(addressComponents) : ''
    const postCode = addressComponents ? addressComponents.postCode : ''

    if (!status) {
      if (value.event) status = events[value.event]
      else {
        console.warn(`INVALID BUILDING STATUS: ${value.status}`)
        window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
          errorType: 'Invalid building status',
          errorMessage: 'Building status required'
        })
      }
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
