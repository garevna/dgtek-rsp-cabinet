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
    activeCustomersNumber: 107,
    currentMonthlyCharge: '$350',
    monthlyCharge: '$480',
    lastMonthConnectedCustomers: 4,
    recent: [],
    awaitingCustomers: [
      {
        _id: '4789',
        name: 'John Smith'
      },
      {
        _id: '4790',
        name: 'Piter Moor'
      },
      {
        _id: '4791',
        name: 'Kelly Wagner'
      },
      {
        _id: '4794',
        name: 'Helen Trump'
      },
      {
        _id: '4795',
        name: 'John Smith'
      },
      {
        _id: '4797',
        name: 'Piter Moor'
      },
      {
        _id: '4798',
        name: 'Kelly Wagner'
      },
      {
        _id: '4799',
        name: 'Helen Trump'
      },
      {
        _id: '4800',
        name: 'John Smith'
      },
      {
        _id: '4801',
        name: 'Piter Moor'
      },
      {
        _id: '4802',
        name: 'Kelly Wagner'
      },
      {
        _id: '4803',
        name: 'Helen Trump'
      },
      {
        _id: '4804',
        name: 'John Smith'
      },
      {
        _id: '4805',
        name: 'Piter Moor'
      },
      {
        _id: '4807',
        name: 'Kelly Wagner'
      },
      {
        _id: '4808',
        name: 'Helen Trump'
      }
    ]
  }),
  methods: {
    getCustomers (data) {
      console.log(data)
    }
  },
  mounted () {
    this.__addCustomersListListener(this.getCustomers)
    this.__getCustomers()
  }
}
</script>

<style scoped>
</style>
