<template>
  <v-card flat class="transparent" v-if="ready">
    <v-card-text class="py-0">
      Total number of active customers: <b class="primary--text">{{ activeCustomersNumber }}</b>
    </v-card-text>

    <v-card-text class="py-0" v-if="!dashboard">
      Total number of pending connections: <b class="primary--text">{{ pendingConnections }}</b>
    </v-card-text>

    <v-card-text v-if="!dashboard" class="py-0">
      Total number of not connected customers: <b class="primary--text">{{ notConnected }}</b>
    </v-card-text>

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
    activeCustomersNumber: 0,
    currentMonthlyCharge: 0,
    monthlyChargeIncludingPendingConnections: 0,
    lastMonthConnectedCustomers: 0,
    pendingConnections: 0,
    notConnected: 0
  }),

  methods: {
    showServicesInfo (data) {
      console.log(data)

      this.$root.servicesInfo = data
      this.activeCustomersNumber = data.activeConnectionsNumber
      this.currentMonthlyCharge = data.charge
      this.monthlyChargeIncludingPendingConnections = data.chargeWithPending
      this.lastMonthConnectedCustomers = data.connectedLastMonth
      this.pendingConnections = data.pendingConnections
      this.notConnected = data.notConnected

      this.ready = true
    }
  },

  beforeDestroy () {
    this.$root.$off('dashboard-services-info', this.showServicesInfo)
  },

  beforeMount () {
    this.$root.$on('dashboard-services-info', this.showServicesInfo)
    this.__getCustomersServicesInfo()
  }
}

</script>
