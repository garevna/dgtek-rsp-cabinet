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
        single-expand
        :expanded.sync="expanded"
        show-expand
        item-key="serviceName"
        :show-select="showSelect"
        v-model="selected"
      >
        <template v-slot:item.active="{ item }">
          <v-chip color="primary" outlined v-if="item.active">
            {{ item.active }}
          </v-chip>
        </template>

        <template v-slot:item.pending="{ item }">
          <v-chip color="#777" outlined v-if="item.pending">
            {{ item.pending }}
          </v-chip>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" v-if="item.promo" class="pa-4">
            <h5>PROMO</h5>
            <p><small>
              {{ item.promo }}
            </small></p>
          </td>
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
    expanded: [],
    showSelect: showServiceSelectHandler(),
    headers: [
      {
        text: 'Plan name',
        align: 'start',
        value: 'serviceName'
      },
      { text: 'Active', value: 'active' },
      { text: 'Pending', value: 'pending' },
      { text: 'Speed (Mbps)', value: 'speed' },
      { text: 'Data (MB)', value: 'dataLimit' },
      { text: 'Term (months)', value: 'contractTerm' },
      { text: 'Connection fee', value: 'connectionFee' },
      { text: 'Router fee', value: 'routerFee' },
      { text: 'Service fee', value: 'subscriptionFee' },
      { text: 'PROMO', value: 'data-table-expand' }
      // { text: 'PROMO', value: 'promo' }
    ]
  }),

  watch: {
    selected: {
      deep: true,
      handler (data) {
        const { _id: serviceId, serviceName, status: serviceStatus, subscriptionFee: servicePlan, contractTerm: serviceTerm } = data[0]
        serviceHandler({
          serviceId,
          serviceName,
          serviceSpeed: `${data[0].upstreamSpeed}/${data[0].downstreamSpeed}`,
          serviceStatus,
          servicePlan,
          serviceTerm
        })
      }
    }
  },

  methods: {
    getData (data) {
      this.items = Array.isArray(data) ? data : data.result ? data.result : []
      this.items.forEach(item => {
        item.speed = `${item.downstreamSpeed}/${item.upstreamSpeed}Mbps`
        item.active = this.$root.servicesInfo.activeServices[item.serviceName] ? this.$root.servicesInfo.activeServices[item.serviceName] : ''
        item.pending = this.$root.servicesInfo.pendingConnections[item.serviceName] ? this.$root.servicesInfo.pendingConnections[item.serviceName] : ''
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
    // console.log(this.$root.servicesInfo)
  }
}
</script>
