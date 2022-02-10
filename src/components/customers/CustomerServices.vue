<template>
  <v-container>
    <v-card flat class="transparent mx-auto" v-if="!showServices">

      <v-row justify="center" class="mb-4">
        <h5><small>{{ address }}</small></h5>
      </v-row>

      <table width="100%">
        <thead>
          <tr>
            <th class="text-center">
              <small><sup>Suspend/Resume</sup></small>
            </th>
            <th class="text-center">
              <small><sup>Cancel</sup></small>
            </th>
            <th class="text-center" width="420">
              <small>Service name</small>
            </th>
            <th class="text-center" width="80">
              <small>Service status</small>
            </th>
            <th class="text-center" width="240">
              <small>Status modified</small>
            </th>
            <th class="text-center" width="360">
              <small>Requested dates (lots)</small>
            </th>
            <th class="text-center" width="240">
              <small>Activation date</small>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item of services" :key="item.serviceId">
            <td>
              <v-btn v-if="item.status === 'Active'" icon @click="actionsHandler(item, 'suspend')">
                <v-icon small color="primary">mdi-pause-circle</v-icon>
              </v-btn>
              <v-btn v-if="item.status === 'Suspended'" icon @click="actionsHandler(item, 'resume')">
                <v-icon small color="primary">mdi-backup-restore</v-icon>
              </v-btn>
            </td>
            <td>
              <v-btn icon @click="actionsHandler(item, 'cancel')">
                <v-icon small color="primary">mdi-delete</v-icon>
              </v-btn>
            </td>
            <td style="text-align: center">
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
                {{ getStatusText(item) }}
              </v-btn>
            </td>

            <td>
              <small>
                {{ new Date(item.modified).toISOString().slice(0, 10) }}
              </small>
            </td>

            <td v-if="item.status === 'Awaiting for confirmation' || item.status === 'In job queue'">
              <li v-if="item.lots && item.lots.length === 2">
                <small>{{ item.lots[0].date }} <small>({{ item.lots[0].period.toUpperCase() }})</small></small>
              </li>
              <li v-if="item.lots && item.lots.length === 2">
                <small>{{ item.lots[1].date }} <small>({{ item.lots[1].period.toUpperCase() }})</small></small>
              </li>
            </td>

            <td>
              <v-icon small color="primary">{{ getIcon(item) }}</v-icon>
              <small>{{ getDate(item) }}</small>
            </td>

            <td v-if="item.activationDate">
              <small><b>{{ item.activationDate }}</b></small>
            </td>

            <td v-if="item.status === 'In job queue'">
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
    <RequestForDate />
  </v-container>
</template>

<script>

