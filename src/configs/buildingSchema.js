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
      value: ''
    },
    managerPhoneWork: {
      title: 'Building manager phone (work)',
      type: 'phone',
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
    corporationPhoneWork: {
      title: 'Owners corporation phone work',
      type: 'phone',
      value: ''
    },
    corporationPhoneMobile: {
      title: 'Owners corporation phone mob',
      type: 'mobile',
      value: ''
    },
    corporationEmailPrimary: {
      title: 'Owners corporation email primary',
      type: 'email',
      value: ''
    },
    corporationEmailAlternative: {
      title: 'Owners corporation email alternative',
      type: 'email',
      value: ''
    },
    headOfficeAddress: {
      title: 'Owners corporation Head Office address',
      type: 'address',
      value: ''
    },
    managementPSNumber: {
      title: 'Owners corporation Management PS number',
      type: 'phone',
      value: ''
    }
  }
}
