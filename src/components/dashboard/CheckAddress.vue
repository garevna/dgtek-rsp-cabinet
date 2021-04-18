<template>
  <v-card flat class="transparent">
    <h3>Check the service availability by typing the address in the textbox below</h3>
    <v-card
      id="container-for-map"
      ref="container-for-map"
      width="100%"
      height="480"
      class="transparent"
    >
    </v-card>

    <v-card id="searchAddressResults" class="transparent mx-auto py-10 text-center" outlined>

      <v-card-text text-center>
        <p v-if="address">DGtek service at</p>
        <h5 v-if="address">{{ address }}</h5>
        <p v-if="address">check results</p>
        <p v-if="status">Status: {{ status }}</p>
        <p v-if="terms">Estimated service delivery time: {{ terms }}</p>

      </v-card-text>

      <v-card-text text-center v-if="address">
        <v-btn v-if="address" outlined color="buttons" class="mx-2" @click="newCustomer">
          Add new customer
        </v-btn>

        <v-btn outlined color="buttons" class="mx-2" @click="selectCustomer">
          Select existing customer
        </v-btn>

        <v-btn v-if="address" outlined color="buttons" class="mx-2" @click="services">
          Check the available services
        </v-btn>

      </v-card-text>
    </v-card>

    <v-row>
      <v-col cols="12" md="6">
        <v-card flat class="transparent">
          <v-card-title>
            <h5>On-net buildings</h5>
          </v-card-title>
          <v-combobox
            v-model="litAddress"
            :items="litBuildings"
            label="On-net buildings"
            outlined
            dense
            :loading="litLoading"
          ></v-combobox>
          <v-list dense max-height="360" style="overflow-y: auto">
            <v-list-item
              v-for="(item, index) of litBuildings"
              :key="index"
              @click="clickLIT(item)"
            >
              {{ item }}
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card flat class="transparent">
          <v-card-title>
            <h5>Upcoming buildings</h5>
          </v-card-title>
          <v-combobox
            v-model="footprintAddress"
            :items="footprintBuildings"
            label="Upcoming buildings"
            outlined
            dense
            :loading="footprintLoading"
          ></v-combobox>
          <v-list dense max-height="360" style="overflow-y: auto">
            <v-list-item
              v-for="(item, index) of footprintBuildings"
              :key="index"
              @click="clickFootprint(item)"
            >
              {{ item }}
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

/* eslint-disable no-new */

import DgtekMap from 'dgtek-map'

export default {
  name: 'CheckAddress',
  components: {
    //
  },
  props: {
    //
  },
  data: () => ({
    map: null,
    events: ['on-net', 'footprint', 'construction-commenced', 'comming-soon', 'not-available', 'list', 'submit-address'],
    validStatus: {
      'on-net': {
        title: 'on-net',
        terms: '1-3 days'
      },
      footprint: {
        title: 'footprint',
        terms: '1-2 weeks'
      },
      'construction-commenced': {
        title: 'Construction commenced',
        terms: '2-6 weeks'
      },
      'comming-soon': {
        title: 'Comming soon',
        terms: '4-8 weeks'
      },
      'not-available': {
        title: 'Not available',
        terms: 'N/A'
      }
    },
    address: '',
    litAddress: '',
    footprintAddress: '',
    status: '',
    terms: '',
    scrollOptions: {
      duration: 500,
      offset: 0,
      easing: 'easeInOutCubic'
    },
    litBuildings: [],
    footprintBuildings: [],
    litLoading: true,
    footprintLoading: true
  }),
  computed: {
    //
  },
  watch: {
    litAddress (value) {
      this.address = value
      this.refresh('on-net')
    },
    footprintAddress (value) {
      this.address = value
      this.refresh('footprint')
    }
  },
  methods: {
    catchEvent (event) {
      console.group('Event handler')
      console.log('Event type: ', event.type)
      console.log('Event data:\n', event.data)
      console.groupEnd('Event handler')
      if (['on-net', 'footprint', 'construction-commenced', 'coming-soon', 'not-available'].indexOf(event.type)) {
        this.address = event.data.address
        this.status = this.validStatus[event.data.status] ? this.validStatus[event.data.status].title : ''
        this.terms = this.validStatus[event.data.status] ? this.validStatus[event.data.status].terms : ''
        this.$vuetify.goTo('#searchAddressResults', this.scrollOptions)
      }
      if (event.type === 'list') {
        if (event.data.store === 'lit') {
          this.litLoading = false
          this.litBuildings = event.data.result
        }
        if (event.data.store === 'footprint') {
          this.footprintLoading = false
          this.footprintBuildings = event.data.result
        }
      }
    },
    selectLIT (building) {
      console.log('LIT:', building)
    },
    selectFootprint (building) {
      console.log('Footprint:', building)
    },
    newCustomer () {
      console.log('Create new customer!')
      console.log(this.address)
    },
    selectCustomer (customer) {
      console.log('Selected customer:', customer)
    },
    services () {
      console.log('Services')
    },
    refresh (type) {
      this.status = this.validStatus[type].title
      this.terms = this.validStatus[type].terms
      this.$vuetify.goTo('#searchAddressResults', this.scrollOptions)
    },
    clickLIT (item) {
      this.address = item
      this.refresh('on-net')
      // this.status = this.validStatus['on-net'].title
      // this.terms = this.validStatus['on-net'].terms
      // this.$vuetify.goTo('#searchAddressResults', this.scrollOptions)
    },
    clickFootprint (item) {
      this.address = item
      this.refresh('footprint')
      // this.status = this.validStatus.footprint.title
      // this.terms = this.validStatus.footprint.terms
      // this.$vuetify.goTo('#searchAddressResults', this.scrollOptions)
    }
  },
  created () {
    //
  },
  mounted () {
    const container = document.getElementById('container-for-map')
    this.events.forEach(eventName => container.addEventListener(eventName, this.catchEvent))

    window.google = null

    this.map = new DgtekMap({
      container,
      center: { lat: -37.8357725, lng: 144.9738764 }
    })
    this.map.getLIT()
    this.map.getFootprint()
  }
}
</script>
