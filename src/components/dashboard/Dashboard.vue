<template>
  <v-card flat class="transparent">
    <v-row justify="center" align="start">
      <v-col cols="12" md="6" lg="4" xl="3">
        <Info :dashboard="true" />
      </v-col>
      <v-col cols="12" md="6" lg="4" xl="3">
        <Fieldset legend="Customers awaiting connection">
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
    Fieldset,
    Info: () => import('@/components/dashboard/Info.vue')
  },

  data: () => ({
    ready: false,
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
    }
  },

  beforeDestroy () {
    this.$root.$off('customers-list-received', this.getCustomers)
  },

  beforeMount () {
    this.$root.$on('customers-list-received', this.getCustomers)
    this.__getCustomers()
  }
}
</script>
