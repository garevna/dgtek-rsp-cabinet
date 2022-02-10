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
          <v-btn text @click="section = 'Service details'" :disabled="!customer?._id">
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
            <Fieldset :legend="section" style="min-width: 960px">
              <EditCustomerDetails
                v-if="section === 'Customer details'"
                :customerId.sync="customerId"
                :buildingId.sync="buildingId"
              />
              <CustomerServices v-if="section === 'Service details'" />
              <EditBuildingDetails v-if="section === 'Building details'"/>
            </Fieldset>
            <!-- <Fieldset legend="Customer details" v-if="section === 'Customer details'">
              <EditCustomerDetails
                :customerId.sync="customerId"
                :buildingId.sync="buildingId"
              />
            </Fieldset>

            <Fieldset legend="Service details" v-if="section === 'Service details'" style="min-width: 960px">
              <CustomerServices />
            </Fieldset>

            <Fieldset legend="Building details" v-if="section === 'Building details'">
              <EditBuildingDetails />
            </Fieldset> -->
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
            <v-btn
              :disabled="section === 'Building details'"
              outlined
              color="primary"
              @click="goToBack"
            >
              Back
            </v-btn>
          </td>
          <td style="text-align: center">
            <v-btn outlined text color="buttons" @click="close">
              Exit
            </v-btn>
          </td>
          <td>
            <v-btn
              :disabled="section === 'Service details' || !customer._id"
              outlined
              color="primary"
              @click="goToNext"
            >
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

import { buildingDetailsHandler, customerHandler } from '@/helpers/data-handlers'

import { serviceController } from '@/controllers'

import Fieldset from '@/components/Fieldset.vue'

export default {
  name: 'CustomerDetails',

  components: {
    Fieldset,
    CustomerServices: () => import('@/components/customers/CustomerServices.vue'),
    EditCustomerDetails: () => import('@/components/customers/EditCustomerDetails.vue'),
    EditBuildingDetails: () => import('@/components/customers/EditBuildingDetails.vue')
  },

  props: ['dialog', 'customerId'],

  // props: {
  //   dialog: { type: Boolean, required: true },
  //   // sectionName: { type: String, default: 'Customer details', required: false },
  //   customerId: { type: String, default: null, required: false }
  //   // buildingId: { type: String, default: null, required: false }
  // },

  data: () => ({
    worker: window[Symbol.for('map.worker')],
    ready: false,
    section: 'Customer details',
    customer: null,
    customerAddress: '',
    update: false,
    customerDetailsAvailable: true
  }),

  watch: {
    ready (value) {
      if (value) {
        this.customer = customerHandler()
        this.customerAddress = `${this.customer.apartmentNumber}/${this.customer.address}`
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
      if (!data) return
      const { services = [], ...customerDetails } = data

      customerHandler(customerDetails)

      this.customerAddress = `${customerHandler().apartmentNumber}/${customerHandler().address}`

      serviceController.setCustomer(customerDetails._id, this.customerAddress, services)

      // if (!customerDetails.buildingId) this.section = 'Building details'
      // else this.worker.getBuildingDetailsById(customerDetails.buildingId, this.updateBuildingDetails)

      this.ready = true
    },

    updateBuildingDetails (data) {
      if (data) {
        buildingDetailsHandler(data)
        this.setCustomerDetailsSection()
      } else {
        buildingDetailsHandler('reset')
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

    setServicesSection () {
      if (!this.customer?._id) return

      // Object.assign(this.customer, { _id: customerId })

      // serviceController.setCustomer(this.customer._id, this.customer.address, this.customer.services)

      this.section = 'Service details'
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

  created () {
    this.customerId
      ? this.__getCustomerData(this.customerId, this.getCustomerDetails)
      : this.getCustomerDetails(JSON.parse(JSON.stringify(newCustomer)))
  },

  mounted () {
    ['new-building-created', 'building-data-updated'].forEach(event => this.$root.$on(event, this.setCustomerDetailsSection));
    ['customer-created', 'customer-updated'].forEach(event => this.$root.$on(event, this.setServicesSection))

    this.ready = Boolean(customerHandler())

    this.customer = customerHandler()

    this.customerAddress = `${customerHandler().apartmentNumber}/${customerHandler().address}`
    this.$root.$emit('hide-main-menu')
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
