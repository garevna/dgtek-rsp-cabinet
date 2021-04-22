export const buildingStatusConfig = {
  'on-net': {
    title: 'on-net',
    terms: '1-3 days',
    status: 'LIT',
    storeName: 'lit',
    newCustomerDisabled: false
  },
  footprint: {
    title: 'footprint',
    terms: '1-2 weeks',
    status: 'Footprint',
    polygonStatus: 'ServiceAvailable',
    storeName: 'footprint',
    newCustomerDisabled: false
  },
  'construction-commenced': {
    title: 'Construction commenced',
    terms: '2-6 weeks',
    status: 'BuildCommenced',
    polygonStatus: 'UnderConstruction',
    storeName: 'build',
    newCustomerDisabled: false
  },
  'coming-soon': {
    title: 'Coming soon',
    terms: '4-8 weeks',
    status: 'ComingSoon',
    polygonStatus: 'ComingSoon',
    storeName: 'soon',
    newCustomerDisabled: false
  },
  'not-available': {
    title: 'Not available',
    terms: 'N/A',
    status: 'Other',
    storeName: 'other',
    newCustomerDisabled: true
  }
}
