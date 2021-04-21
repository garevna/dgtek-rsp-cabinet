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
          ref="customersList"
          :headers="headers"
          :items="filteredItems"
          :search="search"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn outlined @click="editItem(item)" dark class="primary">Edit</v-btn>
          </template>
        </v-data-table>
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
      { text: 'Term', value: 'serviceTerm' },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),
  watch: {
    data: {
      deep: true,
      handler (value) {
        console.log('SOURCE DATA CHANGED\n', value)
      }
    }
  },
  computed: {
    customers () {
      if (!this.data) return
      return this.data.map(customer => ({
        name: `${customer.firstName} ${customer.lastName}`,
        uniqueCode: customer.uniqueCode,
        postCode: customer.postCode,
        address: `${customer.apartmentNumber}/${customer.address}`,
        plan: customer.service ? customer.service.serviceName : '',
        status: customer.service ? customer.service.status : '',
        approxETA: customer.approxETA,
        term: customer.service ? customer.service.term : '',
        id: customer._id
      }))
    },
    postalCodes () {
      return this.customers.map(customer => customer.postCode)
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
        .filter(customer => !this.plan || (customer.plan === this.plan))
    }
  },
  methods: {
    getData (data) {
      console.log('CUSTOMERS LIST REFRESHED\n', data)
      this.data = data.result
      this.ready = true
    },
    getServices (data) {
      this.services = data.result
    },
    editItem (item) {
      console.log('SELECTED CUSTOMER:\n', item)
      this.selectedCustomerId = item.id
      console.log('SELECTED CUSTOMER ID: ', this.selectedCustomerId)
      this.edit = true
    },
    forceRerender () {
      console.log('FORCE RERENDER', this.selectedCustomerId)
      this.__getCustomers()
    }
  },
  mounted () {
    this.$on('refresh-page', this.forceRerender)
    this.$root.$on('customers-list-received', this.getData)
    this.$root.$on('services-list-received', this.getServices)
    this.__getCustomers()
    this.__getServices()
  }
}
</script>

<style scoped>
</style>
