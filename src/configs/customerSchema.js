export const customerSchema = {
  commercial: {
    companyName: {
      title: 'Company name',
      type: 'simple-text',
      value: ''
    },
    companyAbn: {
      title: 'Company ABN',
      type: 'abn',
      value: ''
    }
  },
  customerAddress: {
    apartmentNumber: {
      title: 'Apt number',
      type: 'simple-text',
      value: ''
    },
    address: {
      title: 'Address',
      type: 'address',
      value: ''
    }
  },
  customerDetails: {
    firstName: {
      title: 'First name',
      type: 'simple-text',
      value: ''
    },
    lastName: {
      title: 'Last Name',
      type: 'simple-text',
      value: ''
    },
    uniqueCode: {
      title: 'Unique code',
      type: 'simple-text',
      value: ''
    },
    phoneWork: {
      title: 'Phone (work)',
      type: 'phone',
      value: ''
    },
    phoneMobile: {
      title: 'Phone (mobile)',
      type: 'mobile',
      value: ''
    },
    primaryEmail: {
      title: 'Email (primary)',
      type: 'email',
      value: ''
    },
    alternativeEmail: {
      title: 'Email (alternative)',
      type: 'email',
      value: ''
    }
  },
  customerService: {
    id: '',
    status: {
      modified: 0,
      value: 'Active'
    },
    log: {
      1614814010150: 'Not connected',
      1615894851478: 'Awaiting for connection'
    }
  }
}
