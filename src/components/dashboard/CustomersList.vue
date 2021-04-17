<template>
  <v-card flat class="transparent pb-12 px-12" v-if="ready">
    <v-card-title>
      <table>
        <tbody>
          <tr>
            <td>
              <v-select
                :items="statuses"
                v-model="status"
                label="Service status"
                outlined
                clearable
                dense
                color="#900"
                style="width: 270px"
              ></v-select>
            </td>
            <td>
              <v-select
                :items="speeds"
                v-model="speed"
                label="Service speed"
                outlined
                clearable
                dense
                color="primary"
                style="width: 180px"
              ></v-select>
            </td>
            <td>
              <v-select
                :items="plans"
                v-model="plan"
                label="Plan"
                outlined
                clearable
                dense
                color="primary"
                style="width: 140px"
              ></v-select>
            </td>
            <td>
              <v-select
                :items="postalCodes"
                v-model="postCode"
                label="Post code"
                outlined
                clearable
                dense
                color="primary"
                style="width: 140px"
              ></v-select>
            </td>
          </tr>
        </tbody>
      </table>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="filteredItems"
      :search="search"
    ></v-data-table>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      dense
      outlined
      hide-details
      style="display: inline-block; width: 280px"
    ></v-text-field>

    <span class="ml-12"><small>Total selected customers: {{ selectedCustomersNumber }}</small></span>
  </v-card>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'CustomersList',
  data: () => ({
    ready: false,
    data: null,
    search: '',
    status: null,
    speed: null,
    services: [],
    plans: [],
    service: null,
    plan: null,
    postCode: null,
    statuses: ['Active', 'Not connected', 'Awaiting for connection'],
    speeds: ['50/50', '150/150', '250/250', '500/500', '1000/1000'],
    headers: [
      {
        text: 'Customer name',
        align: 'start',
        sortable: false,
        value: 'name'
      },
      { text: 'Unique code', value: 'uniqueCode' },
      { text: 'Address', value: 'address' },
      { text: 'Service speed', value: 'serviceSpeed' },
      { text: 'Service status', value: 'serviceStatus' },
      { text: 'Plan', value: 'plan' },
      { text: 'Approx ETA', value: 'approxETA' },
      { text: 'Term', value: 'serviceTerm' }
    ]
  }),
  computed: {
    ...mapState(['refreshed']),
    readyToSendRequestForData () {
      return this.refreshed.customers
    },
    // ...mapState('services', { plans: 'data' }),
    customers () {
      if (!this.data) return
      return this.data.map(customer => ({
        name: `${customer.firstName} ${customer.lastName}`,
        uniqueCode: customer.uniqueCode,
        postCode: customer.postCode,
        address: `${customer.apartmentsNumber}/${customer.address}`,
        plan: customer.service ? customer.service.serviceName : '',
        status: customer.service ? customer.service.status : '',
        approxETA: customer.approxETA,
        term: customer.service ? customer.service.term : ''
      }))
    },
    postalCodes () {
      return this.customers.map(customer => customer.postCode)
    },
    // plans () {
    //   return this.customers.map(customer => customer.plan)
    // },
    selectedCustomersNumber () {
      return this.filteredItems.length
    },
    filteredItems () {
      if (!this.status && !this.speed && !this.postCode && !this.plan) return this.customers
      return this.customers
        .filter(customer => !this.status || (customer.serviceStatus === this.status))
        .filter(customer => !this.speed || (customer.serviceSpeed === this.speed))
        .filter(customer => !this.postCode || (customer.postCode === this.postCode))
        .filter(customer => !this.plan || (customer.plan === this.plan))
    }
  },
  methods: {
    getTariff (id) {
      console.log('PLANS:\n', this.plans)
      return this.plans.find(item => item._id === id) || {}
    },
    getData (data) {
      this.data = data
      this.ready = true
    },
    getServices (data) {
      this.services = data
    },
    getTariffs (data) {
      this.plans = data
    }
  },
  watch: {
    readyToSendRequestForData (val) {
      if (val) {
        this.__addCustomersListListener(this.getData)
        this.__getCustomers()
        this.__addServicesListListener(this.getServices)
        this.__getServices()
        this.__addServicesListListener(this.getTariffs)
        this.__getServices()
      }
    },
    data: {
      deep: true,
      immediate: true,
      handler (val) {
        console.log('CUSTOMERS DATA:\n', val)
      }
    }
  }
}
</script>

<style scoped>
</style>
