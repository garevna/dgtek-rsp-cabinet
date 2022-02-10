<template>
  <v-container class="mb-12 pb-12">
    <v-row v-if="!openCustomerDetails">
      <v-card flat class="transparent pb-12 px-12 mx-auto" max-width="1440" v-if="ready">
        <v-card v-if="!showServiceDetails" flat class="transparent">
          <v-card-title>
            <SelectorsForServices
              :type.sync="serviceType"
              :speed.sync="serviceSpeed"
              :contractTerm.sync="contractTerm"
              :plan.sync="servicePlan"
              :plans="plans"
              :contractTerms="contractTerms"
              :search.sync="search"
            />
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="filteredItems"
            :search="search"
            single-expand
            :expanded.sync="expanded"
            show-expand
            item-key="serviceName"
            v-model="selected"
            @click:row="openServiceDetails"
            fixed-header
            :footer-props="{
              showFirstLastPage: true,
              itemsPerPage: 10,
              itemsPerPageOptions: [10, 20, 50, 100, -1],
              firstIcon: 'mdi-skip-previous',
              lastIcon: 'mdi-skip-next',
              prevIcon: 'mdi-chevron-left',
              nextIcon: 'mdi-chevron-right'
            }"
          >
            <template v-slot:item.actions="{ item }">
              <v-btn v-if="showSelect" color="primary" small outlined @click.stop="selectService(item)">
                assign
              </v-btn>
            </template>

            <template v-slot:item.active="{ item }">
              <v-chip color="#777" outlined v-if="item.active" @click.stop="getActiveConnections(item)">
                {{ item.active }}
              </v-chip>
            </template>

            <template v-slot:item.pending="{ item }">
              <v-chip color="primary" outlined v-if="item.pending" @click.stop="getPendingConnections(item)">
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
        </v-card>

        <v-card v-else flat class="transparent">
          <ServiceDetails
            :serviceDetails="serviceDetails"
            :opened.sync="showServiceDetails"
          />
        </v-card>

        <ServiceConnectionInfo
          :openCustomerDetails.sync="openCustomerDetails"
          :customerId="customerId"
        />
      </v-card>
    </v-row>

    <v-row v-else>
      <CustomerDetails
        v-if="openCustomerDetails"
        :dialog.sync="openCustomerDetails"
        :customerId="customerId"
      />
    </v-row>
  </v-container>
</template>

<script>

import { showServiceSelectHandler } from '@/helpers'

import { statisticsController, serviceController } from '@/controllers'

export default {
  name: 'Services',

  components: {
    ServiceDetails: () => import(/* webpackChunkName: 'service-details' */ '@/components/services/ServiceDetails.vue'),
    SelectorsForServices: () => import(/* webpackChunkName: 'selectors-for-services' */ '@/components/services/SelectorsForServices.vue'),
    ServiceConnectionInfo: () => import(/* webpackChunkName: 'service-connection-info' */ '@/components/popups/ServiceConnectionInfo.vue'),
    CustomerDetails: () => import(/* webpackChunkName: 'customer-details' */ '@/components/customers/CustomerDetails.vue')
  },

  props: ['opened', 'customerId', 'selectedService'],

  data: () => ({
    ready: false,
    items: null,

    serviceName: '',

    serviceSpeed: '',
    serviceType: '',
    servicePlan: '',
    contractTerm: '',
    search: null,
    selected: [],
    expanded: [],
    showSelect: showServiceSelectHandler(),
    headers: [],
    showServiceDetails: false,
    serviceDetails: null,
    openCustomerDetails: false
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

  methods: {
    selectService (serviceDetails) {
      serviceController.addNewService(serviceDetails)

      this.$emit('update:selectedService', serviceDetails)
      this.$emit('update:opened', false)
    },

    getActiveConnections (service) {
      this.serviceName = service.serviceName
      this.__getServiceActiveConnections(service._id, this.showActiveConnections)
    },

    getPendingConnections (service) {
      this.serviceName = service.serviceName
      this.__getServicePendingConnections(service._id, this.showPendingConnections)
    },

    showPendingConnections (data) {
      this.$root.$emit('open-connection-popup', {
        serviceName: this.serviceName,
        connections: data,
        type: 'pending'
      })
    },

    showActiveConnections (data) {
      this.$root.$emit('open-connection-popup', {
        serviceName: this.serviceName,
        connections: data,
        type: 'active'
      })
    },

    speedToString (item) {
      return `${item.downstreamSpeed}/${item.upstreamSpeed}`
    },

    getData (data) {
      this.items = data
      this.items.forEach(item => {
        const { active, pending } = statisticsController.getServiceInfo(item.serviceName)
        Object.assign(item, { active, pending, speed: this.speedToString(item) })
      })

      this.ready = true
    },
    returnToCustomerDetails () {
      this.$root.$emit('go-to-customer-details')
    },

    openServiceDetails ($event) {
      this.serviceDetails = $event
      this.showServiceDetails = true
    },

    getUpdates (data) {
      this.__getServices(this.getData)
    }
  },

  beforeDestroy () {
    showServiceSelectHandler('reset')
    this.$root.$off('services-updates-received', this.getUpdates)
  },

  mounted () {
    const actions = [{ text: 'Assign service', value: 'actions', sortable: false }]
    const headers = [
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
    ]

    this.headers = this.showSelect ? actions.concat(headers) : headers
    this.$emit('update:selectedService', null)
    this.__getServices(this.getData)

    this.$root.$on('services-updates-received', this.getUpdates)

    this.$vuetify.goTo(0)
  }
}
</script>

<style>
.v-simple-checkbox .v-icon {
  color: #900;
}
.v-list-item__title {
  font-size: 0.8rem !important;
}
</style>
