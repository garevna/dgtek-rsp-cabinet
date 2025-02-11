<template>
  <v-card flat class="transparent pb-12 px-12" v-if="ready" min-width="900" max-width="1440">
    <v-toolbar flat class="transparent my-12">
      <v-toolbar-title>
        <strong>Tickets</strong>
      </v-toolbar-title>
      <v-spacer />
      <p><small>Category:</small> <strong>{{ section }}</strong></p>
    </v-toolbar>
    <v-row align="start" justify="center" v-if="!edit">
        <v-data-table
          :headers="headers"
          :items="filteredItems"
          :search="search"
          class="transparent"
          @click:row="editItem"
        >

          <template v-slot:top>
            <Filters
              :customersList="customersList"
              :customer.sync="customer"
              :severity.sync="severity"
              :priority.sync="priority"
            />
          </template>

          <template v-slot:footer.prepend>
            <v-text-field
              v-model="search"
              label="Search"
              single-line
              dense
              clearable
              hide-details
              append-icon="mdi-magnify"
              outlined
              class="transparent mt-2"
              style="max-width: 280px"
            ></v-text-field>
          </template>
        </v-data-table>
    </v-row>
    <v-row v-else>
      <TicketDetails
        :ticket.sync="selectedTicket"
        :edit.sync="edit"
      />
    </v-row>
  </v-card>
</template>

<script>

import { tickets } from '@/configs/main-dashboard'

export default {
  name: 'Tickets',

  components: {
    TicketDetails: () => import('@/components/tickets/TicketDetails.vue'),
    Filters: () => import('@/components/tickets/Filters.vue')
  },

  data: () => ({
    config: tickets,
    ready: false,
    edit: false,
    section: '',
    tickets: null,
    selectedTicket: null,
    search: null,
    customersList: [],
    customer: null,
    dates: [],
    headers: [
      { text: 'Number', align: 'start', value: 'number' },
      { text: 'Subject', align: 'start', value: 'subject' },
      { text: 'Date (created)', value: 'created' },
      { text: 'Date (modified)', value: 'modified' },
      { text: 'Category', value: 'category' },
      { text: 'Priority', value: 'priority' },
      { text: 'Severity', value: 'severity' },
      { text: 'Status', value: 'status' }
    ],
    answer: '',
    severity: null,
    priority: null
  }),

  computed: {
    filteredItems () {
      if (!(this.customer || this.severity || this.priority)) return this.tickets
      return this.tickets
        .filter(ticket => !this.customer || (ticket.customerId === this.customer))
        .filter(ticket => !this.severity || (ticket.severity === this.severity))
        .filter(ticket => !this.priority || (ticket.priority === this.priority))
    }
  },

  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler (data) {
        this.section = data.params.section.fromKebab()
        this.__getTickets(data.params.section.fromKebab(), this.getTickets)
        this.customer = null
        this.severity = null
        this.priority = null
      }
    }
  },

  methods: {
    getTicketCategories (data) {
      //
    },
    getTickets (data) {
      const getDate = date => date.indexOf('-') !== -1 ? date : new Date(date - 0).toISOString().slice(0, 10)

      this.tickets = data.map(ticket => Object.assign({}, ticket, {
        created: getDate(ticket.created),
        modified: getDate(ticket.modified)
      }))

      const list = Array.from(new Set(this.tickets.map(ticket => ticket.customerId)))

      this.__getFilteredShortListOfCustomers(list, this.getCustomersList)

      this.ready = true
    },

    editItem (item) {
      this.__getTicketById(item._id, this.showTicketDetails)
    },

    showTicketDetails (data) {
      this.selectedTicket = data
      this.edit = true
    },

    getCustomersList (data) {
      this.customersList = data
    }
  },

  beforeDestroy () {
    // this.$root.$off('categories-received', this.getCategories)
    // this.$root.$off('tickets-list-received', this.getTickets)
    // this.$root.$off('ticket-data-received', this.showTicketDetails)

    // this.$root.$off('customers-filtered-short-list-received', this.getCustomersList)
  },

  beforeMount () {
    this.__getTicketCategories(this.getTicketCategories)
    // this.$root.$on('categories-received', this.getCategories)
    // this.$root.$on('tickets-list-received', this.getTickets)
    // this.$root.$on('ticket-data-received', this.showTicketDetails)

    // this.$root.$on('customers-filtered-short-list-received', this.getCustomersList)
  }
}
</script>

<style scoped>
.border {
  border: 1px solid #881F1A;
}
.search-field {
  margin-top: -64px;
}
@media screen and (max-width: 960px) {
  .search-field {
    margin-top: 8px;
  }
}
</style>
