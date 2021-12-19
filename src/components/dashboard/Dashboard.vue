<template>
  <v-container>
    <v-card v-if="!showCustomer" flat class="transparent">
      <v-row justify="center" align="start" style="height: max-content !important">
        <v-col cols="12" md="6" lg="6" xl="4">
          <Statistics :dashboard="true" />
        </v-col>
        <v-col cols="12" md="6" lg="4" xl="3">
          <Fieldset legend="Messages from DGtek">
            <Messages />
          </Fieldset>
        </v-col>
      </v-row>

      <v-divider class="my-4" />

      <v-row justify="center" align="start">
        <v-col cols="12" md="10" lg="8" xl="6">
          <Fieldset legend="Customers awaiting connection">
            <v-simple-table dense fixed-header height="240px">
              <template v-slot:default>
                <tbody>
                  <tr v-for="customer in customers" :key="customer.customerId">
                    <td @click="showCustomerDetails(customer.customerId)">
                      {{ customer.uniqueCode }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </Fieldset>
        </v-col>
      </v-row>

      <v-row justify="center" align="start">
        <v-col cols="12" md="10" lg="8" xl="6">
          <Fieldset legend="DGtek promotions">
            <v-card flat class="transparent" height="140">
              ...
            </v-card>
          </Fieldset>
        </v-col>
      </v-row>
    </v-card>

    <v-row v-else justify="center">
      <CustomerDetails
        :dialog.sync="showCustomer"
        :customerId.sync="selectedCustomerId"
      />
    </v-row>
  </v-container>
</template>

<script>

import Fieldset from '@/components/Fieldset.vue'

export default {
  name: 'Dashboard',

  components: {
    Fieldset,
    Statistics: () => import('@/components/dashboard/Statistics.vue'),
    CustomerDetails: () => import(/* webpackChunkName: 'customer-details' */ '@/components/customers/CustomerDetails.vue'),
    Messages: () => import('@/components/dashboard/Messages.vue')
  },

  data: () => ({
    ready: false,
    showCustomer: false,
    customers: [],
    selectedCustomerId: null,

    activeCustomersNumber: '',
    currentMonthlyCharge: '',
    monthlyChargeIncludingPendingConnections: '',
    lastMonthConnectedCustomers: '',
    recent: [],
    messages: null
  }),

  methods: {
    getCustomers (data) {
      this.customers = data
    },

    showCustomerDetails (customerId) {
      this.selectedCustomerId = customerId
      this.showCustomer = true
    }
  },

  beforeMount () {
    this.__getAwaitingForConnectionCustomers(this.getCustomers)
  }
}
</script>

<style scoped>
h5, p {
  margin-bottom: 0!important;
  line-height: 110%;
}
</style>
