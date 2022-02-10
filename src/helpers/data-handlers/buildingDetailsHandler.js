import { management, owner } from '../../configs'

import { getBuildingUniqueCode } from '@/helpers'

const sections = { management, owner }

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

let buildingDetails = null

export const buildingDetailsHandler = function (details) {
  if (!details) return buildingDetails

  if (typeof details === 'string') {
    if (details.indexOf('save') !== -1) return prepareToSave(buildingDetails)
    if (details === 'reset') {
      buildingDetails = null
      return
    }
  }

  if (!details.address) return showError('Address required')
  if (!details.coordinates && !details.buildingId && !details.id) return showError('Building coordinates required')

  buildingDetails = {}

  let { address, addressComponents, uniqueCode, coordinates, status, estimatedServiceDeliveryTime } = details

  status = status === 'UnderConstruction' ? 'BuildCommenced' : status
  uniqueCode = uniqueCode || addressComponents ? getBuildingUniqueCode(addressComponents) : ''
  const postCode = addressComponents ? addressComponents.postCode : ''

  if (!status) {
    if (details.event) status = events[details.event]
    else showError(`Invalid building status: ${details.status} (${details.event})`)
  }

  Object.assign(buildingDetails, { address, addressComponents, uniqueCode, coordinates, status, estimatedServiceDeliveryTime, postCode })

  ;['management', 'owner'].forEach(sectionName => {
    Object.assign(buildingDetails, { [sectionName]: JSON.parse(JSON.stringify(sections[sectionName])) })
    for (const key in buildingDetails[sectionName]) {
      buildingDetails[sectionName][key].value = details[sectionName] ? details[sectionName][key] : ''
    }
  })
}
