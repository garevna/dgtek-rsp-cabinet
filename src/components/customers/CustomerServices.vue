<template>
  <v-container>
    <v-card flat class="transparent mx-auto" v-if="!showServices">

      <v-row justify="center" class="mb-4">
        <h5><small>{{ address }}</small></h5>
      </v-row>

      <table width="100%">
        <thead>
          <tr>
            <th></th>
            <th class="text-left" width="360">
              <small>Service name</small>
            </th>
            <th class="text-center" width="80">
              <small>Service status</small>
            </th>
            <th class="text-center" width="240">
              <small>Status modified</small>
            </th>
            <th class="text-center" width="360">
              <small>Selected lots</small>
            </th>
            <th class="text-center" width="240">
              <small>Installation date</small>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item of schema" :key="item.serviceId">
            <td>
              <v-btn icon @click="disconnect(item)">
                <v-icon small color="primary">mdi-delete</v-icon>
              </v-btn>
            </td>
            <td style="text-align: left">
              <small>{{ item.serviceName }}</small>
            </td>

            <td>
              <v-btn
                text
                small
                color="primary"
                @click="changeStatus(item)"
                :disabled="disable(item)"
              >
                {{ item.serviceStatus }}
              </v-btn>
            </td>

            <td>
              <small>
                {{ item.serviceStatusModified }}
              </small>
            </td>
            <td>
              <li v-if="item.lots && item.lots.length === 2">
                <small>{{ item.lots[0].date }} <small>({{ item.lots[0].period.toUpperCase() }})</small></small>
              </li>
              <li v-if="item.lots && item.lots.length === 2">
                <small>{{ item.lots[1].date }} <small>({{ item.lots[1].period.toUpperCase() }})</small></small>
              </li>
            </td>
            <td>
              <p v-if="item.installation && item.installation.date">
                <small style="color: #900"><b>{{ item.installation.date }}({{ item.installation.period.toUpperCase() }})</b></small>
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <v-row v-if="!showSelect && !createTicket" class="mt-12 mb-4">
        <v-btn outlined color="buttons" class="mr-2" @click="selectService">
          Assign new service
        </v-btn>
      </v-row>
    </v-card>

    <Services v-else :opened.sync="showServices" />

    <v-row v-if="showSelect" class="mt-12 mb-4">
      <LotSelection
        :dialog.sync="showSelect"
        :serviceData.sync="selected"
        :address="address"
        :customerId="customerId"
      />
    </v-row>

    <v-row v-if="createTicket" class="mt-12 mb-4">
      <TicketDetails
        :edit.sync="createTicket"
        :ticket="ticket"
        :categories.sync="categories"
        :newTicket="true"
        :customerId="customerId"
        style="margin-top: -48px !important;"
      />
    </v-row>

    <ConfirmActivationRequest />
  </v-container>
</template>

<script>

