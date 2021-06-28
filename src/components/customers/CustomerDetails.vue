<template>
  <v-card flat class="transparent mx-auto mb-12 pt-8" max-width="1008" min-width="1008" v-if="ready">
    <v-row justify="center" align="center">
      <v-toolbar>
        <v-row justify="center" align="center">
          <v-spacer />
          <v-btn v-if="customerDetailsAvailable" text @click="section = 'Customer details'">
            <b :style="{ color: section === 'Customer details' ? '#900' : '#999' }">Customer details</b>
          </v-btn>
          <v-btn v-if="serviceDetailsAvailable" text @click="section = 'Service details'" :disabled="serviceDetailsDisabled">
            <b :style="{ color: section === 'Service details' ? '#900' : '#999' }">Service details</b>
          </v-btn>
          <v-btn text @click="section = 'Building details'">
            <b :style="{ color: section === 'Building details' ? '#900' : '#999' }">Building details</b>
          </v-btn>
          <v-spacer />
          <v-btn icon @click="close">
            <v-icon large>mdi-close</v-icon>
          </v-btn>
        </v-row>
      </v-toolbar>
    </v-row>

    <v-row justify="center" v-if="ready">
      <Fieldset legend="Customer details" v-if="section === 'Customer details'">
        <EditCustomerDetails
          :initialCustomer.sync="customer"
        />
      </Fieldset>

      <Fieldset legend="Service details" v-if="section === 'Service details'">
        <CustomerServices
          :services.sync="customer.services"
          :customerId="customer._id"
          :address="`${customer.apartmentNumber}/${customer.address}`"
        />
        <!-- <v-card-text v-else>
          <p style="color: #900">
            <v-icon color="primary">mdi-alert</v-icon>
            <small>You should primarily save the building details, and then update the customer' details, before assigning services to the customer.</small>
          </p>
        </v-card-text> -->
      </Fieldset>

      <Fieldset legend="Building details" v-if="section === 'Building details'">
        <EditBuildingDetails
          :buildingData="buildingDetails"
          :buildingId.sync="buildingId"
        />
      </Fieldset>
    </v-row>
    <v-row justify="center">
      <v-btn outlined text color="buttons" @click="$emit('update:dialog', false)">Exit</v-btn>
    </v-row>
  </v-card>
</template>

<script>

import { newCustomer } from '@/configs'
import { getBuildingUniqueCode, normalizeAddress } from '@/helpers'
import Fieldset from '@/components/Fieldset.vue'

export default {
  name: 'CustomerDetails',
  components: {
    Fieldset,
    CustomerServices: () => import('@/components/customers/CustomerServices.vue'),
    EditCustomerDetails: () => import('@/components/customers/EditCustomerDetails.vue'),
    EditBuildingDetails: () => import('@/components/customers/EditBuildingDetails.vue')
  },

  props: ['customerId', 'initialAddressData', 'dialog', 'sectionName'],

  data: () => ({
    ready: false,
    section: 'Service details',
    customer: null,
    buildingDetails: null,
    buildingId: null,
    update: false,
    customerDetailsAvailable: true,
    serviceDetailsAvailable: true
  }),

  computed: {
    serviceDetailsDisabled () {
      return !this.customer.buildingId || !this.customerId
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

  watch: {
    buildingId (value) {
      Object.assign(this.customer, { buildingId: value })
    },

    buildingPostCode (value) {
      Object.assign(this.customer, { postCode: value })
    }
  },

  methods: {
    getCustomerDetails (data) {
      this.customer = data
      this.buildingId = this.customer.buildingId
      if (!this.customer.buildingId) {
        this.customerDetailsAvailable = false
        this.serviceDetailsAvailable = false

        this.buildingDetails = {
          address: this.customer.address,
          addressComponents: this.customer.addressComponents,
          uniqueCode: getBuildingUniqueCode(this.customer.addressComponents),
          status: this.status
        }

        this.section = 'Building details'
      } else {
        this.section = this.serviceDetailsDisabled ? 'Customer details' : 'Service details'
      }

      this.ready = true
    },

    setCustomerDetailsSection () {
      this.customerDetailsAvailable = true
      this.section = 'Customer details'
    },

    setServicesSection (customerId) {
      if (!this.customer || !customerId) return

      Object.assign(this.customer, { _id: customerId })

      this.serviceDetailsAvailable = true
      this.section = 'Service details'
    },

    createNewCustomer () {
      this.section = 'Building details'

      const {
        address,
        addressComponents,
        coordinates,
        postCode,
        buildingId,
        management,
        owner,
        status
      } = this.initialAddressData

      this.customer = JSON.parse(JSON.stringify(newCustomer))

      Object.assign(this.customer, {
        address: normalizeAddress(address),
        buildingId,
        postCode,
        uniqueCode: `${getBuildingUniqueCode(addressComponents)}.0`
      })

      this.buildingDetails = {
        buildingId,
        address: normalizeAddress(address),
        addressComponents,
        coordinates,
        management,
        owner,
        status
      }
    },

    close () {
      this.$emit('update:dialog', false)
      this.$root.$emit('go-to-customers-list')
    }
  },

  beforeDestroy () {
    this.$root.showMainMenu = true
    this.$root.$off('customer-data-received', this.getCustomerDetails)
    this.$root.$off('new-building-created', this.setCustomerDetailsSection)
    this.$root.$off('building-data-updated', this.setCustomerDetailsSection)
    this.$root.$off('customer-created', this.setServicesSection)
    this.$root.$off('customer-updated', this.setServicesSection)
  },

  beforeMount () {
    this.$root.showMainMenu = false
    this.$root.$on('new-building-created', this.setCustomerDetailsSection)
    this.$root.$on('building-data-updated', this.setCustomerDetailsSection)
    this.$root.$on('customer-created', this.setServicesSection)
    this.$root.$on('customer-updated', this.setServicesSection)
  },

  mounted () {
    if (this.customerId) {
      this.$root.$on('customer-data-received', this.getCustomerDetails)
      this.__getCustomerData(this.customerId)
      this.section = this.sectionName ? this.sectionName : 'Customer details'
    } else {
      if (!this.initialAddressData) return console.warn('Error: prop "initialAddressData" not defined')
      this.createNewCustomer()
      this.ready = true
    }

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
