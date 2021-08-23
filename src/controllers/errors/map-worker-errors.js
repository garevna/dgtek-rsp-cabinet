export const mapWorkerErrors = {
  getByAddress: (address) => ({
    type: address,
    message: 'Error reading building details from local DB'
  }),

  search: (data) => ({
    warning: true,
    type: data.key,
    message: 'Building was not found in DB. If you want to create new one please do not forget to save building details before saving customer details.'
  }),

  getById: () => ({
    type: 'Building details',
    message: 'Error reading the data from local DB'
  }),

  list: () => ({
    type: 'Buildings list',
    message: 'Error reading the data from local DB'
  }),

  data: () => ({
    type: 'Buildings list',
    message: 'Error reading the data from local DB'
  }),

  post: (type = 'Add new building') => ({
    type,
    message: 'New building was not created'
  }),

  put: (type = 'Building details') => ({
    type,
    message: 'Data was not updated.'
  })
}
