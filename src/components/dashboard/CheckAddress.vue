<template>
  <v-container>
    <v-card v-if="!openNewCustomerForm" flat class="transparent">
      <h5>Check the service availability by typing the address in the textbox below</h5>
      <v-card
        id="container-for-map"
        ref="container-for-map"
        width="100%"
        height="480"
        class="transparent"
      ></v-card>

      <v-row v-if="mapIsReady" justify="center" align="center" class="mb-2">
        <DgtekGoogleAutocomplete style="min-width: 900px" />
      </v-row>

      <v-card id="searchAddressResults" class="transparent mx-auto mb-12 pb-12 text-center" outlined>
        <ResultBar
          v-if="selectedBuilding"
          :addressData="selectedBuilding"
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
      mode="new"
      :dialog.sync="openNewCustomerForm"
    />
  </v-container>
</template>

<script>

import DgtekMap from 'dgtek-portal-map-package'
import 'dgtek-google-autocomplete'
import 'dgtek-google-autocomplete/dist/dgtek-google-autocomplete.css'

import { buildingDetailsHandler } from '@/helpers/data-handlers'
import { createNewBuilding, createNewCustomer, getBuildingUniqueCode } from '@/helpers'

import ListOfBuildings from '@/components/check-address/ListOfBuildings.vue'

export default {
  name: 'CheckAddress',

  components: {
    ListOfBuildings,
    ResultBar: () => import('@/components/check-address/ResultBar.vue'),
    CustomerDetails: () => import(/* webpackChunkName: 'customer-details' */ '@/components/customers/CustomerDetails.vue')
  },

  data: () => ({
    worker: window[Symbol.for('map.worker')],
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
        const buildingId = data.id || data.buildingId

        delete data.id
        data.buildingId = buildingId

        buildingDetailsHandler(data)

        createNewCustomer(data.address, buildingId, data.estimatedServiceDeliveryTime)

        if (buildingId) this.worker.getBuildingDetailsById(buildingId, this.updateSelectedBuilding)
        else this.$vuetify.goTo('#searchAddressResults', this.scrollOptions)
      }
    },

    newCustomer (val) {
      if (val) this.openNewCustomerForm = true
    },

    selectCustomer (val) {
      val && this.$root.$emit('go-to-customers-list')
    },

    services (val) {
      val && this.$root.$emit('go-to-services')
    }
  },

  methods: {
    updateSelectedBuilding (data) {
      buildingDetailsHandler(data)
      this.$vuetify.goTo('#searchAddressResults', this.scrollOptions)
    },

    catchMapEvent (data) {
      const { address, addressComponents, status, buildingId, coordinates, uniqueCode, estimatedServiceDeliveryTime } = data
      this.storeSearchResults({ address, addressComponents, status, buildingId, uniqueCode, coordinates, estimatedServiceDeliveryTime })
    },

    catchGoogleAutocompleteEvent (event) {
      let { address, addressComponents, status, buildingId, coordinates, estimatedServiceDeliveryTime } = event.detail

      const { lat, lng } = coordinates

      const uniqueCode = getBuildingUniqueCode(addressComponents)

      if (!estimatedServiceDeliveryTime) {
        this.__getEstimatedServiceDeliveryTime(status, (response) => {
          estimatedServiceDeliveryTime = response.value || response.estimatedServiceDeliveryTime
        })
      }

      this.storeSearchResults({ address, addressComponents, status, buildingId, uniqueCode, coordinates: [lng, lat], estimatedServiceDeliveryTime })
    },

    getSettings (data) {

    },

    storeSearchResults (data) {
      const { address, addressComponents, status, buildingId = null, coordinates, uniqueCode, estimatedServiceDeliveryTime } = data
      createNewBuilding({ address, addressComponents, status, buildingId, uniqueCode, coordinates, estimatedServiceDeliveryTime })
      createNewCustomer(address, buildingId, estimatedServiceDeliveryTime)
      this.selectedBuilding = { address, addressComponents, status, buildingId, uniqueCode, coordinates, estimatedServiceDeliveryTime }
      if (!buildingId) this.showWarning(address)
      this.$vuetify.goTo('#searchAddressResults', this.scrollOptions)
    },

    showWarning (address) {
      this.$root.$emit('open-error-popup', {
        warning: true,
        errorType: address,
        errorMessage: 'This building is not LIT yet, if you want to add a new building please enquire with DGtek Operations team.'
      })
    }
  },

  beforeDestroy () {
    window.removeEventListener('new-address-data', this.catchGoogleAutocompleteEvent)
    this.$unloadGoogleMapsScripts()
  },

  mounted () {
    const container = document.getElementById('container-for-map')

    window.google = null

    this.map = new DgtekMap({
      container,
      center: { lat: -37.8357725, lng: 144.9738764 }
    })

    this.worker.searchCallback = this.catchMapEvent

    function waitForGoogleMaps () {
      if (!window.google) window.requestAnimationFrame(waitForGoogleMaps.bind(this))
      else this.mapIsReady = true
    }

    window.requestAnimationFrame(waitForGoogleMaps.bind(this))

    window.addEventListener('new-address-data', this.catchGoogleAutocompleteEvent)
  }
}
</script>
