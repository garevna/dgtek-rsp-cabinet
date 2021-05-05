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
          :addressData="selected"
          :eventType="eventType"
          :newCustomer.sync="newCustomer"
          :selectCustomer.sync="selectCustomer"
          :services.sync="services"
        />
      </v-card>

      <v-row justify="center">
        <v-col cols="12" md="6" lg="5" xl="4">
          <ListOfBuildings key="lit" type="lit" :selected.sync="selected" />
        </v-col>
        <v-col cols="12" md="6" lg="5" xl="4">
          <ListOfBuildings key="footprint" type="footprint" :selected.sync="selected" />
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

const { management, owner } = newBuilding

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

    initialAddressData: {},

    map: null,
    selected: null,
    buildingId: '',
    address: '',

    scrollOptions: {
      duration: 500,
      offset: 0,
      easing: 'easeInOutCubic'
    }
  }),

  watch: {
    selected: {
      deep: true,
      handler (data) {
        this.$vuetify.goTo('#searchAddressResults', this.scrollOptions)
      }
    },
    newCustomer (val) {
      if (!val) return
      console.log('SELECTED:\n', this.selected)
      if (this.selected.buildingId) {
        this.$root.$on('building-data-received', this.getBuildingDetails)
        this.__getBuildingById(this.selected.buildingId)
      } else {
        this.createNewCustomer()
      }
    },
    initialAddressData: {
      deep: true,
      handler (val) {
        console.log('INITIAL ADDRESS DATA:\n', val)
      }
    }
  },
  methods: {
    getBuildingDetails (eventData) {
      console.log(eventData)
      Object.assign(this.selected, {
        management: eventData.management,
        owner: eventData.owner
      })

      this.$root.$off('building-data-received', this.getBuildingDetails)

      this.createNewCustomer()
    },

    createNewCustomer () {
      this.initialAddressData = {
        buildingId: this.selected.buildingId,
        buildingAddress: this.selected.address,
        buildingAddressComponents: this.selected.addressComponents,
        buildingStatus: this.selected.status,
        buildingManagement: this.selected.management || management,
        buildingOwner: this.selected.owner || owner
      }
      this.openNewCustomerForm = true
    },

    catchEvent (event) {
      console.group('Event handler')
      console.log('Event type: ', event.type)
      console.log('Event data:\n', event.data)

      if (Object.keys(buildingStatusConfig).indexOf(event.type) !== -1) {
        console.log('EVENT AVAILABLE', event.type, event.data.address)
        this.selected = Object.assign(event.data, { event: event.type })
      }
      console.groupEnd('Event handler')
    }
  },

  beforeDestroy () {
    const container = document.getElementById('container-for-map')
    dgtekMapEvents.forEach(eventName => container.removeEventListener(eventName, this.catchEvent))
  },

  mounted () {
    const container = document.getElementById('container-for-map')
    dgtekMapEvents.forEach(eventName => container.addEventListener(eventName, this.catchEvent))

    window.google = null

    this.map = new DgtekMap({
      container,
      center: { lat: -37.8357725, lng: 144.9738764 }
    })
  }
}
</script>
