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
              <th class="text-left">
                Service status
              </th>
              <th class="text-left">
                Status modified
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item of services"
              :key="item.id"
            >
              <td>
                <v-btn icon @click="disconnect(service)">
                  <v-icon color="primary">mdi-delete</v-icon>
                </v-btn>
              </td>
              <td>{{ item.name }}</td>
              <td>{{ item.status }}</td>
              <td>{{ new Date(item.modified).toISOString().slice(0, 10) }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-row class="mt-12 mb-4">
        <v-btn outlined color="buttons" class="mr-2" @click="selectService">
          Assign new service
        </v-btn>
        <v-spacer />
        <v-btn dark class="buttons" @click="$emit('update:update', true)">
          Update/save details
        </v-btn>
      </v-row>
    </v-card>

    <Services v-else :opened.sync="showServices" />
  </v-container>
</template>

<script>

import { serviceHandler, showServiceSelectHandler } from '@/helpers'
import { Services } from '@/components/dashboard'

export default {
  name: 'CustomerServices',
  components: {
    Services
  },
  props: ['services', 'address', 'update'],
  data: () => ({
    schema: [],
    showServices: false
  }),
  watch: {
    showServices (newValue, oldValue) {
      if (serviceHandler()) {
        const { serviceName, serviceId } = serviceHandler()
        if (!serviceId) return
        if (this.schema.find(item => item.id === serviceId)) {
          this.$root.$emit('open-error-popup', {
            errorType: 'Add customer service',
            errorMessage: 'Attempt to duplicate service'
          })
          return
        }
        this.schema.push({
          id: serviceId,
          name: serviceName,
          status: 'Not connected',
          modified: Date.now(),
          log: {
            [Date.now()]: 'Not connected'
          }
        })
      }
      console.log(this.schema)
      this.$emit('update:services', this.schema)
    }
  },
  methods: {
    getServiceDetails (data) {
      const { serviceName, _id } = data
      const service = this.services.find(item => item.id === _id)
      if (!service) return
      this.schema.push({
        serviceName,
        serviceStatus: service.status.value,
        serviceStatusModified: service.status.modified
      })
    },
    createSchema () {
      for (const service of this.services) {
        console.log('SERVICE ID: ', service.id)
        this.__getServiceById(service.id)
      }
    },
    assignNewService () {
      const { serviceId, serviceName } = serviceHandler()
      console.log(serviceId, serviceName)
      let services = this.schema
      services = services.map((item) => {
        delete item.name
        return item
      })
      this.$emit('update:services', services)
    },
    selectService () {
      showServiceSelectHandler('set')
      this.showServices = true
      // this.$root.$emit('go-to-services')
    },

    disconnect (service) {
      console.log('disconnect', service)
    },
    activate (service) {
      console.log('activate', service)
    }
  },

  beforeDestroy () {
    this.$root.$off('service-details-received', this.getServiceDetails)
    this.$root.$off('customer-updated', this.close)
    this.$root.$off('customer-created', this.close)
  },

  mounted () {
    this.$root.$on('service-details-received', this.getServiceDetails)
    this.$root.$on('service-selected', this.assignNewService)
  }
}
</script>
