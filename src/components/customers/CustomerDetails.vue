<template>
  <v-card flat class="transparent mx-auto mb-4 pt-4" max-width="1008" min-width="1008" v-if="ready">
    <v-row justify="center" align="center">
      <v-toolbar>
        <v-row justify="center" align="center">
          <v-spacer />
          <v-btn text @click="section = 'Building details'">
            <b :style="{ color: section === 'Building details' ? '#900' : '#999' }">Building details</b>
          </v-btn>
          <v-btn v-if="customerDetailsAvailable" text @click="section = 'Customer details'">
            <b :style="{ color: section === 'Customer details' ? '#900' : '#999' }">Customer details</b>
          </v-btn>
          <v-btn v-if="serviceDetailsAvailable" text @click="section = 'Service details'" :disabled="serviceDetailsDisabled">
            <b :style="{ color: section === 'Service details' ? '#900' : '#999' }">Service details</b>
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
              <EditCustomerDetails :initialCustomer.sync="customer" />
            </Fieldset>

            <Fieldset legend="Service details" v-if="section === 'Service details'">
              <CustomerServices
                :services.sync="customer.services"
                :customerId="customer._id"
                :address="`${customer.apartmentNumber}/${customer.address}`"
              />
            </Fieldset>

            <Fieldset legend="Building details" v-if="section === 'Building details'">
              <EditBuildingDetails :buildingId.sync="customer.buildingId" />
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

import { getCustomerUniqueCode } from '@/helpers'

import { buildingDetailsHandler } from '@/helpers/data-handlers'

import Fieldset from '@/components/Fieldset.vue'

export default {
  name: 'CustomerDetails',

  components: {
    Fieldset,
    CustomerServices: () => import('@/components/customers/CustomerServices.vue'),
    EditCustomerDetails: () => import('@/components/customers/EditCustomerDetails.vue'),
    EditBuildingDetails: () => import('@/components/customers/EditBuildingDetails.vue')
  },

  props: ['dialog', 'mode', 'customerId', 'sectionName', 'selectedBuildingId'],

  data: () => ({
    ready: false,
    section: 'Service details',
    customer: JSON.parse(JSON.stringify(newCustomer)),
    update: false,
    customerDetailsAvailable: true,
    serviceDetailsAvailable: true
  }),

  computed: {
    buildingId: {
      get () {
        return this.customer?.buildingId || this.selectedBuildingId
      },
      set (val) {
        this.$emit('update:selectedBuildingId', val)
      }
    },

    serviceDetailsDisabled () {
      return !this.customer?.buildingId || !this.customerId
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
    buildingId: {
      immediate: true,
      handler (value) {
        this.customer && Object.assign(this.customer, { buildingId: value })
        value && this.__getBuildingById(value)
      }
    },

    buildingPostCode (value) {
      Object.assign(this.customer, { postCode: value })
    }
  },

  methods: {
    goToBack () {
      this.section = this.section === 'Customer details' ? 'Building details' : 'Customer details'
    },

    goToNext () {
      this.section = this.section === 'Building details' ? 'Customer details' : 'Service details'
    },

    getBuildingDetails (data) {
      buildingDetailsHandler(data.result)
      this.ready = true
    },

    getCustomerDetails (data) {
      this.customer = data
      this.buildingId = this.customer.buildingId
      if (!this.customer.buildingId) {
        this.customerDetailsAvailable = false
        this.serviceDetailsAvailable = false

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
      this.section = this.buildingId ? 'Customer details' : 'Building details'

      const {
        address,
        addressComponents,
        postCode
      } = buildingDetailsHandler()

      this.customer = JSON.parse(JSON.stringify(newCustomer))

      Object.assign(this.customer, {
        address,
        buildingId: this.selectedBuildingId,
        postCode,
        uniqueCode: getCustomerUniqueCode(addressComponents)
        // uniqueCode: `${getCustomerUniqueCode(addressComponents)}.0`
      })

      this.ready = true
    },

    close () {
      this.$root.$emit('show-main-menu')
      this.$emit('update:dialog', false)
      this.$root.$emit('go-to-customers-list')
    }
  },

  beforeDestroy () {
    this.$root.$off('customer-data-received', this.getCustomerDetails)
    this.$root.$off('new-building-created', this.setCustomerDetailsSection)
    this.$root.$off('building-data-updated', this.setCustomerDetailsSection)
    this.$root.$off('customer-created', this.setServicesSection)
    this.$root.$off('customer-updated', this.setServicesSection)

    this.$root.$off('building-details', this.getBuildingDetails)

    this.$root.$emit('show-main-menu')
  },

  beforeMount () {
    this.$root.$emit('hide-main-menu')

    this.$root.$on('new-building-created', this.setCustomerDetailsSection)
    this.$root.$on('building-data-updated', this.setCustomerDetailsSection)
    this.$root.$on('customer-created', this.setServicesSection)
    this.$root.$on('customer-updated', this.setServicesSection)

    this.$root.$on('building-details', this.getBuildingDetails)

    if (this.initialAddressData) {
      const { address, addressComponents, coordinates, postCode, buildingId, management, owner, status } = this.initialAddressData
      buildingDetailsHandler({ address, addressComponents, coordinates, postCode, buildingId, management, owner, status })
    }
  },

  mounted () {
    this.$root.$emit('hide-snackbar')
    if (this.customerId) {
      this.$root.$on('customer-data-received', this.getCustomerDetails)
      this.__getCustomerData(this.customerId)
      this.section = this.sectionName ? this.sectionName : 'Customer details'
    } else this.createNewCustomer()

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
