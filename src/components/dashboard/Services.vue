<template>
  <v-card flat class="transparent pb-12 px-12" v-if="ready">
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        dense
        outlined
        hide-details
        style="display: inline-block; width: 280px"
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
    ></v-data-table>

    <!-- <span class="ml-12"><small>Total number of: {{ selectedServiceNumber }}</small></span> -->
  </v-card>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Services',
  data: () => ({
    ready: false,
    items: null,
    search: null,
    headers: [
      {
        text: 'Plan name',
        align: 'start',
        value: 'tariffName'
      },
      { text: 'Speed (Mbps)', value: '' },
      { text: 'Data (MB)', value: 'dataLimit' },
      { text: 'Term (months)', value: 'speed' },
      { text: 'Connection fee', value: 'connectionFee' },
      { text: 'Router fee', value: 'routerFee' },
      { text: 'Service fee', value: 'serviceFee' },
      { text: 'PROMO', value: 'promo' }
    ]
  }),
  computed: {
    ...mapState(['refreshed']),
    readyToSendRequestForData () {
      return this.refreshed.services
    }
  },
  methods: {
    getData (data) {
      this.items = data

      this.items.forEach(item => {
        item.speed = `${item.downstreamSpeed}/${item.upstreamSpeed}`
        item.connectionFee = ''
        item.routerFee = ''
        item.serviceFee = ''
        item.promo = ''
      })
      console.log('SERVICES:\n', this.items)
      this.ready = true
    }
  },
  watch: {
    items: {
      deep: true,
      handler (val) {
        console.log('SERVICES DATA CHANGED:\n', val)
      }
    },
    readyToSendRequestForData (val) {
      if (val) {
        this.__getServices()
        this.__addServicesListListener(this.getData)
      }
    }
  }
}
</script>
