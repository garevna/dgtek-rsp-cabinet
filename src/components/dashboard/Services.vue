<template>
  <v-card flat class="transparent pb-12 px-12 mx-auto" max-width="1440" v-if="ready">
    <v-card-title>
      <v-btn dark class="primary" v-if="showSelect" @click="$emit('update:opened', false)">
        <v-icon class="mr-4">mdi-arrow-left-bold-circle</v-icon>
        Return to customer
      </v-btn>
      <v-spacer />
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
    <!-- <fieldset style="height: calc(100vh - 400px); overflow: auto;" class="pa-8">
      <legend><h3>Services</h3></legend> -->
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        single-select
        item-key="serviceName"
        :show-select="showSelect"
        v-model="selected"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn outlined @click="editItem(item)" dark class="primary">Select</v-btn>
        </template>
      </v-data-table>

      <!-- <span class="ml-12"><small>Total number of: {{ selectedServiceNumber }}</small></span> -->
    <!-- </fieldset> -->
  </v-card>
</template>

<script>

import { serviceHandler, showServiceSelectHandler } from '@/helpers'

export default {
  name: 'Services',
  props: ['opened'],
  data: () => ({
    ready: false,
    items: null,
    search: null,
    selected: [],
    showSelect: showServiceSelectHandler(),
    headers: [
      {
        text: 'Plan name',
        align: 'start',
        value: 'serviceName'
      },
      { text: 'Speed (Mbps)', value: 'speed' },
      { text: 'Data (MB)', value: 'dataLimit' },
      { text: 'Term (months)', value: 'contractTerm' },
      { text: 'Connection fee', value: 'connectionFee' },
      { text: 'Router fee', value: 'routerFee' },
      { text: 'Service fee', value: 'subscriptionFee' },
      { text: 'PROMO', value: 'promo' }
    ]
  }),

  watch: {
    selected: {
      deep: true,
      handler (data) {
        console.log(data[0])
        serviceHandler(data[0]._id, data[0].serviceName)
        console.log(serviceHandler())
      }
    }
  },

  methods: {
    getData (data) {
      console.log('SERVICES COMPONENT RECEIVE THE DATA:\n', data)
      this.items = Array.isArray(data) ? data : data.result ? data.result : []
      this.items.forEach(item => {
        item.speed = `${item.downstreamSpeed}/${item.upstreamSpeed}Mbps`
      })
      this.ready = true
    },
    returnToCustomerDetails () {
      this.$root.$emit('go-to-customer-details')
    }
  },

  beforeDestroy () {
    this.$root.$off('services-list-received', this.getData)
    showServiceSelectHandler('reset')
  },

  mounted () {
    this.$root.$on('services-list-received', this.getData)
    this.__getServices()
  }
}
</script>