import { customerHandler, showServiceSelectHandler } from '@/helpers/data-handlers'

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
    RequestForDate: () => import(/* webpackChunkName: 'popup-date-request' */ '@/components/popups/RequestForDate.vue'),
    TicketDetails: () => import(/* webpackChunkName: 'ticket-details' */ '@/components/tickets/TicketDetails.vue'),
    ConfirmActivationRequest: () => import(/* webpackChunkName: 'confirmation-request' */ '@/components/popups/ConfirmActivationRequest.vue'),
    LotSelection: () => import(/* webpackChunkName: 'lot-selection' */ '@/components/schedule/LotSelection.vue')
  },

  data: () => ({
    customerId: customerHandler()._id,
    address: `${customerHandler().apartmentNumber}/${customerHandler().address}`,
    services: [],
    showServices: false,
    newService: null,
    scheduling: false,
    submit: false,
    showSubmitButton: false,
    createTicket: false,
    ticket: null,
    categories: [],

    confirmationDialogOpened: false,
    suspendConfirmation: false,
    cancelConfirmation: false,

    suspentionDate: null,
    cancelationDate: null
  }),

  computed: {
    dialogOpened () {
      return this.confirmationDialogOpened || this.scheduling || this.showServices || this.suspendConfirmation || this.cancelConfirmation
    }
  },

  watch: {
    newService: {
      deep: true,
      handler (value) {
        value && this.assignNewService(value)
      }
    },

    dialogOpened (newValue, oldValue) {
      if (!newValue && oldValue) {
        this.services = serviceController.getDataForServiceList()
      }
    },

    createTicket (newVal, oldVal) {
      if (!oldVal && newVal) {
        this.makeTicket('Awaiting for connection')
      }
    }
  },

  methods: {
    showError: showError,

    getStatusText (item) {
      const date = item.status === 'Suspended' ? item.suspendedDate
        : item.status === 'Canceled' ? item.canceledDate : null
      return date ? `${item.status} from ${date}` : item.status
    },

    getDate (item) {
      return item.status === 'Awaiting for cancelation' || item.status === 'Canceled'
        ? item.canceledDate || item.cancelDate
        : item.status === 'Awaiting to be suspended' || item.status === 'Suspended'
          ? item.suspendedDate || item.suspendDate
          : item.status === 'Awaiting to be resumed'
            ? item.resumedDate || item.resumeDate
            : ''
    },

    getIcon (item) {
      return item.canceledDate || item.suspendedDate || item.resumedDate
        ? 'mdi-checkbox-marked-outline'
        : item.cancelDate || item.suspendDate || item.resumeDate
          ? 'mdi-help-rhombus-outline' : ''
    },

    getDateString (ms) {
      return (new Date(ms || Date.now())).toISOString().slice(0, 10)
    },

    makeTicket (subject, status = 'Active') {
      this.ticket = Object.assign({}, JSON.parse(JSON.stringify(newTicket)), {
        created: Date.now(),
        modified: Date.now(),
        category: 'Customer issue',
        subject,
        customerId: this.customerId,
        details: '...',
        status
      })
    },

    actionsHandler (item, action) {
      serviceController.setCurrentService(item.id)

      this.$root.$emit('open-date-selection-popup', {
        action,
        header: serviceController.getCustomerAddress(),
        title: item.serviceName,
        message: `Are you sure you want to ${action} the service for the customer?`
      })
    },

    disable (item) {
      const available = ['Awaiting for scheduling', 'Not connected', 'Awaiting for connection']
      return !available.includes(item.status)
    },

    assignNewService (service) {
      this.__assignNewServiceToCustomer(this.customerId, service._id, this.newServiceAdded)
    },

    newServiceAdded (service) {
      // console.log('NEW SERVICE ASSINED TO CUSTOMER. WORKER RESPONSE:\n', service)
    },

    selectService () {
      showServiceSelectHandler('set')
      this.showServices = true
    },

    changeStatus (item, status) {
      serviceController.setCurrentService(item.id)

      this.createTicket = item.status === 'Awaiting for connection'
      this.scheduling = item.status === 'Awaiting for scheduling'
      this.confirmationDialogOpened = item.status === 'Not connected'
    },

    catchConfirmation (response) {
      const { action, date } = response

      const service = serviceController.getCurrentService()

      if (!service) return

      const { id: serviceId, status } = service

      const customerId = serviceController.getCustomerId()

      if (action === 'cancel' && status === 'Not connected') return this.removeService()

      const availableStatus = {
        suspend: 'Awaiting to be suspended',
        cancel: 'Awaiting for cancelation',
        resume: 'Awaiting to be resumed'
      }

      if (!availableStatus[action]) return

      this[`__${action}Service`](customerId, serviceId, date, this.serviceStatusModified.bind(this, availableStatus[action]))
    },

    removeService () {
      this.services = serviceController.removeCurrentService()
    },

    serviceStatusModified (status) {
      this.services = serviceController.updateCurrentServiceStatus(status)
    },

    getServiceDetails (details) {
      serviceController.setServiceDetails(details)
      this.services = serviceController.getDataForServiceList()
    },

    getCustomerServices () {
      const services = serviceController.getCustomerServices()

      for (const service of services) this.__getServiceById(service.id, this.getServiceDetails)
    },

    getUpdates (data) {
      // console.log('UPDATES:\n', data)
    }
  },

  beforeDestroy () {
    this.$root.$off('customers-updates-received', this.getUpdates)
    this.$root.$off('operation-confirmed', this.catchConfirmation)
  },

  mounted () {
    this.$root.$on('customers-updates-received', this.getUpdates)
    this.$root.$on('operation-confirmed', this.catchConfirmation)

    this.getCustomerServices()

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
