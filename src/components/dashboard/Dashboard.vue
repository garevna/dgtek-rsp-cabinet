<template>
  <v-card flat class="transparent">
    <v-row justify="center" align="start">
      <v-col cols="12" md="6">
        <v-card flat class="transparent">
          <v-card-text class="py-0">
            Total number of active customers: <strong class="primary--text">{{ activeCustomersNumber }}</strong>
          </v-card-text>
          <v-card-text class="py-0">
            Total current monthly charge: <strong class="primary--text">{{ currentMonthlyCharge }}</strong>
          </v-card-text>
          <v-card-text class="py-0">
            Total monthly charge including pending connections: <strong class="primary--text">{{ monthlyCharge }}</strong>
          </v-card-text>
          <v-card-text class="py-0">
            Number of connected customers for the last month: <strong class="primary--text">{{ lastMonthConnectedCustomers }}</strong>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card flat class="transparent">
          <v-card-title class="pt-0">
            Awaiting for connection customers
          </v-card-title>
          <v-list subheader height="360">
            <v-subheader>Recent chat</v-subheader>

            <v-list-item
              v-for="chat in recent"
              :key="chat.title"
            >
              <v-list-item-avatar>
                <v-img
                  :alt="`${chat.title} avatar`"
                  :src="chat.avatar"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="chat.title"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-icon>
                <v-icon :color="chat.active ? 'deep-purple accent-4' : 'grey'">
                  mdi-message-outline
                </v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
          <v-card-text v-for="customer in awaitingCustomers" :key="customer._id" class="py-0">
              {{ customer.name }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-card flat class="transparent mx-auto">
        <v-card-title>
          Message from DGtek
        </v-card-title>
        <v-card-text></v-card-text>
      </v-card>
    </v-row>
    <v-row justify="center">
    </v-row>
    <v-row justify="center">
    </v-row>
    <v-row justify="center">
    </v-row>
  </v-card>
</template>

<script>

export default {
  name: 'Dashboard',
  data: () => ({
    customers: [],
    activeCustomersNumber: 107,
    currentMonthlyCharge: '$350',
    monthlyCharge: '$480',
    lastMonthConnectedCustomers: 4,
    recent: []
  }),
  computed: {
    awaitingCustomers () {
      return this.customers.filter(customer => customer.status === 'Not connected')
    }
  },
  methods: {
    getCustomers (data) {
      console.log('CUSTOMERS:\n', data)
      this.customers = data
    }
  },
  mounted () {
    this.$on('customers-list-refreshed', this.getCustomers)
    this.__getCustomers()
  }
}
</script>

<style scoped>
</style>
