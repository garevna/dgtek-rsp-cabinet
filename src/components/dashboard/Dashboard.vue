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
          <v-card flat class="transparent" height="240" v-if="messages" style="overflow-y: auto">
            <div v-for="message of messages" :key="message._id">
              <p><sup><small>{{ new Date(message.modified).toISOString().slice(0, 10) }}</small></sup></p>
              <h5>
                <small>
                  <sup>
                    <v-icon>mdi-alert-box</v-icon>
                    {{ message.subject }}
                  </sup>
                </small>
              </h5>
              <p>
                <small v-html="message.content.split('\n').join('<br>')"></small>
              </p>
              <v-divider class="my-4" />
            </div>
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

import { messagesHandler } from '@/helpers/data-handlers'

console.log(messagesHandler())

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
    recent: [],
    messages: null
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
    getMessages (data) {
      this.messages = messagesHandler()
    }
  },

  beforeDestroy () {
    this.$root.$off('customers-list-received', this.getCustomers)
    this.$root.$off('messages-from-dgtek-refreshed', this.getMessages)
  },

  beforeMount () {
    this.$root.$on('customers-list-received', this.getCustomers)
    this.$root.$on('messages-from-dgtek-refreshed', this.getMessages)
    this.__getCustomers()
    this.messages = messagesHandler()
  }
}
</script>

<style scoped>
h5, p {
  margin-bottom: 0!important;
  line-height: 110%;
}
</style>
