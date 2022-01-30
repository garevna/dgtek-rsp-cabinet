export const schema = {
  company: {
    name: {
      title: 'Company name',
      required: true,
      type: 'simple-text',
      value: '',
      hint: 'Required',
      prefix: '',
      error: false
    },
    abn: {
      title: 'ABN',
      required: true,
      type: 'abn',
      value: '',
      hint: 'Required',
      prefix: '',
      error: false
    },
    address: {
      title: 'Address',
      required: true,
      type: 'address',
      value: '',
      hint: 'Required',
      prefix: '',
      error: false
    },
    website: {
      title: 'Website',
      required: false,
      type: 'url',
      value: '',
      hint: '',
      prefix: '',
      error: false
    },
    primaryContact: {
      title: 'Primary contact',
      type: 'simple-text',
      required: true,
      value: '',
      hint: 'Required',
      prefix: '',
      error: false
    },
    phoneWork: {
      title: 'Phone (work)',
      required: false,
      type: 'phone',
      value: '',
      hint: '',
      prefix: '',
      error: false
    },
    phoneMobile: {
      title: 'Phone (mobile)',
      required: true,
      type: 'phone',
      value: '',
      hint: 'Required',
      prefix: '+61',
      error: false
    },
    emailPrimary: {
      title: 'Email (primary)',
      required: true,
      type: 'email',
      value: '',
      hint: 'Required',
      prefix: '',
      error: false
    },
    emailAlternative: {
      title: 'Email (alternative)',
      required: false,
      type: 'email',
      value: '',
      hint: '',
      prefix: '',
      error: false
    }
  },

  general: {
    aboutBusiness: {
      title: 'Information about the business',
      type: 'textarea',
      required: false,
      value: '',
      hint: '',
      prefix: '',
      error: false
    },
    annualRevenue: {
      title: 'Annual revenue',
      type: 'simple-text',
      required: false,
      value: '$10mln',
      hint: '',
      prefix: '$',
      error: false
    },
    numberOfCustomers: {
      title: 'Number of customers',
      type: 'simple-text',
      required: false,
      value: '1000',
      hint: '',
      prefix: '',
      error: false
    },
    customerAreas: {
      title: 'Areas where the most of customers are located',
      type: 'textarea',
      required: false,
      value: '',
      hint: '',
      prefix: '',
      error: false
    },
    other: {
      title: 'Other relevant information',
      type: 'textarea',
      required: false,
      value: '...',
      hint: '',
      prefix: '',
      error: false
    }
  },

  technic: {
    info: {
      title: 'Technical information',
      type: 'textarea',
      required: false,
      value: '...',
      hint: '',
      prefix: '',
      error: false
    },
    contact: {
      title: 'Technical contact',
      type: 'simple-text',
      required: false,
      value: '',
      hint: '',
      prefix: '',
      error: false
    },
    phoneWork: {
      title: 'Phone (work)',
      type: 'phone',
      required: false,
      value: '',
      hint: '',
      prefix: '',
      error: false
    },
    phoneMobile: {
      title: 'Phone (mobile)',
      type: 'mobile',
      required: false,
      value: '',
      hint: '',
      prefix: '+61',
      error: false
    },
    emailPrimary: {
      title: 'Email (primary)',
      type: 'email',
      required: false,
      value: '',
      hint: '',
      prefix: '',
      error: false
    },
    emailAlternative: {
      title: 'Email (alternative)',
      type: 'email',
      required: false,
      value: '',
      hint: '',
      prefix: '',
      error: false
    }
  },

  userInfo: {
    login: {
      title: 'login',
      required: true,
      type: 'email',
      value: '',
      hint: 'Required',
      prefix: '',
      error: false
    },
    // userName: {
    //   title: 'User name',
    //   required: false,
    //   type: 'simple-text',
    //   value: '',
    //   hint: '',
    //   prefix: '',
    //   error: false
    // },
    phoneNumber: {
      title: 'Password reset phone number',
      required: true,
      type: 'mobile',
      value: '',
      hint: 'Required',
      prefix: '',
      error: false
    },
    password: {
      title: 'Password',
      required: true,
      type: 'password',
      value: '',
      hint: 'Required',
      prefix: '',
      error: false
    },
    passwordConfirm: {
      title: 'Confirm password',
      required: true,
      type: 'password',
      value: '',
      hint: 'Required',
      prefix: '',
      error: false
    }
  }
}
