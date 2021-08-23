<template>
  <v-dialog v-model="dialog" max-width="960px">
    <v-card flat>
      <v-toolbar dense>
        <v-icon class="mr-4"> mdi-connection </v-icon>
        <v-toolbar-title>
          <h5><small>{{ serviceName }}</small></h5>
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="dialog = false">
          <v-icon large> $close </v-icon>
        </v-btn>
      </v-toolbar>

      <v-card flat class="transparent mx-auto pa-4">
        <table width="100%">
          <thead>
            <tr>
              <th style="text-align: left;">
                <small>Address</small>
              </th>
              <th>
                <small>Unique code</small>
              </th>
              <th>
                <small>Customer</small>
              </th>
              <th v-if="type !== 'active'">
                <small>Status</small>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="connect of connections"
              :key="connect.uniqueCode"
              @click="goToCustomerDetails(connect.customerId)"
              class="tr-link"
            >
              <td style="text-align: left;">
                <small>{{ connect.address }}</small>
              </td>
              <td style="text-align: center;">
                <small>{{ connect.uniqueCode }}</small>
              </td>
              <td style="text-align: center;">
                <small>{{ connect.customerName }}</small>
              </td>
              <td v-if="type !== 'active'" style="text-align: center;">
                <small>{{ connect.serviceStatus }}</small>
              </td>
            </tr>
          </tbody>
        </table>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'ServiceConnectionInfo',

  props: ['openCustomerDetails'],

  data: () => ({
    dialog: false,
    serviceName: '',
    connections: [],
    type: null
  }),

  methods: {
    open (data) {
      this.serviceName = data.serviceName
      this.connections = data.connections
      this.type = data.type
      this.dialog = true
    },

    goToCustomerDetails (customerId) {
      this.$emit('update:customerId', customerId)
      this.$emit('update:openCustomerDetails', true)
      this.dialog = false
    }
  },
  beforeDestroy () {
    this.$root.$off('open-connection-popup', this.open)
  },

  mounted () {
    this.$root.$on('open-connection-popup', this.open)
  }
}
</script>

<style scoped>
  .tr-link {
    cursor: pointer;
  }
  .tr-link:hover {
    color: #900;
  }
</style>
