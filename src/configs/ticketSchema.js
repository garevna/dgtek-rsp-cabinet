export const ticketSchema = {
  created: {
    title: 'Created',
    type: 'date',
    value: null
  },
  modified: {
    title: 'Modified',
    type: 'date',
    value: null
  },
  category: {
    title: 'Category',
    type: 'list',
    value: 'General'
  },
  severity: {
    title: 'Severity',
    type: 'select',
    available: ['Low', 'Medium', 'High'],
    value: 'Medium'
  },
  priority: {
    title: 'Priority',
    type: 'select',
    available: ['Low', 'Medium', 'High'],
    value: 'Medium'
  },
  customer: {
    title: 'Customer',
    type: 'link-to-db',
    db: 'customers',
    prop: 'name',
    value: null
  },
  customerUniqueCode: {
    title: 'Customer unique code',
    type: 'calculated',
    value: ''
  },
  details: {
    title: 'Details',
    type: 'simple-text',
    value: ''
  },
  contactPhone: {
    title: 'Contact number of the responsible person. *for urgent matters only',
    type: 'phone',
    value: ''
  },
  files: {
    title: 'Upload file',
    type: 'file-upload',
    value: []
  }
}
