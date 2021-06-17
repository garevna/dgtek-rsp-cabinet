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
      required: true,
      type: 'simple-text',
      value: ''
    },
    address: {
      title: 'Address',
      required: true,
      type: 'address',
      value: ''
    }
  },
  customerDetails: {
    firstName: {
      title: 'First name',
      required: true,
      type: 'simple-text',
      value: ''
    },
    lastName: {
      title: 'Last Name',
      required: true,
      type: 'simple-text',
      value: ''
    },
    uniqueCode: {
      title: 'Unique code',
      required: true,
      type: 'simple-text',
      value: ''
    },
    phoneWork: {
      title: 'Phone (work)',
      required: true,
      type: 'phone',
      value: ''
    },
    phoneMobile: {
      title: 'Phone (mobile)',
      required: false,
      type: 'mobile',
      value: ''
    },
    primaryEmail: {
      title: 'Email (primary)',
      required: true,
      type: 'email',
      value: ''
    },
    alternativeEmail: {
      title: 'Email (alternative)',
      required: false,
      type: 'email',
      value: ''
    }
  },
  customerService: {
    id: '',
    status: {
      modified: Date.now(),
      value: 'Not connected'
    },
    log: {
      [Date.now()]: 'Not connected'
    }
  }
}
