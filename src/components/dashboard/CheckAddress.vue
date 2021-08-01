<template>
  <v-container>
    <v-card v-if="!openNewCustomerForm" flat class="transparent">
      <h3>Check the service availability by typing the address in the textbox below</h3>
      <v-card
        id="container-for-map"
        ref="container-for-map"
        width="100%"
        height="480"
        class="transparent"
      ></v-card>

      <v-card id="searchAddressResults" class="transparent mx-auto py-10 text-center" outlined>
        <ResultBar
          :addressData="selectedBuilding"
          :eventType="eventType"
          :newCustomer.sync="newCustomer"
          :selectCustomer.sync="selectCustomer"
          :services.sync="services"
        />
      </v-card>

      <v-row justify="center">
        <v-col cols="12" md="6" lg="5" xl="4">
          <ListOfBuildings key="lit" type="lit" :selected.sync="selectedBuilding" />
        </v-col>
        <v-col cols="12" md="6" lg="5" xl="4">
          <ListOfBuildings key="footprint" type="footprint" :selected.sync="selectedBuilding" />
        </v-col>
      </v-row>
    </v-card>

    <CustomerDetails
      v-if="openNewCustomerForm"
      :dialog.sync="openNewCustomerForm"
      :initialAddressData="initialAddressData"
    />
  </v-container>
</template>

<script>

/* eslint-disable no-new */

import DgtekMap from 'dgtek-map'

import {
  dgtekMapEvents,
  buildingStatusConfig,
  newBuilding
} from '@/configs'

const { management: managementSchema, owner: ownerSchema } = newBuilding

export default {
  name: 'CheckAddress',

  components: {
    ListOfBuildings: () => import('@/components/check-address/ListOfBuildings.vue'),
    ResultBar: () => import('@/components/check-address/ResultBar.vue'),
    CustomerDetails: () => import('@/components/customers/CustomerDetails.vue')
  },

  data: () => ({
    container: null,

    eventType: null,

    newCustomer: false,
    selectCustomer: false,
    services: false,

    openNewCustomerForm: false,
    openSelectCustomer: false,
    showServices: false,

    map: null,
    selectedBuilding: null,
    initialAddressData: {},

    scrollOptions: {
      duration: 500,
      offset: 0,
      easing: 'easeInOutCubic'
    }
  }),

  watch: {
    selectedBuilding: {
      deep: true,
      handler (data) {
        this.getBuildingDetails(data)
        this.$vuetify.goTo('#searchAddressResults', this.scrollOptions)
      }
    },

    newCustomer (val) {
      if (!val) return
      if (this.initialAddressData.buildingId) this.__getBuildingById(this.selectedBuilding.id)
      else this.openNewCustomerForm = val
    },

    selectCustomer (val) {
      val && this.$root.$emit('go-to-customers-list')
    },

    services (val) {
      val && this.$root.$emit('go-to-services')
    },

    initialAddressData: {
      deep: true,
      handler (val) {
        // console.log('INITIAL ADDRESS DATA CHANGED:\n', val)
      }
    }
  },

  methods: {
    getBuildingDetailsFromRemote (buildingDetails) {
      const { status, management = Object.assign({}, managementSchema), owner = Object.assign({}, ownerSchema) } = buildingDetails
      Object.assign(this.initialAddressData, { status, management, owner })
      this.openNewCustomerForm = true
    },

    getBuildingDetails (buildingDetails) {
      const buildingId = buildingDetails.id ? buildingDetails.id : buildingDetails.buildingId
      const { address, addressComponents, coordinates, status } = buildingDetails
      this.initialAddressData = {
        buildingId,
        address,
        addressComponents,
        coordinates,
        postCode: addressComponents.postCode,
        status,
        management: Object.assign({}, managementSchema),
        owner: Object.assign({}, ownerSchema)
      }
    },

    catchMapEvent (event) {
      // console.group('Event handler')
      // console.log('Event type: ', event.type)
      // console.log('Event data:\n', event.data)

      this.buildingId = event.data.buildingId

      const { _id: buildingId, address, addressComponents, coordinates, status, management = managementSchema, owner = ownerSchema } = event.data

      this.initialAddressData = { buildingId, address, addressComponents, postCode: addressComponents.postCode, coordinates, status, management, owner }

      if (Object.keys(buildingStatusConfig).indexOf(event.type) !== -1) {
        // console.log('EVENT AVAILABLE', event.type, event.data.address)
        this.selectedBuilding = Object.assign(event.data, { event: event.type })
      }
      // console.groupEnd('Event handler')
    }
  },

  beforeDestroy () {
    this.$root.$off('building-data-received', this.getBuildingDetailsFromRemote)
    const container = document.getElementById('container-for-map')
    if (!container) return
    dgtekMapEvents.forEach(eventName => container.removeEventListener(eventName, this.catchMapEvent))
  },

  mounted () {
    this.$root.$on('building-data-received', this.getBuildingDetailsFromRemote)
    const container = document.getElementById('container-for-map')
    dgtekMapEvents.forEach(eventName => container.addEventListener(eventName, this.catchMapEvent))

    window.google = null

    this.map = new DgtekMap({
      container,
      center: { lat: -37.8357725, lng: 144.9738764 }
    })
  }
}
</script>