import { customerServicesHandler, showServiceSelectHandler } from '@/helpers/data-handlers'
import { Services } from '@/components/dashboard'
const newTicket = require('@/configs/ticketSchema')

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
    TicketDetails: () => import(/* webpackChunkName: 'ticket-details' */ '@/components/tickets/TicketDetails.vue'),
    ConfirmActivationRequest: () => import(/* webpackChunkName: 'terms-and-conditions' */ '@/components/popups/ConfirmActivationRequest.vue'),
    LotSelection: () => import(/* webpackChunkName: 'lot-selection' */ '@/components/schedule/LotSelection.vue')
  },

  props: ['address', 'customerId'],

  data: () => ({
    schema: [],
    // details: {},
    showServices: false,
    showSelect: false,
    selected: null,
    submit: false,
    showSubmitButton: false,
    createTicket: false,
    ticket: null,
    categories: []
  }),

  watch: {
    selected: {
      deep: true,
      handler (service) {
        const index = this.schema.findIndex(item => item.serviceId === service.serviceId)
        this.schema.splice(index, 1, Object.assign({}, this.schema[index], {
          serviceStatus: service.serviceStatus,
          serviceStatusModified: service.serviceStatusModified,
          lots: service.lots || [],
          installation: service.installation || {}
        }))
        Object.assign(this.customerServices[index], {
          status: service.serviceStatus,
          modified: service.serviceStatusModified,
          lots: service.lots || [],
          installation: service.installation || {}
        })
        this.showSubmitButton = service.serviceStatus !== 'Awaiting for connection'
        this.createTicket = service.serviceStatus === 'Awaiting for connection'
      }
    },

    showServices (newVal, oldVal) {
      if (oldVal && !newVal) {
        if (!customerServicesHandler()) return
        this.assignNewService()
      }
    },

    createTicket (newVal, oldVal) {
      if (!oldVal && newVal) {
        this.makeTicket('Awaiting for connection')
        this.newTicket = true
      }
    }
  },

  methods: {
    showError: showError,

    getDateString (ms) {
      return (new Date(ms || Date.now())).toISOString().slice(0, 10)
    },

    makeTicket (subject) {
      this.ticket = Object.assign({}, JSON.parse(JSON.stringify(newTicket)), {
        created: Date.now(),
        modified: Date.now(),
        category: 'Customer issue',
        subject,
        customerId: this.customerId,
        details: '...',
        status: 'Active'
      })
    },

    disable (item) {
      const available = ['Awaiting for scheduling', 'Not connected', 'Awaiting for connection']
      return this.createTicket || item.modified || !available.includes(item.serviceStatus)
    },

    getServiceDetails (data) {
      console.log('SERVICES:\n', this.services)
      const { serviceName, _id: serviceId } = data

      const service = this.services.find(item => item.id === serviceId)

      if (!service) return
      this.schema.push({
        serviceId,
        serviceName,
        serviceStatus: service.status,
        serviceStatusModified: new Date(service.modified).toISOString().slice(0, 10),
        lots: service.lots,
        installation: service.installation
      })
    },

    assignNewService () {
      const { serviceId, serviceName, serviceSpeed, servicePlan, serviceTerm } = customerServicesHandler()

      if (this.services.find(service => service.id === serviceId)) return this.showError()

      this.customerServices.push({
        id: serviceId,
        modified: Date.now(),
        status: 'Not connected',
        log: {
          [Date.now()]: 'Not connected'
        },
        lots: [],
        installation: {}
      })

      this.schema.push({
        serviceId,
        serviceStatusModified: (new Date()).toISOString().slice(0, 10),
        serviceName,
        serviceSpeed,
        serviceStatus: 'Not connected',
        servicePlan,
        serviceTerm,
        modified: true,
        lots: [],
        installation: {}
      })

      // this.showSubmitButton = true
      this.updateCustomerServices()
    },

    selectService () {
      showServiceSelectHandler('set')
      this.showServices = true
    },

    disconnect (service) {
      console.log('disconnect\n', service)
      console.log('customerServices:\n', this.customerServices)
      if (service.serviceStatus === 'Not connected') {
        const index = this.customerServices.findIndex(item => item.id === service.serviceId)
        this.customerServices.splice(index, 1)
        return
      }
      this.makeTicket('Disconnect service')
      this.newTicket = true
    },

    changeStatus (item) {
      this.selectedService = this.customerServices.find(service => service.id === item.serviceId)
      this.selected = item

      this.newTicket = item.serviceStatus === 'Awaiting for connection'

      this.showSelect = item.serviceStatus === 'Awaiting for scheduling'

      if (item.serviceStatus === 'Not connected') this.$root.$emit('open-terms-and-conditions')
    },

    sendActivationRequest () {
      this.__sendServiceActivationRequest(this.customerId, this.selected.serviceId, this.showActivationSuccess)
    },

    showActivationSuccess (data) {
      data.forEach((service, index) => {
        this.schema[index].serviceStatus = service.status
        this.schema[index].serviceStatusModified = new Date(service.modified).toISOString().slice(0, 10)
      })
      this.customerServices = JSON.parse(JSON.stringify(data))
      this.$emit('update:services', this.customerServices)
    },

    updateCustomerServices () {
      this.__updateCustomerServices(this.customerId, this.customerServices, response => console.log('Customer services updated', response))
      this.schema.forEach((item) => { item.modified = false })
      this.showSubmitButton = false
    }

    // getCustomerData (data) {
    //   console.log('CUSTOMER DETAILS FROM SERVICES:\n', data)
    // }
  },

  beforeDestroy () {
    this.$root.$off('operation-confirmed', this.sendActivationRequest)
  },

  mounted () {
    console.log(this.services)
    console.log(customerServicesHandler())
    this.services = customerServicesHandler()
    // if (this.customerId) {
    //   this.__getCustomerData(this.customerId, this.getCustomerData)
    //   this.section = this.sectionName
    // }

    this.customerServices = Array.isArray(this.services)
      ? this.services.map(item => ({
        id: item.id,
        status: item.status,
        modified: item.modified,
        log: item.log,
        lots: item.lots,
        installation: item.installation
      })) : []

    this.$emit('update:services', this.customerServices)

    this.$root.$on('service-selected', this.assignNewService)
    this.$root.$on('operation-confirmed', this.sendActivationRequest)

    for (const service of this.services) {
      if (service.name) delete service.name
      this.__getServiceById(service.id, this.getServiceDetails)
    }

    this.$vuetify.goTo(0)
  }
}

</script>

<style>
.theme--light.v-btn.v-btn--disabled {
  color: #888 !important;
}
.schedule-slot {
  border: solid 1px #999;
  padding: 4px;
  border-radius: 4px;
  list-style-type: none;
  text-align: center;
}
</style>

<style scoped>
td {
  text-align: center;
}
small {
  font-size: 70%;
}
</style>
