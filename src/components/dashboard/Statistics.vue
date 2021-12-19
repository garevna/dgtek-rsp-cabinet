<template>
  <v-card flat class="transparent" v-if="ready">
    <v-expansion-panels flat dense class="transparent">
      <v-expansion-panel>
        <v-expansion-panel-header>
          Total number of active customers: <b class="primary--text ml-4">{{ totalNumberOfActiveCustomers }}</b>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <table width="80%" class="mx-auto">
            <tr v-for="(service, key) in active" :key="key">
              <td>
                <small>{{ service.name }}</small>
              </td>
              <td>
                <small><b>{{ service.totalNumber }}</b></small>
              </td>
            </tr>
          </table>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          Total number of pending connections: <b class="primary--text ml-4">{{ totalNumberOfPendingConnections }}</b>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <table width="80%" class="mx-auto">
            <tr v-for="(service, key) in pending" :key="key">
              <td>
                <small>{{ service.name }}</small>
              </td>
              <td>
                <small><b>{{ service.totalNumber }}</b></small>
              </td>
            </tr>
          </table>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          Total number of not connected customers: <b class="primary--text ml-4">{{ totalNumberOfNotConnectedCustomers }}</b>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <table width="80%" class="mx-auto">
            <tr v-for="(service, key) in notConnected" :key="key">
              <td>
                <small>{{ service.name }}</small>
              </td>
              <td>
                <small><b>{{ service.totalNumber }}</b></small>
              </td>
            </tr>
          </table>
        </v-expansion-panel-content>
      </v-expansion-panel>

    </v-expansion-panels>

    <v-divider class="my-3" />

    <v-card-text class="py-0">
      Total current monthly charge: <b class="primary--text">{{ totalCurrentMonthlyCharge }}</b>
    </v-card-text>

    <v-card-text class="py-0">
      Total monthly charge including pending connections: <b class="primary--text">{{ totalMonthlyChargeIncludingPendingConnections }}</b>
    </v-card-text>

    <v-card-text v-if="dashboard" class="py-0">
      Number of connected customers for the last month: <b class="primary--text">{{ numberOfConnectedCustomersForTheLastMonth }}</b>
    </v-card-text>
  </v-card>
</template>

<script>

import { statisticsController } from '@/controllers'

const keys = [
  'totalNumberOfActiveCustomers',
  'totalNumberOfPendingConnections',
  'totalNumberOfNotConnectedCustomers',
  'numberOfConnectedCustomersForTheLastMonth',
  'totalCurrentMonthlyCharge',
  'totalMonthlyChargeIncludingPendingConnections',
  'active',
  'pending',
  'notConnected'
]

export default {
  name: 'Statistics',

  props: {
    dashboard: Boolean
  },

  data: () => {
    const statistics = Object.assign({}, ...keys.map(key => ({ [key]: null })))

    return Object.assign(statistics, { ready: false })
  },

  methods: {
    getStatistics () {
      this.ready = false

      keys.forEach(key => {
        this[key] = statisticsController[key]
      })

      this.ready = true
    }
  },

  beforeMount () {
    this.$root.$on('statistics-updated', this.getStatistics)
  },

  mounted () {
    this.getStatistics()
  },

  beforeDestroy () {
    this.$root.$off('statistics-updated', this.getStatistics)
  }
}

</script>

<style>
.theme--light.v-expansion-panels .v-expansion-panel {
  background: transparent !important;
}
</style>
