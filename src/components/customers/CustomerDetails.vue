<template>
  <v-card flat class="transparent mx-auto my-12" max-width="1008" min-width="1008" v-if="ready">
    <v-row justify="center" align="center">
      <v-toolbar>
        <v-row justify="center" align="center">
          <v-spacer />
          <v-btn text @click="section = 'Customer details'"><b>Customer details</b></v-btn>
          <v-btn text @click="section = 'Service details'"><b>Service details</b></v-btn>
          <v-btn text @click="section = 'Building details'"><b>Building details</b></v-btn>
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
          :buildingId.sync="buildingId"
          :buildingPostCode="buildingPostCode"
        />
      </Fieldset>

      <Fieldset legend="Service details" v-if="section === 'Service details'">
        <CustomerServices
          :services.sync="customer.services"
          :address="`${customer.apartmentNumber}/${customer.address}`"
          :update.sync="update"
        />
      </Fieldset>

      <Fieldset legend="Building details" v-if="section === 'Building details'">
        <EditBuildingDetails
          :buildingData="buildingData"
          :buildingId.sync="buildingId"
          :postCode.sync="buildingPostCode"
        />
      </Fieldset>
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
  props: ['customerId', 'initialAddressData', 'dialog'],
  data: () => ({
    ready: false,
    section: 'Customer details',
    customer: null,
    buildingData: null,
    buildingId: null,
    buildingPostCode: null,
    update: false
  }),
  watch: {
    'customer.services': {
      deep: true,
      handler (data) {
        console.log('CUSTOMER SERVICES:\n', data)
      }
    },
    buildingId (value) {
      Object.assign(this.customer, { buildingId: value })
    },
    buildingPostCode (value) {
      Object.assign(this.customer, { postCode: value })
    },
    section (value) {
      console.log(value)
    },
    update (val) {
      console.log(val)
      if (val) {

      }
    }
  },
  methods: {
    getBuildingEventHandler (data) {
      console.log('CUSTOMER DETAILS COMPONENT HAS RECEIVED THE BUILDING DATA: ', data)
      this.buildingData = {
        buildingId: data._id,
        buildingAddress: normalizeAddress(data.address),
        buildingAddressComponents: data.addressComponents,
        buildingManagement: JSON.parse(JSON.stringify(data.management)),
        buildingOwner: JSON.parse(JSON.stringify(data.owner)),
        buildingStatus: data.status
      }
      this.ready = true
      console.log('BUILDING DATA:\n', this.buildingData)
    },
    getCustomerEventHandler (data) {
      console.log('CUSTOMER DATA RECEIVED:\n', data)
      this.customer = data.result ? data.result : data
      console.log(this.customer.services)
      const { buildingId } = data.result ? data.result : data

      if (buildingId) return this.__getBuildingById(buildingId)
    },

    createNewCustomer () {
      const {
        buildingAddress,
        buildingAddressComponents,
        buildingId,
        buildingManagement,
        buildingOwner,
        buildingStatus
      } = this.initialAddressData

      this.customer = JSON.parse(JSON.stringify(newCustomer))

      Object.assign(this.customer, {
        address: normalizeAddress(buildingAddress),
        buildingId: buildingId || null,
        postCode: buildingAddressComponents.postCode,
        uniqueCode: `${getBuildingUniqueCode(buildingAddressComponents)}.0}`
      })

      this.buildingData = {
        buildingId,
        buildingAddress: normalizeAddress(buildingAddress),
        buildingAddressComponents,
        buildingManagement,
        buildingOwner,
        buildingStatus
      }
    },

    close () {
      this.$emit('update:dialog', false)
      this.$root.$emit('go-to-customers-list')
    }
  },

  beforeDestroy () {
    this.$root.$off('customer-data-received', this.getCustomerEventHandler)
    this.$root.$off('building-data-received', this.getBuildingEventHandler)
  },
  mounted () {
    console.log('CUSTOMER ID: ', this.customerId)
    console.log('INITIAL ADDRESS DATA:\n', this.initialAddressData)

    if (this.customerId) {
      this.$root.$on('customer-data-received', this.getCustomerEventHandler)
      this.$root.$on('building-data-received', this.getBuildingEventHandler)
      this.__getCustomerData(this.customerId)
    } else {
      if (!this.initialAddressData) return console.warn('Error: prop "initialAddressData" not defined')
      this.buildingData = JSON.parse(JSON.stringify(this.initialAddressData))
      this.createNewCustomer()
      this.ready = true
    }
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
