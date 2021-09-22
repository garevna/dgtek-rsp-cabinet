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

      <v-row v-if="mapIsReady" justify="center" align="center" class="mt-12 mb-12">
        <!-- <InputAddressByParts :value.sync="address" :components.sync="addressComponents" /> -->
        <DgtekGoogleAutocomplete />
      </v-row>

      <v-card id="searchAddressResults" class="transparent mx-auto py-10 text-center" outlined>
        <ResultBar
          v-if="selectedBuilding"
          :addressData.sync="selectedBuilding"
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

import DgtekMap from 'dgtek-portal-map-package'
// import 'dgtek-google-autocomplete'
import 'dgtek-google-autocomplete/dist/dgtek-google-autocomplete.css'

import { dgtekMapEvents /* , addressStatus, buildingStatusConfig */ } from '@/configs'
// import { setAPIHost } from '@/helpers'

import { buildingDetailsHandler } from '@/helpers/data-handlers'

import ListOfBuildings from '@/components/check-address/ListOfBuildings.vue'

const { DgtekGoogleAutocomplete } = require('dgtek-google-autocomplete').default

export default {
  name: 'CheckAddress',

  components: {
    DgtekGoogleAutocomplete,
    ListOfBuildings,
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
    mapIsReady: false,
    selectedBuilding: null,
    selectedBuildingId: null,

    address: '',
    addressComponents: {},

    statusToDisplay: '',
    estimatedServiceDeliveryTime: '',

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
        this.selectedBuildingId = data.id || data.buildingId
        delete data.id
        buildingDetailsHandler(Object.assign(data, { buildingId: this.selectedBuildingId }))
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
      const { address, addressComponents, status, buildingId, coordinates, estimatedServiceDeliveryTime } = event.data

      this.selectedBuildingId = buildingId
      this.selectedBuilding = { address, addressComponents, status, buildingId, coordinates, estimatedServiceDeliveryTime }
    },

    catchGoogleAutocompleteEvent (event) {
      const { address, addressComponents, status, buildingId, url, coordinates } = event.detail

      this.selectedBuilding = { address, addressComponents, status, buildingId, coordinates, url }
      this.selectedBuildingId = buildingId

      if (!buildingId) {
        this.$root.$emit('open-error-popup', {
          warning: true,
          errorType: address,
          errorMessage: 'Building was not found in DB. If you want to create new one please do not forget to save building details before saving customer details.'
        })
      }
    }
  },

  beforeDestroy () {
    this.$root.$off('building-details', this.showNewCustomerForm)
    const container = document.getElementById('container-for-map')
    if (!container) return
    dgtekMapEvents.forEach(eventName => container.removeEventListener(eventName, this.catchMapEvent))

    window.removeEventListener('new-address-data', this.catchGoogleAutocompleteEvent)
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

    this.map.setHost(this.$apiHost())

    function waitForGoogleMaps () {
      if (!window.google) window.requestAnimationFrame(waitForGoogleMaps.bind(this))
      else this.mapIsReady = true
    }

    window.requestAnimationFrame(waitForGoogleMaps.bind(this))

    window.addEventListener('new-address-data', this.catchGoogleAutocompleteEvent)
  }
}
</script>
