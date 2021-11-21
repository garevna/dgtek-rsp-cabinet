# portal-rsp-cabinet

###### web-worker, IndexedDB

#### dgtek-portal-map-package installation command

```
yarn add dgtek-portal-map-package && mv node_modules/dgtek-portal-map-package/dist/map.worker.js public
```

### serviceController

#### properties

```js
services
currentServiceIndex
customerId
customerAddress
```

#### methods

```js
setCustomer(customerId, customerAddress, customerServices)
getCustomerAddress()
getCustomerId()

setCustomerServices(customerServices)
getCustomerServices()

setServiceDetails(serviceId, details)
getServiceDetails(serviceId)

setCurrentService(serviceId)
getCurrentService()

addNewService(serviceDetails)
updateCurrentService(data)

getServiceDetailsForCustomersList()
getDataForServiceList()
```
