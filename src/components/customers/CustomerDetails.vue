<template>
  <v-card flat class="transparent mx-auto mb-4 pt-4" max-width="1008" min-width="1008" v-if="ready">
    <v-row justify="center" align="center">
      <v-toolbar>
        <v-row justify="center" align="center">
          <v-spacer />
          <v-btn text @click="section = 'Building details'">
            <b :style="{ color: section === 'Building details' ? '#900' : '#999' }">
              Building details
            </b>
          </v-btn>
          <v-btn v-if="customerDetailsAvailable" text @click="section = 'Customer details'">
            <b :style="{ color: section === 'Customer details' ? '#900' : '#999' }">
              Customer details
            </b>
          </v-btn>
          <v-btn v-if="serviceDetailsAvailable" text @click="section = 'Service details'" :disabled="serviceDetailsDisabled">
            <b :style="{ color: section === 'Service details' ? '#900' : '#999' }">
              Service details
            </b>
          </v-btn>
          <v-spacer />
          <v-btn icon @click="close">
            <v-icon large>mdi-close</v-icon>
          </v-btn>
        </v-row>
      </v-toolbar>
    </v-row>

    <v-row justify="center" align="start">
      <table class="mb-12">
        <tr>
          <td width="100" style="text-align: center; vertical-align: top; padding-top: 40px">
            <v-btn
              v-if="section !== 'Service details'"
              :disabled="section === 'Building details'"
              outlined
              color="primary"
              @click="goToBack"
              style="position: -webkit-sticky; position: sticky; top: 40px"
            >
              Back
            </v-btn>
          </td>
          <td>
            <Fieldset legend="Customer details" v-if="section === 'Customer details'">
              <EditCustomerDetails :customerId.sync="customerId" :buildingId.sync="buildingId" />
            </Fieldset>

            <Fieldset legend="Service details" v-if="section === 'Service details'">
              <CustomerServices
                :customerId="customerId"
                :address="customerAddress"
              />
            </Fieldset>

            <Fieldset legend="Building details" v-if="section === 'Building details'">
              <EditBuildingDetails :__buildingId.sync="buildingId" />
            </Fieldset>
          </td>
          <td width="100" style="text-align: center; vertical-align: top; padding-top: 40px">
            <v-btn
              v-if="section !== 'Service details'"
              :disabled="section === 'Service details'"
              outlined
              color="primary"
              @click="goToNext"
            >
              Next
            </v-btn>
          </td>
        </tr>
        <tr>
          <td>
            <v-btn :disabled="section === 'Building details'" outlined color="primary" @click="goToBack">
              Back
            </v-btn>
          </td>
          <td style="text-align: center">
            <v-btn outlined text color="buttons" @click="close">
              Exit
            </v-btn>
          </td>
          <td>
            <v-btn :disabled="section === 'Service details'" outlined color="primary" @click="goToNext">
              Next
            </v-btn>
          </td>
        </tr>
      </table>
    </v-row>
  </v-card>
</template>

<script>

import { newCustomer } from '@/configs'

// import { getCustomerUniqueCode } from '@/helpers'

import {
  buildingDetailsHandler,
  customerHandler,
  customerServicesHandler
} from '@/helpers/data-handlers'

import Fieldset from '@/components/Fieldset.vue'

