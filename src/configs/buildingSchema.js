export const buildingSchema = {
  address: {
    title: 'Address',
    type: 'address',
    value: ''
  },
  addressComponents: {
    city: '',
    postCode: '',
    state: '',
    street: '',
    streetType: '',
    number: ''
  },
  buildingUniqueCode: {
    title: 'Building unique code',
    type: 'unique-code',
    value: ''
  },
  management: {
    managerName: {
      title: 'Building manager name',
      type: 'simple-text',
      required: false,
      value: ''
    },
    managerPhoneWork: {
      title: 'Building manager phone (work)',
      type: 'phone',
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
      type: 'mobile',
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
  owner: {
    corporationName: {
      title: 'Owners corporation name',
      type: 'simple-text',
      value: ''
    },
    contactPerson: {
      title: 'Owners corporation contact person',
      type: 'simple-text',
      required: false,
      value: ''
    },
    corporationPhoneWork: {
      title: 'Owners corporation phone work',
      type: 'phone',
      required: false,
      value: ''
    },
    corporationPhoneMobile: {
      title: 'Owners corporation phone mob',
      type: 'mobile',
      required: false,
      value: ''
    },
    corporationEmailPrimary: {
      title: 'Owners corporation email primary',
      type: 'email',
      required: false,
      value: ''
    },
    corporationEmailAlternative: {
      title: 'Owners corporation email alternative',
      type: 'email',
      required: false,
      value: ''
    },
    headOfficeAddress: {
      title: 'Owners corporation Head Office address',
      type: 'address',
      required: false,
      value: ''
    },
    managementPSNumber: {
      title: 'Owners corporation Management PS number',
      type: 'phone',
      required: false,
      value: ''
    }
  }
}
