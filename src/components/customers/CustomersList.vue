<template>
  <transition name="fade">
    <v-container v-if="ready" style="max-width: 1440px" class="mb-12">
      <v-row v-if="!edit" justify="center">
        <v-card flat class="transparent pb-12 px-4 mx-auto">
          <Selectors
            :status.sync="status"
            :speed.sync="speed"
            :plan.sync="plan"
            :postCode.sync="postCode"
            :refresh.sync="refresh"
            :postalCodes="postalCodes"
            :plans="plans"
            :search.sync="search"
          />

          <v-data-table
            ref="customersList"
            :headers="headers"
            :items="filteredItems"
            :items-per-page.sync="rowsPerPage"
            :search="search"
            :page.sync="page"
            @click:row="editCustomerDetails"
            dense
            calculate-widths
            :options="{
              page: page,
              itemsPerPage: rowsPerPage
            }"
            fixed-header
            :footer-props="{
              showFirstLastPage: true,
              itemsPerPage: rowsPerPage,
              itemsPerPageOptions: [10, 20, 50, 100, -1],
              firstIcon: 'mdi-skip-previous',
              lastIcon: 'mdi-skip-next',
              prevIcon: 'mdi-chevron-left',
              nextIcon: 'mdi-chevron-right'
            }"
            @pagination="showPagination"
            @page-count="gotoLastPage"
          >

            <template v-slot:item.serviceStatus="{ item }">
              <v-icon :color="getIcon(item.serviceStatus).color" small class="mr-1">
                {{ getIcon(item.serviceStatus).icon }}
              </v-icon>
              <span @click="editCustomerDetails(item)" style="cursor: pointer">
                {{ item.serviceStatus }}
              </span>
            </template>
          </v-data-table>

          <div class="table-footer-button">
            <v-btn v-if="status !== 'pending'" outlined color="primary" @click="status = 'pending'">
              Show all pending connections
            </v-btn>
            <v-btn v-else outlined color="primary" @click="resetFilters">
              Show all
            </v-btn>
            <small class="ml-12">Total selected customers: {{ selectedCustomersNumber }}</small>
          </div>
        </v-card>

        <v-card flat class="transparent mx-auto" max-width="1440">
          <v-row justify="center">
            <v-col cols="8">
              <Fieldset legend="Statistics">
                <Statistics :dashboard="false" />
              </Fieldset>
            </v-col>
          </v-row>
        </v-card>
      </v-row>

      <v-row v-else justify="center">
        <CustomerDetails
          :dialog.sync="edit"
          mode="list"
          :customerId.sync="selectedCustomerId"
          :buildingId.sync="selectedCustomerBuildingId"
        />
      </v-row>
    </v-container>
  </transition>
</template>

<script>

import { customersListPageNumberHandler } from '@/helpers'

import { icons, colors } from '@/configs'

export default {
  name: 'CustomersList',

  components: {
    Fieldset: () => import('@/components/Fieldset.vue'),
    Selectors: () => import('@/components/customers/Selectors.vue'),
    Statistics: () => import('@/components/dashboard/Statistics.vue'),
    CustomerDetails: () => import('@/components/customers/CustomerDetails.vue')
  },

  data: () => ({
    worker: window[Symbol.for('map.worker')],
    ready: false,
    refresh: false,
    edit: false,
    selectedCustomerId: null,
    selectedCustomerBuildingId: null,
    customers: null,
    search: '',
    page: customersListPageNumberHandler(),
    rowsPerPage: 10,
    status: null,
    speed: null,
    plan: null,
    postCode: null,
    headers: [
      { text: 'Created', value: 'customerCreationDate', width: '120', class: 'creation-date', cellClass: 'creation-date' },
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
    ],
    estimates: null,
    pendingConnectionStatus: []
  }),

  computed: {
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
          ? this.getPending()
          : this.status
            ? this.getByStatus(this.status)
            : this.customers

      this.$vuetify.goTo(0)

      return output
        .filter(customer => !this.speed || (customer.serviceSpeed === this.speed))
        .filter(customer => !this.postCode || (customer.postCode === this.postCode))
        .filter(customer => !this.plan || (customer.servicePlan === this.plan))
    }
  },

  watch: {
    edit (newVal, oldVal) {
      if (!newVal && oldVal) this.__getCustomersListForTable(this.getData)
    },

    refresh (val) {
      if (val) {
        this.ready = false
        this.refresh = false
        this.__refreshCustomers(this.getUpdates)
      }
    },

    rowsPerPage (val) {
      // console.log('Rows per page: ', val)
    }
  },

  methods: {
    getPending () {
      return this.customers
        .filter(customer => customer.statuses.filter(status => this.pendingConnectionStatus.includes(status)).length)
    },

    getByStatus (status) {
      return this.customers
        .filter(customer => customer.statuses.filter(item => item === status).length)
    },

    showPagination (data) {
      // console.log(data)
      customersListPageNumberHandler(data.page)
    },

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

    getData (data) {
      this.customers = data
      if (this.estimates) this.setEstimates()
      this.ready = true
    },

    setEstimates () {
      for (const customer of this.customers) {
        Object.assign(customer, { approxETA: this.estimates[customer.address] || '...' })
      }
    },

    getEstimates (data) {
      this.estimates = Object.assign({}, ...data.map(item => ({ [item.address]: item.estimatedServiceDeliveryTime })))
      if (this.customers) this.setEstimates()
    },

    editCustomerDetails (customer) {
      this.selectedCustomerId = customer._id
      this.selectedCustomerBuildingId = customer.buildingId
      this.edit = true
    },

    setPendingConnectionStatus (data) {
      this.pendingConnectionStatus = data
    },

    gotoLastPage (number) {
      customersListPageNumberHandler(number)
    },

    getUpdates () {
      this.__getCustomersListForTable(this.getData)
    }
  },

  created () {
    this.worker.getBuildingsListForTable('lit', this.getEstimates)
  },

  beforeMount () {
    this.__getPendingConnectionStatus(this.setPendingConnectionStatus)
  },

  beforeDestroy () {
    this.$root.$off('customers-updates-received', this.getUpdates)
  },

  mounted () {
    this.__getCustomersListForTable(this.getData)

    this.$root.$on('customers-updates-received', this.getUpdates)

    this.$vuetify.goTo(0)
  }
}
</script>

<style>

.v-application--is-ltr .v-data-table--fixed-header .v-data-footer {
  margin-right: -8px!important;
  bottom: 36px;
  position: fixed;
  background: #ddd;
  left: 0;
  right: 0;
  padding: 0 16px;
  z-index: 18;
}

.v-menu__content--fixed {
  top: calc(100% - 360px) !important;
  bottom: 64px !important;
}

.sortable.active {
  background: #ddd !important;
  color: #900 !important;
}

/* .v-data-footer__select {
  visibility: hidden;
} */

.creation-date {
  font-size: 12px !important;
  color: #900;
}

.table-footer-button {
  position: fixed;
  bottom: 48px;
  left: 16px;
  z-index: 55;
}
</style>
