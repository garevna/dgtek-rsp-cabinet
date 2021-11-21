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
          <tr v-for="(item, index) of services" :key="item.serviceId">
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
                @click="changeStatus(item, index)"
                :disabled="disable(item)"
              >
                {{ item.status }}
              </v-btn>
            </td>

            <td>
              <small>
                {{ new Date(item.modified).toISOString().slice(0, 10) }}
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

      <v-row v-if="!scheduling && !createTicket" class="mt-12 mb-4">
        <v-btn outlined color="buttons" class="mr-2" @click="selectService">
          Assign new service
        </v-btn>
      </v-row>
    </v-card>

    <v-dialog v-else v-model="showServices">
      <v-card flat class="homefone">
        <v-toolbar flat class="transparent">
          <v-toolbar-title>
            <h5>Select the service which should be assigned to the customer</h5>
          </v-toolbar-title>
          <v-spacer />
          <v-btn icon @click="showServices = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card flat class="transparent">
          <Services
            :opened.sync="showServices"
            :customerId="customerId"
            :selectedService.sync="newService"
          />
        </v-card>
      </v-card>
    </v-dialog>

    <v-row v-if="scheduling" class="mt-12 mb-4">
      <LotSelection :dialog.sync="scheduling" />
    </v-row>

    <v-row v-if="createTicket" class="mt-12 mb-4">
      <TicketDetails
        v-if="createTicket"
        :edit.sync="createTicket"
        :ticket="ticket"
        :categories.sync="categories"
        :customerId="customerId"
        style="margin-top: -48px !important;"
      />
    </v-row>

    <ConfirmActivationRequest :open.sync="confirmationDialogOpened" />
  </v-container>
</template>

<script>

import { showServiceSelectHandler } from '@/helpers/data-handlers'

import { serviceController } from '@/controllers'

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
    services: [],
    showServices: false,
    newService: null,
    scheduling: false,
    selected: null,
    submit: false,
    showSubmitButton: false,
    createTicket: false,
    ticket: null,
    categories: [],

    confirmationDialogOpened: false
  }),

  watch: {
    newService: {
      deep: true,
      handler (value) {
        console.log('NEW SERVICE:\n', value)
        value && this.assignNewService(value)
      }
    },

    scheduling (newValue, oldValue) {
      if (!newValue && oldValue) {
        this.services = serviceController.getDataForServiceList()
      }
    },

    createTicket (newVal, oldVal) {
      if (!oldVal && newVal) {
        this.makeTicket('Awaiting for connection')
      }
    },

    confirmationDialogOpened (newValue, oldValue) {
      if (!newValue && oldValue) {
        this.services = serviceController.getDataForServiceList()
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
      return !available.includes(item.status)
    },

    getServiceDetails (details) {
      serviceController.setServiceDetails(details)
      this.services = serviceController.getDataForServiceList()
      console.log(this.services)
    },

    assignNewService (service) {
      this.__assignNewServiceToCustomer(this.customerId, service._id, this.newServiceAdded)
    },

    newServiceAdded (service) {
      console.log('NEW SERVICE ASSINED TO CUSTOMER. WORKER RESPONSE:\n', service)
      // serviceController.addNewService()
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

    changeStatus (item, index) {
      serviceController.setCurrentService(item.id)

      this.selected = item

      this.createTicket = item.status === 'Awaiting for connection'
      this.scheduling = item.status === 'Awaiting for scheduling'
      this.confirmationDialogOpened = item.status === 'Not connected'
    },

    refreshServicesDetails (data) {
      data.forEach((service, index) => {
        this.schema[index].serviceStatus = service.status
        this.schema[index].serviceStatusModified = new Date(service.modified).toISOString().slice(0, 10)
      })
      this.customerServices = JSON.parse(JSON.stringify(data))
      this.$emit('update:services', this.customerServices)
    },

    showActivationSuccess (data) {
      console.log('SHOW ACTIVATION RESULT:\n', data)
    }
  },

  mounted () {
    console.log(serviceController.getCustomerId(), serviceController.getCustomerAddress())
    const services = serviceController.getCustomerServices()
    console.log('CUSTOMER SERVICES:\n', services)
    // const services = serviceController.getDataForServiceList()
    // console.log('CUSTOMER SERVICES:\n', this.services)

    for (const service of services) {
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
