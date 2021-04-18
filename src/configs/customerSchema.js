export const customerSchema = {
  customerDetails: {
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
    apartmentNumber: {
      title: 'Apt number',
      type: 'simple-text',
      value: ''
    },
    address: {
      title: 'Address',
      type: 'address',
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
      type: 'phone',
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
  buildingDetails: {
    address: {
      title: 'Address',
      type: 'address',
      value: ''
    },
    buildingUniqueCode: {
      title: 'Building unique code',
      type: 'simple-text',
      value: ''
    },
    manager: {
      name: {
        title: 'Building manager name',
        type: 'simple-text',
        value: ''
      },
      managerPhoneWork: {
        title: 'Building manager phone (work)',
        type: 'phone',
        value: ''
      },
      managerPhoneMob: {
        title: 'Building manager phone (mobile)',
        type: 'phone',
        value: ''
      },
      phoneWork: {
        title: 'Phone (work)',
        type: 'phone',
        value: ''
      },
      phoneMob: {
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
    owner: {
      corporationName: {
        title: 'Owners corporation name',
        type: 'simple-text',
        value: ''
      },
      contactPerson: {
        title: 'Owners corporation contact person',
        type: 'simple-text',
        value: ''
      },
      phoneWork: {
        title: 'Owners corporation phone work',
        type: 'phone',
        value: ''
      },
      phoneMob: {
        title: 'Owners corporation phone mob',
        type: 'phone',
        value: ''
      },
      emailPrimary: {
        title: 'Owners corporation email primary',
        type: 'email',
        value: ''
      },
      emailAlternative: {
        title: 'Owners corporation email alternative',
        type: 'email',
        value: ''
      }
    }
  }
}
