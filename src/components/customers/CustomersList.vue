<template>
  <transition name="fade">
    <v-container v-if="ready">
      <v-row v-if="!edit" justify="center">
        <v-card flat class="transparent pb-12 px-12 mx-auto">
          <Selectors
            :status.sync="status"
            :speed.sync="speed"
            :plan.sync="plan"
            :postCode.sync="postCode"
            :refresh.sync="refresh"
            :postalCodes="postalCodes"
            :plans="plans"
          />

          <v-data-table
            ref="customersList"
            :headers="headers"
            :items="filteredItems"
            :search="search"
            :page.sync="page"
            fixed-header
            @click:row="editItem"
            dense
            calculate-widths
          >

            <template v-slot:item.serviceStatus="{ item }">
              <v-icon :color="getIcon(item.serviceStatus).color" small class="mr-1">
                {{ getIcon(item.serviceStatus).icon }}
              </v-icon>
              <span @click="editItem(item)" style="cursor: pointer">
                {{ item.serviceStatus }}
              </span>
            </template>

            <!-- <template v-slot:item.actions="{ item }">
              <v-btn outlined @click="editItem(item)" dark class="primary">Edit</v-btn>
            </template> -->
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

        <v-card flat class="transparent mx-auto" max-width="1440">
          <v-row justify="center">
            <v-col cols="8">
              <Fieldset legend="Statistics">
                <Info :dashboard="false" />
              </Fieldset>
            </v-col>
            <v-col cols="4">
              <v-btn v-if="status !== 'pending'" outlined color="primary" @click="status = 'pending'">
                Show all pending connections
              </v-btn>
              <v-btn v-else outlined color="primary" @click="resetFilters">
                Show all
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-row>

      <v-row v-else justify="center">
        <CustomerDetails
          :dialog.sync="edit"
          :customerId.sync="selectedCustomerId"
        />
      </v-row>
    </v-container>
  </transition>
</template>

<script>

import {
  customerHandler,
  estimatesHandler,
  // serviceHandler,
  customersListPageNumberHandler
} from '@/helpers'

import { icons, colors } from '@/configs'

export default {
  name: 'CustomersList',

  components: {
    Fieldset: () => import('@/components/Fieldset.vue'),
    Selectors: () => import('@/components/customers/Selectors.vue'),
    Info: () => import('@/components/dashboard/Info.vue'),
    CustomerDetails: () => import('@/components/customers/CustomerDetails.vue')
  },

  data: () => ({
    ready: false,
    refresh: false,
    edit: false,
    selectedCustomerId: null,
    data: null,
    search: '',
    page: customersListPageNumberHandler(),
    status: null,
    speed: null,
    plan: null,
    postCode: null,
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
      { text: 'Term', value: 'serviceTerm' }
    ]
  }),

  computed: {
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
      const output = this.status === 'Service not assigned' ? this.customers.filter(customer => !customer.serviceStatus)
        : this.status === 'pending'
          ? this.customers.filter(customer => customer.serviceStatus === 'Not connected' || customer.serviceStatus === 'Awaiting for scheduling')
          : this.customers.filter(customer => !this.status || (customer.serviceStatus === this.status))

      this.$vuetify.goTo(0)

      return output
        .filter(customer => !this.speed || (customer.serviceSpeed === this.speed))
        .filter(customer => !this.postCode || (customer.postCode === this.postCode))
        .filter(customer => !this.plan || (customer.servicePlan === this.plan))
    }
  },

  watch: {
    refresh (val) {
      if (val) {
        this.ready = false
        this.refresh = false
      }
    }
  },

  methods: {
    resetFilters  () {
      this.status = ''
      this.postCode = ''
      this.plan = ''
      this.speed = ''
      this.$vuetify.goTo(0)
    },

    filter () {
      this.$vuetify.goTo(0)
      this.filterChanged = false
    },

    getIcon (status) {
      return { icon: icons[status], color: colors[status] }
    },

    async getData (data) {
      this.data = data
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
    },

    customersListRefreshed (event) {
      this.getData(event)
      this.$vuetify.goTo(0)
    }
  },

  beforeDestroy () {
    this.$root.$off('customers-list-refreshed', this.customersListRefreshed)
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
    this.$root.$on('customers-list-refreshed', this.customersListRefreshed)
    this.$root.$on('customers-list-received', this.getData)
    this.$root.$on('customer-services-updated', this.updateCustomerServices)
    this.__getCustomers()
    this.$vuetify.goTo(0)
  }
}
</script>

<style>
/* .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
} */
</style>
