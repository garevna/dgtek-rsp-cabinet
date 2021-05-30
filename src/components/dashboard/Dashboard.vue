<template>
  <v-card flat class="transparent">
    <v-row justify="center" align="start">
      <v-col cols="12" md="6" lg="4" xl="3">
        <v-card flat class="transparent">
          <v-card-text class="py-0">
            Total number of active customers: <strong class="primary--text">{{ activeCustomersNumber }}</strong>
          </v-card-text>
          <v-card-text class="py-0">
            Total current monthly charge: <strong class="primary--text">{{ currentMonthlyCharge }}</strong>
          </v-card-text>
          <v-card-text class="py-0">
            Total monthly charge including pending connections: <strong class="primary--text">{{ monthlyChargeIncludingPendingConnections }}</strong>
          </v-card-text>
          <v-card-text class="py-0">
            Number of connected customers for the last month: <strong class="primary--text">{{ lastMonthConnectedCustomers }}</strong>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4" xl="3">
        <Fieldset legend="Awaiting for connection customers">
          <v-simple-table dense fixed-header height="240px">
            <template v-slot:default>
              <tbody>
                <tr v-for="customer in awaitingCustomers" :key="customer">
                  <td>{{ customer }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </Fieldset>
      </v-col>
    </v-row>
    <v-row justify="center" align="start">
      <v-col cols="12" md="10" lg="8" xl="6">
        <Fieldset legend="Message from DGtek" style="margin-top: -60px!important">
          <v-card flat class="transparent" height="140">
            ...
          </v-card>
        </Fieldset>
      </v-col>
    </v-row>
    <v-row justify="center" align="start">
      <v-col cols="12" md="10" lg="8" xl="6">
        <Fieldset legend="DGtek promotions" style="margin-top: -60px!important">
          <v-card flat class="transparent" height="140">
            ...
          </v-card>
        </Fieldset>
      </v-col>
    </v-row>
    <v-row justify="center">
    </v-row>
    <v-row justify="center">
    </v-row>
  </v-card>
</template>

<script>

import Fieldset from '@/components/Fieldset.vue'

export default {
  name: 'Dashboard',

  components: {
    Fieldset
  },

  data: () => ({
    customers: [],
    activeCustomersNumber: '',
    currentMonthlyCharge: '',
    monthlyChargeIncludingPendingConnections: '',
    lastMonthConnectedCustomers: '',
    recent: []
  }),

  computed: {
    awaitingCustomers () {
      return !this.customers ? [] : this.customers
        .filter(customer => customer.status === 'Awaiting for connection')
        .map(customer => customer.uniqueCode)
        // .map(customer => `${customer.apartmentNumber}/${customer.address}`)
    }
  },

  methods: {
    getCustomers (data) {
      this.customers = data
    },
    showServicesInfo (data) {
      this.$root.servicesInfo = data
      this.activeCustomersNumber = data.activeCustomersNumber
      this.currentMonthlyCharge = data.totalMonthlyCharge
      this.monthlyChargeIncludingPendingConnections = data.totalMonthlyCharge + data.totalMonthlyChargeForPendingConnections
      this.lastMonthConnectedCustomers = data.newCustomersLastMonth
    }
  },

  beforeDestroy () {
    this.$root.$off('services-info-received', this.showServicesInfo)
    this.$root.$off('customers-list-received', this.getCustomers)
  },

  beforeMount () {
    this.$root.$on('services-info-received', this.showServicesInfo)
    this.__getCustomersServicesInfo()
    this.$root.$on('customers-list-received', this.getCustomers)
    this.__getCustomers()
  }
}
</script>

<style scoped>
/* .fieldset-class {
  margin-bottom: 16px;
} */
</style>
