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
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
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
    <v-dialog v-model="dialog" transition="dialog-bottom-transition">
      <CustomerDetails :customerId="selectedCustomerId" />
    </v-dialog>
  </v-card>
</template>

<script>

export default {
  name: 'CustomersList',
  components: {
    CustomerDetails: () => import('@/components/customers/CustomerDetails.vue')
  },
  data: () => ({
    ready: false,
    dialog: false,
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
    ],
    selectedCustomerId: null
  }),
  computed: {
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
      console.log(data)
      this.data = data.result
      this.ready = true
    },
    getServices (data) {
      this.services = data.result
    },
    editItem (item) {
      console.log(item)
      this.selectedCustomerId = item.id
      this.dialog = true
    }
  },
  mounted () {
    console.warn('CUSTOMERS LIST MOUNTED')
    this.$root.$on('customers-list-received', this.getData)
    this.$root.$on('services-list-received', this.getServices)
    this.__getCustomers()
    this.__getServices()
  }
}
</script>

<style scoped>
</style>