export default {
  name: 'CustomerDetails',

  components: {
    Fieldset,
    CustomerServices: () => import('@/components/customers/CustomerServices.vue'),
    EditCustomerDetails: () => import('@/components/customers/EditCustomerDetails.vue'),
    EditBuildingDetails: () => import('@/components/customers/EditBuildingDetails.vue')
  },

  props: {
    mode: { type: String, required: false },
    dialog: { type: Boolean, required: true },
    sectionName: { type: String, default: 'Customer details', required: false },
    customerId: { type: String, default: null, required: false }, /* new customer has no id */
    buildingId: { type: String, default: null, required: false } /* new building has no id */
  },

  data: () => ({
    worker: window[Symbol.for('map.worker')],
    ready: false,
    section: 'Customer details',
    customer: JSON.parse(JSON.stringify(newCustomer)),
    customerAddress: '',
    update: false,
    customerDetailsAvailable: true,
    serviceDetailsAvailable: true
  }),

  computed: {
    serviceDetailsDisabled () {
      return !this.customerId
    },

    selectedCustomerServices: {
      get () {
        return this.customer ? this.customer.services : []
      },
      set (val) {
        console.warn('CUSTOMER SERVICES CHANGED\n', val)
      }
    }
  },

  methods: {
    goToBack () {
      this.section = this.section === 'Customer details' ? 'Building details' : 'Customer details'
    },

    goToNext () {
      this.section = this.section === 'Building details' ? 'Customer details' : 'Service details'
    },

    getCustomerDetails (data) {
      const { services, ...customerDetails } = data
      customerHandler(customerDetails)
      customerServicesHandler(services)
      this.customerAddress = `${customerHandler().apartmentNumber}/${customerHandler().address}`
      if (!customerDetails.buildingId) this.section = 'Building details'
      else this.worker.getBuildingDetailsById(customerDetails.buildingId, this.updateBuildingDetails)

      this.ready = true
    },

    updateBuildingDetails (data) {
      console.log('UPDATE BUILDING DETAILS:\n', data)
      if (data) {
        buildingDetailsHandler(data)
        this.setCustomerDetailsSection()
      } else {
        console.log('BUILDING WAS NOT FOUND!!!!!!!!!!!')
        buildingDetailsHandler('reset')
        console.log(buildingDetailsHandler())
        console.log(customerHandler().uniqueCode)
        customerHandler(Object.assign(customerHandler(), { buildingId: null }))
      }
    },

    setCustomerDetailsSection () {
      this.customerDetailsAvailable = true
      this.section = 'Customer details'
    },

    setBuildingDetailsSection () {
      this.buildingDetailsAvailable = true
      this.section = 'Building details'
    },

    setServicesSection (customerId) {
      if (!this.customer || !customerId) return

      Object.assign(this.customer, { _id: customerId })

      this.serviceDetailsAvailable = true
      this.section = 'Service details'
    },

    getNewBuildingId (buildingId) {
      if (!buildingId) return console.error('Building was not created!!!')
      customerHandler(Object.assign(customerHandler(), { buildingId }))
      this.customer = customerHandler()
    },

    close () {
      this.$root.$emit('show-main-menu')
      this.$emit('update:dialog', false)
      this.$root.$emit('go-to-customers-list')
    }
  },

  beforeDestroy () {
    ['new-building-created', 'building-data-updated'].forEach(event => this.$root.$off(event, this.setCustomerDetailsSection));
    ['customer-created', 'customer-updated'].forEach(event => this.$root.$off(event, this.setServicesSection))

    this.$root.$emit('show-main-menu')
  },

  beforeMount () {
    ['new-building-created', 'building-data-updated'].forEach(event => this.$root.$on(event, this.setCustomerDetailsSection));
    ['customer-created', 'customer-updated'].forEach(event => this.$root.$on(event, this.setServicesSection))

    if (!this.customerId) {
      this.serviceDetailsAvailable = false
      this.customer = customerHandler()
      this.customerAddress = `${customerHandler().apartmentNumber}/${customerHandler().address}`

      this.section = this.customer.buildingId ? 'Customer details' : 'Building details'

      this.ready = true
    } else {
      this.__getCustomerData(this.customerId, this.getCustomerDetails)
    }
  },

  mounted () {
    this.$root.$emit('hide-main-menu')
    this.$root.$emit('hide-snackbar')

    this.$root.$on('new-building-created', this.getNewBuildingId)

    console.log('CUSTOMER ID: ', this.customerId)

    this.$vuetify.goTo(0)
  }
}
</script>

<style scoped>
.border {
  border: 1px solid #881F1A;
  background: #fff!important;
  /* color: #900!important; */
}
</style>
