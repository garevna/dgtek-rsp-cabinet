import { openDB } from '../openDB'

import { getAllRecords } from '../'

const { getServicesListError } = require('../../error-handlers').default

export async function getCustomersTableData () {
  const { status, result: arrayOfServices } = await getAllRecords('services')
  if (status !== 200) return getServicesListError(status)

  const services = Object.assign({}, ...arrayOfServices.map(service => ({ [service._id]: service })))

  const response = await openDB()

  if (response.status !== 200) return response

  const { result: db } = response

  const store = db.transaction('customers', 'readonly').objectStore('customers')

  const result = []

  return new Promise((resolve) => {
    store.openCursor().onsuccess = (event) => {
      const cursor = event.target.result
      if (cursor) {
        const {
          _id,
          customerCreationDate = '',
          apartmentNumber,
          postCode,
          address,
          firstName,
          lastName,
          buildingId,
          services: customerServices = [],
          uniqueCode,
          approxETA
        } = cursor.value

        const name = `${firstName} ${lastName}`

        const service = customerServices.length && services[customerServices[0].id]

        const statuses = customerServices.map(service => service.status)

        const serviceSpeed = service ? `${service.downstreamSpeed}/${service.upstreamSpeed}` : ''
        const servicePlan = service ? service.subscriptionFee : ''
        const serviceTerm = service ? service.contractTerm : ''

        const serviceStatus = service ? customerServices[0].status : ''

        result.push({
          _id,
          customerCreationDate,
          name,
          apartmentNumber,
          postCode,
          address,
          uniqueCode,
          approxETA,
          serviceSpeed,
          servicePlan,
          serviceTerm,
          serviceStatus,
          statuses,
          buildingId
        })

        cursor.continue()
      } else {
        resolve({ status: 200, result })
      }
    }
  })
}
