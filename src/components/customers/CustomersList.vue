<template>
  <v-container>
    <v-row v-if="!edit" justify="center">
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
                    color="primary"
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
                    style="width: 120px"
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
          ref="customersList"
          :headers="headers"
          :items="filteredItems"
          :search="search"
          :page.sync="page"
          :height="tableHeight"
          fixed-header
        >
          <template v-slot:item.actions="{ item }">
            <v-btn outlined @click="editItem(item)" dark class="primary">Edit</v-btn>
          </template>
        </v-data-table>

        <div style="margin-top: -48px">
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
        </div>
      </v-card>
    </v-row>
    <v-row v-else justify="center">
      <CustomerDetails
        :dialog.sync="edit"
        :customerId="selectedCustomerId"
      />
    </v-row>
  </v-container>
</template>

<script>

import {
  customerHandler,
  estimatesHandler,
  // serviceHandler,
  customersListPageNumberHandler
} from '@/helpers'

export default {
  name: 'CustomersList',
  components: {
    CustomerDetails: () => import('@/components/customers/CustomerDetails.vue')
  },
  data: () => ({
    ready: false,
    edit: false,
    selectedCustomerId: null,
    data: null,
    search: '',
    page: customersListPageNumberHandler(),
    status: null,
    speed: null,
    plan: null,
    postCode: null,

    statuses: ['Active', 'Not connected', 'Awaiting confirmation', 'Awaiting for connection'],
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
      { text: 'Plan', value: 'servicePlan' },
      { text: 'Approx ETA', value: 'approxETA' },
      { text: 'Term', value: 'serviceTerm' },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),
  // watch: {
  //   data: {
  //     deep: true,
  //     handler (value) {
  //       console.log('SOURCE DATA CHANGED\n', value)
  //     }
  //   }
  // },
  computed: {
    tableHeight () {
      return window.innerHeight - 360
    },
    customers () {
      if (!this.data) return

      return this.data.map(customer => ({
        name: `${customer.firstName} ${customer.lastName}`,
        uniqueCode: customer.uniqueCode,
        postCode: customer.postCode,
        address: `${customer.apartmentNumber}/${customer.address}`,
        serviceSpeed: customer.serviceSpeed || '',
        servicePlan: customer.servicePlan || '',
        serviceStatus: customer.serviceStatus || '',
        approxETA: estimatesHandler(customer.buildingId) || customer.approxETA,
        serviceTerm: customer.serviceTerm || '',
        id: customer._id
      }))
    },
    postalCodes () {
      const set = new Set(this.customers.map(customer => customer.postCode))
      return Array.from(set)
    },
    plans () {
      const set = new Set(this.customers.map(customer => customer.servicePlan).filter(item => item))
      return Array.from(set)
    },
    selectedCustomersNumber () {
      return this.filteredItems.length
    },
    filteredItems () {
      if (!this.status && !this.speed && !this.postCode && !this.plan) return this.customers
      return this.customers
        .filter(customer => !this.status || (customer.serviceStatus === this.status))
        .filter(customer => !this.speed || (customer.serviceSpeed === this.speed))
        .filter(customer => !this.postCode || (customer.postCode === this.postCode))
        .filter(customer => !this.plan || (customer.servicePlan === this.plan))
    }
  },
  methods: {
    async getData (data) {
      this.data = Array.isArray(data) ? data : Array.isArray(data.result) ? data.result : []
      this.ready = true
    },
    getEstimates (data) {
      const estimates = Array.isArray(data.result) ? data.result.map(item => ({ [item.id]: item.estimatedServiceDeliveryTime })) : []
      estimatesHandler(estimates)
    },
    editItem (item) {
      this.selectedCustomerId = item.id
      customerHandler(item.id)
      this.edit = true
    },
    updateCustomerServices (data) {
      const {
        _id,
        services,
        serviceSpeed,
        serviceStatus,
        servicePlan,
        serviceTerm
      } = data

      const index = this.customers.findIndex(customer => customer.id === _id)
      if (index === -1) return
      this.customers.splice(index, 1, Object.assign(this.customers[index], {
        services,
        serviceSpeed,
        serviceStatus,
        servicePlan,
        serviceTerm
      }))
    }
  },

  beforeDestroy () {
    this.$root.$off('customers-list-received', this.getData)
    this.$root.$off('buildings-data-list', this.getEstimates)
    this.$root.$off('customer-services-updated', this.updateCustomerServices)
  },

  created () {
    this.$root.$on('buildings-data-list', this.getEstimates)
    this.__getBuildingsByStatus('lit')
    this.__getBuildingsByStatus('footprint')
    this.__getBuildingsByStatus('build')
    this.__getBuildingsByStatus('soon')
  },

  mounted () {
    this.$root.$on('customers-list-received', this.getData)
    this.$root.$on('customer-services-updated', this.updateCustomerServices)
    this.__getCustomers()
  }
}
</script>

<style scoped>
</style>
