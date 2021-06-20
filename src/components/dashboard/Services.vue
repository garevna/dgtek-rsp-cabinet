<template>
  <v-card flat class="transparent pb-12 px-12 mx-auto" max-width="1440" v-if="ready">
    <v-card-title>
      <v-btn dark class="primary" v-if="showSelect" @click="$emit('update:opened', false)">
        <v-icon class="mr-4">mdi-arrow-left-bold-circle</v-icon>
        Return to customer
      </v-btn>
      <SelectorsForServices
        :type.sync="serviceType"
        :speed.sync="serviceSpeed"
        :contractTerm.sync="contractTerm"
        :plan.sync="servicePlan"
        :plans="plans"
        :contractTerms="contractTerms"
      />
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
        :items="filteredItems"
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

  components: {
    SelectorsForServices: () => import('@/components/services/SelectorsForServices.vue')
  },

  props: ['opened'],

  data: () => ({
    ready: false,
    items: null,
    serviceSpeed: '',
    serviceType: '',
    servicePlan: '',
    contractTerm: '',
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

  computed: {
    contractTerms () {
      const set = new Set(this.items.map(item => item.contractTerm))
      return Array.from(set)
    },

    plans () {
      const set = new Set(this.items.map(item => item.subscriptionFee))
      return Array.from(set)
    },

    filteredItems () {
      if (!this.serviceType && !this.serviceSpeed && !this.servicePlan && !this.contractTerm) return this.items
      return this.items
        .filter(service => !this.serviceType || (service.serviceType === this.serviceType))
        .filter(service => !this.serviceSpeed || (this.speedToString(service) === this.serviceSpeed))
        .filter(service => !this.servicePlan || (service.subscriptionFee === this.servicePlan))
        .filter(service => !this.contractTerm || (service.contractTerm === this.contractTerm))
    }
  },

  watch: {
    selected: {
      deep: true,
      handler (data) {
        console.log('SELECTED SERVICE\n', data)
        const { _id: serviceId, serviceName, status: serviceStatus, subscriptionFee: servicePlan, contractTerm: serviceTerm } = data[0]
        serviceHandler({
          serviceId,
          serviceName,
          serviceSpeed: this.speedToString(data[0]),
          serviceStatus,
          servicePlan,
          serviceTerm
        })

        console.log('SERVICE HANDLER\n', serviceHandler())
      }
    }
  },

  methods: {
    speedToString (item) {
      return `${item.downstreamSpeed}/${item.upstreamSpeed}`
    },

    getData (data) {
      this.items = Array.isArray(data) ? data : data.result ? data.result : []
      this.items.forEach(item => {
        item.speed = this.speedToString(item)
        item.active = this.$root.servicesInfo.services[item._id].active
        item.pending = this.$root.servicesInfo.services[item._id].pending
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
