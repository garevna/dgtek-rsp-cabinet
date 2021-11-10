<template>
  <v-card flat class="transparent" v-if="ready">
    <v-expansion-panels flat dense class="transparent">
      <v-expansion-panel @click="showActiveConnections">
        <v-expansion-panel-header>
          Total number of active customers: <b class="primary--text ml-4">{{ activeCustomersNumber }}</b>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <table width="80%" class="mx-auto">
            <tr v-for="(service, key) in connections" :key="key">
              <td>
                <small>{{ service.serviceName }}</small>
              </td>
              <td>
                <small><b>{{ service.number }}</b></small>
              </td>
            </tr>
          </table>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel @click="showPendingConnections">
        <v-expansion-panel-header>
          Total number of pending connections: <b class="primary--text ml-4">{{ pendingConnections }}</b>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <table width="80%" class="mx-auto">
            <tr v-for="(service, key) in connections" :key="key">
              <td>
                <small>{{ service.serviceName }}</small>
              </td>
              <td>
                <small><b>{{ service.number }}</b></small>
              </td>
            </tr>
          </table>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel @click="showNotActiveConnections">
        <v-expansion-panel-header>
          Total number of not connected customers: <b class="primary--text ml-4">{{ notConnected }}</b>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <table width="80%" class="mx-auto">
            <tr v-for="(service, key) in connections" :key="key">
              <td>
                <small>{{ service.serviceName }}</small>
              </td>
              <td>
                <small><b>{{ service.number }}</b></small>
              </td>
            </tr>
          </table>
        </v-expansion-panel-content>
      </v-expansion-panel>

    </v-expansion-panels>
    <!-- <v-card-text class="py-0" @click="showActiveConnections">
      Total number of active connections: <b class="primary--text">{{ activeCustomersNumber }}</b>
    </v-card-text> -->

    <!-- <v-card-text class="py-0" v-if="!dashboard">
      Total number of pending connections: <b class="primary--text ml-4">{{ pendingConnections }}</b>
    </v-card-text> -->

    <!-- <v-card-text v-if="!dashboard" class="py-0">
      Total number of not connected customers: <b class="primary--text">{{ notConnected }}</b>
    </v-card-text> -->

    <v-divider class="my-3" />

    <v-card-text class="py-0">
      Total current monthly charge: <b class="primary--text">{{ currentMonthlyCharge }}</b>
    </v-card-text>

    <v-card-text class="py-0">
      Total monthly charge including pending connections: <b class="primary--text">{{ monthlyChargeIncludingPendingConnections }}</b>
    </v-card-text>

    <v-card-text v-if="dashboard" class="py-0">
      Number of connected customers for the last month: <b class="primary--text">{{ lastMonthConnectedCustomers }}</b>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: 'Info',

  props: {
    dashboard: Boolean
  },

  data: () => ({
    ready: false,

    services: null,
    connections: null,

    activeCustomersNumber: 0,
    currentMonthlyCharge: 0,
    monthlyChargeIncludingPendingConnections: 0,
    lastMonthConnectedCustomers: 0,
    pendingConnections: 0,
    notConnected: 0
  }),

  methods: {
    showServicesInfo (data) {
      this.services = data.services
      this.pendingConnections = 0
      for (const serviceId of Object.keys(data.services)) {
        this.pendingConnections += data.services[serviceId].pending
      }
      this.$root.servicesInfo = data
      this.activeCustomersNumber = data.activeConnectionsNumber
      this.currentMonthlyCharge = data.charge
      this.monthlyChargeIncludingPendingConnections = data.chargeWithPending
      this.lastMonthConnectedCustomers = data.connectedLastMonth
      // this.pendingConnections = data.pendingConnections
      this.notConnected = data.notConnected

      this.ready = true
    },

    showActiveConnections () {
      this.connections = Object.keys(this.services)
        .filter(serviceId => this.services[serviceId].active)
        .map(serviceId => ({
          serviceName: this.services[serviceId].serviceName,
          number: this.services[serviceId].active
        }))
    },

    showPendingConnections () {
      this.connections = Object.keys(this.services)
        .filter(serviceId => this.services[serviceId].pending)
        .map(serviceId => ({
          serviceName: this.services[serviceId].serviceName,
          number: this.services[serviceId].pending
        }))
    },

    showNotActiveConnections () {
      this.connections = Object.keys(this.services)
        .filter(serviceId => this.services[serviceId].notConnected)
        .map(serviceId => ({
          serviceName: this.services[serviceId].serviceName,
          number: this.services[serviceId].notConnected
        }))
    },

    getCustomersServicesInfo () {
      this.__getCustomersServicesInfo(this.showServicesInfo)
    },

    refreshCallback () {
      this.getCustomersServicesInfo(this.showServicesInfo)
    }
  },

  beforeMount () {
    this.$refreshed.customers && this.$refreshed.services && this.__getCustomersServicesInfo(this.showServicesInfo)
    this.$root.$on('refreshing-finished', this.getCustomersServicesInfo)
  },

  beforeDestroy () {
    this.$root.$off('refreshing-finished', this.getCustomersServicesInfo)
  }
}

</script>

<style>
.theme--light.v-expansion-panels .v-expansion-panel {
  background: transparent !important;
}
</style>
