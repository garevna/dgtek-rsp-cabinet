const addressStatus = {
  LIT: {
    event: 'on-net',
    statusToDisplay: 'On net',
    estimatedServiceDeliveryTime: '1-3 days'
  },
  ServiceAvailable: {
    event: 'footprint',
    statusToDisplay: 'Footprint',
    estimatedServiceDeliveryTime: '1-2 weeks'
  },
  'service-available': {
    event: 'footprint',
    statusToDisplay: 'Footprint',
    estimatedServiceDeliveryTime: '1-2 weeks'
  },
  Footprint: {
    event: 'footprint',
    statusToDisplay: 'Footprint',
    estimatedServiceDeliveryTime: '1-2 weeks'
  },
  BuildCommenced: {
    event: 'construction-commenced',
    statusToDisplay: 'Construction commenced',
    estimatedServiceDeliveryTime: '2-6 weeks'
  },
  'build-commenced': {
    event: 'construction-commenced',
    statusToDisplay: 'Construction commenced',
    estimatedServiceDeliveryTime: '2-6 weeks'
  },
  ComingSoon: {
    event: 'coming-soon',
    statusToDisplay: 'Coming soon',
    estimatedServiceDeliveryTime: '4-8 weeks'
  },
  'coming-soon': {
    event: 'coming-soon',
    statusToDisplay: 'Coming soon',
    estimatedServiceDeliveryTime: '4-8 weeks'
  },
  Other: {
    event: 'not-available',
    statusToDisplay: 'Not available',
    estimatedServiceDeliveryTime: 'Not defined'
  }
}

export {
  addressStatus
}
