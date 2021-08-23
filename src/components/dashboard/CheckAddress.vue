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
          v-if="selectedBuilding"
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
      :selectedBuildingId="selectedBuildingId"
    />
  </v-container>
</template>

<script>

import DgtekMap from 'dgtek-map'

import { dgtekMapEvents, buildingStatusConfig } from '@/configs'

import { buildingDetailsHandler } from '@/helpers/data-handlers'

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
    selectedBuildingId: null,

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
        buildingDetailsHandler(data)
        this.selectedBuildingId = data.id || data.buildingId
        this.$vuetify.goTo('#searchAddressResults', this.scrollOptions)
      }
    },

    newCustomer (val) {
      if (!val) return
      if (this.selectedBuildingId) {
        this.__getBuildingById(this.selectedBuildingId)
      } else {
        buildingDetailsHandler(this.selectedBuilding)
        this.openNewCustomerForm = true
      }
    },

    selectCustomer (val) {
      val && this.$root.$emit('go-to-customers-list')
    },

    services (val) {
      val && this.$root.$emit('go-to-services')
    }
  },

  methods: {
    showNewCustomerForm (data) {
      buildingDetailsHandler(data.result)
      this.openNewCustomerForm = true
    },

    getBuildingDetails (buildingDetails) {
      this.initialAddressData = buildingDetailsHandler()
    },

    catchMapEvent (event) {
      this.selectedBuildingId = event.data.buildingId

      if (Object.keys(buildingStatusConfig).indexOf(event.type) !== -1) {
        this.selectedBuilding = Object.assign(event.data, { event: event.type })
      }
    }
  },

  beforeDestroy () {
    this.$root.$emit('hide-snackbar')
    this.$root.$off('building-details', this.showNewCustomerForm)
    const container = document.getElementById('container-for-map')
    if (!container) return
    dgtekMapEvents.forEach(eventName => container.removeEventListener(eventName, this.catchMapEvent))
  },

  mounted () {
    this.$root.$on('building-details', this.showNewCustomerForm)
    const container = document.getElementById('container-for-map')
    dgtekMapEvents.forEach(eventName => container.addEventListener(eventName, this.catchMapEvent))

    window.google = null

    this.map = new DgtekMap({
      container,
      center: { lat: -37.8357725, lng: 144.9738764 }
    })

    this.$root.$emit('show-snackbar', 'Please enter BUILDING address only. Do not include unit/apartment number')
  }
}
</script>
