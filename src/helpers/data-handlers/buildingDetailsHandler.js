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

    if (value === 'save' || value === 'to-save' || value === 'for-save') {
      return Object.assign({}, buildingDetails, {
        management: Object.assign({}, ...Object.keys(buildingDetails.management).map(key => ({ [key]: buildingDetails.management[key].value }))),
        owner: Object.assign({}, ...Object.keys(buildingDetails.owner).map(key => ({ [key]: buildingDetails.owner[key].value })))
      })
    }

    if (value === 'reset') {
      buildingDetails = null
      return
    }

    if (!value.address || !value.addressComponents) {
      window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
        errorType: 'Invalid building details',
        errorMessage: !value.address ? 'Address required' : 'Address components required'
      })
      return
    }

    // if (!value.coordinates && !value.buildingId && !value.id) {
    //   window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
    //     errorType: 'Invalid new building details',
    //     errorMessage: 'Building coordinates required'
    //   })
    //   return
    // }

    if (!value.status) {
      if (value.event) value.status = events[value.event]
      else {
        console.warn(`INVALID BUILDING STATUS: ${value.status}`)
        window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
          errorType: 'Invalid building status',
          errorMessage: 'Building status required'
        })
      }
    }

    buildingDetails = JSON.parse(JSON.stringify(value))

    if (buildingDetails.id) delete buildingDetails.id
    if (buildingDetails.buildingId) delete buildingDetails.buildingId

    if (value.status === 'UnderConstruction') buildingDetails.status = 'BuildCommenced'
    if (!buildingDetails.postCode) Object.assign(buildingDetails, { postCode: value.addressComponents.postCode })

    const managementSchema = JSON.parse(JSON.stringify(management))
    const ownerSchema = JSON.parse(JSON.stringify(owner))

    if (buildingDetails.management) {
      for (const key in managementSchema) {
        managementSchema[key].value = typeof buildingDetails.management[key] !== 'object' ? buildingDetails.management[key] : buildingDetails.management[key].value
      }
    }

    buildingDetails.management = managementSchema

    if (buildingDetails.owner) {
      for (const key in ownerSchema) {
        ownerSchema[key].value = typeof buildingDetails.owner[key] !== 'object' ? buildingDetails.owner[key] : buildingDetails.owner[key].value
      }
    }

    buildingDetails.owner = ownerSchema

    buildingDetails.uniqueCode = getBuildingUniqueCode(buildingDetails.addressComponents)
  }
})()
