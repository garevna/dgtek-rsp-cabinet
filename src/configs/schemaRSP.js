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
      required: true,
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
      value: ''
    },
    annualRevenue: {
      title: 'Annual revenue',
      type: 'number',
      value: 10
    },
    numberOfCustomers: {
      title: 'Number of customers',
      type: 'number',
      value: 1000
    },
    customerAreas: {
      title: 'Areas where the most of customers are located',
      type: 'textarea',
      value: []
    },
    other: {
      title: 'Other relevant information',
      type: 'textarea',
      value: '...'
    }
  },

  technic: {
    info: {
      title: 'Technical information',
      type: 'textarea',
      value: '...'
    },
    contact: {
      title: 'Technical contact',
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
      type: 'phone',
      value: ''
    },
    emailPrimary: {
      title: 'Email (primary)',
      type: 'email',
      value: ''
    },
    emailAlternative: {
      title: 'Email (alternative)',
      type: 'email',
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
