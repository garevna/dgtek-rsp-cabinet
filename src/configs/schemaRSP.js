export const schema = {
  company: {
    name: {
      title: 'Company name',
      required: true,
      type: 'simple-text',
      value: ''
    },
    abn: {
      title: 'ABN',
      required: true,
      type: 'abn',
      value: ''
    },
    address: {
      title: 'Address',
      required: true,
      type: 'address',
      value: ''
    },
    website: {
      title: 'Website',
      required: false,
      type: 'url',
      value: ''
    },
    primaryContact: {
      title: 'Primary contact',
      type: 'simple-text',
      required: true,
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
      type: 'phone',
      value: ''
    },
    emailPrimary: {
      title: 'Email (primary)',
      required: true,
      type: 'email',
      value: ''
    },
    emailAlternative: {
      title: 'Email (alternative)',
      required: false,
      type: 'email',
      value: ''
    }
  },

  general: {
    aboutBusiness: {
      title: 'Information about the business',
      type: 'textarea',
      required: false,
      value: ''
    },
    annualRevenue: {
      title: 'Annual revenue',
      type: 'number',
      required: false,
      value: 10
    },
    numberOfCustomers: {
      title: 'Number of customers',
      type: 'number',
      required: false,
      value: 1000
    },
    customerAreas: {
      title: 'Areas where the most of customers are located',
      type: 'textarea',
      required: false,
      value: []
    },
    other: {
      title: 'Other relevant information',
      type: 'textarea',
      required: false,
      value: '...'
    }
  },

  technic: {
    info: {
      title: 'Technical information',
      type: 'textarea',
      required: false,
      value: '...'
    },
    contact: {
      title: 'Technical contact',
      type: 'simple-text',
      required: false,
      value: ''
    },
    phoneWork: {
      title: 'Phone (work)',
      type: 'phone',
      required: false,
      value: ''
    },
    phoneMobile: {
      title: 'Phone (mobile)',
      type: 'phone',
      required: false,
      value: ''
    },
    emailPrimary: {
      title: 'Email (primary)',
      type: 'email',
      required: false,
      value: ''
    },
    emailAlternative: {
      title: 'Email (alternative)',
      type: 'email',
      required: false,
      value: ''
    }
  },

  userInfo: {
    login: {
      title: 'login',
      required: true,
      type: 'simple-text',
      value: ''
    },
    userName: {
      title: 'User name',
      required: false,
      type: 'simple-text',
      value: ''
    },
    phoneNumber: {
      title: 'Password reset phone number',
      required: true,
      type: 'phone',
      value: ''
    },
    password: {
      title: 'Password',
      required: true,
      type: 'password',
      value: ''
    },
    passwordConfirm: {
      title: 'Confirm password',
      required: true,
      type: 'password',
      value: ''
    }
  }
}
