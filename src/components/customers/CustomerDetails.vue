<template>
  <v-card flat class="transparent mx-auto" width="960">
    <v-toolbar class="transparent" style="box-shadow: none">
      <v-spacer />
      <v-btn icon large @click="$emit('update:dialog', false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <EditCustomerDetails v-if="ready" :initialCustomer.sync="customer" />
    <EditBuildingDetails v-if="ready" :buildingData.sync="buildingData" />
    <v-row justify="center" class="my-12">
      <v-btn outlined text color="buttons" @click="$emit('update:dialog', false)">Exit</v-btn>
    </v-row>
  </v-card>
</template>

<script>

import { newCustomer } from '@/configs'
import { getBuildingUniqueCode, normalizeAddress } from '@/helpers'

export default {
  name: 'CustomerDetails',
  components: {
    EditCustomerDetails: () => import('@/components/customers/EditCustomerDetails.vue'),
    EditBuildingDetails: () => import('@/components/customers/EditBuildingDetails.vue')
  },
  props: ['customerId', 'initialAddressData', 'dialog'],
  data: () => ({
    ready: false,
    customer: null,
    buildingData: null
  }),
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
      this.customer = data.result
      const { buildingId } = data.result

      if (buildingId) return this.__getBuildingById(buildingId)
    },

    // getServices (data) {
    //   console.log('SERVICES:\n', data)
    // },

    assignNewService () {
      //
    },
    createNewCustomer () {
      console.log('CREATE NEW CUSTOMER')
      const {
        buildingAddress,
        buildingAddressComponents,
        buildingId,
        buildingManagement,
        buildingOwner,
        buildingStatus
      } = this.initialAddressData

      console.log(buildingAddress)
      console.log(buildingAddressComponents)

      this.customer = JSON.parse(JSON.stringify(newCustomer))

      this.customer.address = normalizeAddress(buildingAddress)
      this.customer.buildingId = buildingId || null
      this.customer.postCode = buildingAddressComponents.postCode
      this.customer.uniqueCode = `${getBuildingUniqueCode(buildingAddressComponents)}.0}`

      this.buildingData = {
        buildingId,
        buildingAddress: normalizeAddress(buildingAddress),
        buildingAddressComponents,
        buildingManagement,
        buildingOwner,
        buildingStatus
      }
    }
  },
  beforeDestroy () {
    this.$root.$off('customer-data-received', this.getCustomerEventHandler)
    this.$root.$off('building-data-received', this.getBuildingEventHandler)
  },
  mounted () {
    console.log('CUSTOMER DETAILS MOUNTED')
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

    // this.$root.$on('customer-updated', this.$emit('update:dialog', false))
    // this.__getServices()
  }
}
</script>
