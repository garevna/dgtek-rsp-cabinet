<template>
  <v-container>
    <v-card flat class="transparent mx-auto" v-if="!showServices">

      <v-row justify="center" class="mb-4">
        <h5><small>{{ address }}</small></h5>
      </v-row>

      <v-simple-table class="my-7">
        <template v-slot:default>
          <thead>
            <tr>
              <th></th>
              <th class="text-left">
                Service name
              </th>
              <th class="text-center">
                Service status
              </th>
              <th class="text-center">
                Status modified
              </th>
              <th class="text-center">
                History
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item of schema"
              :key="item.serviceId"
            >
              <td>
                <v-btn icon @click="disconnect(item)">
                  <v-icon color="primary">mdi-delete</v-icon>
                </v-btn>
              </td>
              <td>{{ item.serviceName }}</td>
              <td>
                <v-btn text color="primary" @click="changeStatusRequest(item)" :disabled="item.status !== 'Not connected'">
                  {{ item.serviceStatus }}
                </v-btn>
              </td>
              <td>{{ item.serviceStatusModified }}</td>
              <td>

              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-row class="mt-12 mb-4">
        <v-btn outlined color="buttons" class="mr-2" @click="selectService">
          Assign new service
        </v-btn>
        <v-spacer />
        <v-btn dark class="buttons" @click="updateCustomerServices">
          Update/save details
        </v-btn>
      </v-row>
    </v-card>

    <Services v-else :opened.sync="showServices" />
    <ServiceDeliveryUpdate
      v-if="dialog"
      :dialog.sync="dialog"
      :serviceData.sync="selected"
      :address="address"
      :customerId="customerId"
    />
  </v-container>
</template>

<script>

import { serviceHandler, showServiceSelectHandler } from '@/helpers'
import { Services } from '@/components/dashboard'

import ServiceDeliveryUpdate from '@/components/popups/ServiceDeliveryUpdate.vue'

const showError = function () {
  this.$root.$emit('open-error-popup', {
    errorType: 'Assign service to customer',
    errorMessage: 'Attempt to duplicate service'
  })
}

export default {
  name: 'CustomerServices',

  components: {
    Services,
    ServiceDeliveryUpdate
  },

  props: ['services', 'address', 'update', 'customerId'],

  data: () => ({
    customerServices: [],
    customerServiceDescriptions: [],
    schema: [],
    details: {},
    showServices: false,
    dialog: false,
    selected: null,
    submit: false
  }),

  watch: {
    selected: {
      deep: true,
      handler (val) {
        console.log('SELECTED SERVICE:\n', val)
      }
    },
    showServices (newVal, oldVal) {
      console.log('SHOW SERVICES: ', oldVal, '-->', newVal)
      if (oldVal && !newVal) {
        console.log(serviceHandler())
        if (!serviceHandler()) return
        this.assignNewService()
      }
    }
  },

  methods: {
    showError: showError,
    getServiceDetails (data) {
      console.log('SERVICE DATA:\n', data)

      const { serviceName, _id: serviceId } = data

      const service = this.services.find(item => item.id === serviceId)
      console.log(service)

      if (!service) return
      this.schema.push({
        serviceId,
        serviceName,
        serviceStatus: service.status,
        serviceStatusModified: new Date(service.modified).toISOString().slice(0, 10)
      })
    },

    assignNewService () {
      console.log(serviceHandler())

      const {
        serviceId,
        serviceName,
        serviceSpeed,
        servicePlan,
        serviceTerm
      } = serviceHandler()

      if (this.services.find(service => service.id === serviceId)) return this.showError()

      this.customerServices.push({
        id: serviceId,
        modified: Date.now(),
        status: 'Not connected',
        log: {
          [Date.now()]: 'Not connected'
        }
      })

      console.log(this.customerServices)

      this.schema.push({
        serviceId,
        serviceStatusModified: (new Date()).toISOString().slice(0, 10),
        serviceName,
        serviceSpeed,
        serviceStatus: 'Not connected',
        servicePlan,
        serviceTerm
      })

      console.log(this.schema)
    },

    selectService () {
      showServiceSelectHandler('set')
      this.showServices = true
    },

    disconnect (service) {
      console.log('disconnect', service)
    },

    changeStatusRequest (item) {
      if (item.status !== 'Not connected') return
      this.selected = item
      console.log('SELECTED SERVICE:\n', this.selected)
      this.dialog = true
    },

    updateCustomerServices () {
      console.log(this.customerServices)

      this.__updateCustomerServices(this.customerId, this.customerServices)
    }

    // getResponse (event) {
    //   console.log('customer-services-updated RESPONSE:\n', event)
    //   // this.$root.$emit('customer-services-updated', this.schema)
    // }
  },

  beforeDestroy () {
    this.$root.$off('service-details-received', this.getServiceDetails)
    // this.$root.$off('customer-services-updated', this.getResponse)
    this.$root.$off('customer-created', this.close)
  },

  mounted () {
    console.log(this.services)
    this.customerServices = this.services.map(item => ({
      id: item.id,
      status: item.status,
      modified: item.modified,
      log: item.log
    }))
    this.$emit('update:services', this.customerServices)
    console.log(this.services)
    this.$root.$on('service-details-received', this.getServiceDetails)
    this.$root.$on('service-selected', this.assignNewService)
    // this.$root.$on('customer-services-updated', this.getResponse)
    for (const service of this.services) {
      console.log(service.id)
      if (service.name) {
        delete service.name
      }
      this.__getServiceById(service.id)
    }
  }
}

</script>

<style>
.theme--light.v-btn.v-btn--disabled {
  color: #888 !important;
}
</style>
