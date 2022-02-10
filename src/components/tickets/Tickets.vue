<template>
  <v-card flat class="transparent mt-8 mb-12 pb-12 px-12 mx-auto" max-with="960">
    <v-row align="start" justify="center" v-if="!edit" class="mx-auto" style="max-width: 1100px">
      <v-col style="max-width: 240px" class="text-center mt-4">
        <fieldset class="field-set">
          <legend>
            Ticket category
          </legend>
          <v-list dense class="transparent mb-12">
            <v-list-item-group
              v-model="category"
              color="primary"
              class="transparent"
              active-class="border"
            >
              <v-list-item v-for="item of categories" :key="item">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-btn text dark class="primary mt-4 mx-auto" outlined @click="createNewTicket">
            Create a ticket
          </v-btn>
        </fieldset>
      </v-col>

      <v-col style="min-width: calc(100% - 240px)" class="text-center mt-12" v-if="ready">
        <v-data-table
          :headers="headers"
          :items="filteredItems"
          :items-per-page.sync="rowsPerPage"
          :search="search"
          class="transparent"
          @click:row="editItem"
          width="700"
          :options="{
            page: tablePage,
            itemsPerPage: rowsPerPage
          }"
          fixed-header
          :footer-props="{
            showFirstLastPage: true,
            itemsPerPage: 10,
            itemsPerPageOptions: [10, 20, 50, 100, -1],
            firstIcon: 'mdi-skip-previous',
            lastIcon: 'mdi-skip-next',
            prevIcon: 'mdi-chevron-left',
            nextIcon: 'mdi-chevron-right'
          }"
          @pagination="pagination"
        >
          <template v-slot:top>
            <Filters
              :severity.sync="severity"
              :priority.sync="priority"
              :customer.sync="customer"
              :customers="customers"
            />
          </template>

            <template v-slot:item.actions="{ item }">
              <v-icon
                v-if="unread(item)"
                small
                color="primary"
                class="mr-2"
              >
                mdi-email-mark-as-unread
              </v-icon>
            </template>

            <template v-slot:footer.prepend class="mb-12">
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

              <v-spacer />
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row v-else>
      <TicketDetails
        :ticket.sync="selectedTicket"
        :categories="categories"
        :edit.sync="edit"
        :archived.sync="archived"
        :newTicket="newTicket"
      />
    </v-row>
  </v-card>
</template>

<script>

export default {
  name: 'Tickets',

  components: {
    Filters: () => import('@/components/tickets/Filters.vue'),
    TicketDetails: () => import('@/components/tickets/TicketDetails.vue')
  },

  props: ['create'],

  data: () => ({
    ready: false,
    edit: false,
    archived: false,
    newTicket: false,
    items: null,
    selectedTicket: null,
    search: null,
    category: null,
    categories: null,
    tablePage: 1,
    tablePages: null,
    rowsPerPage: 10,
    headers: [
      { text: '', value: 'actions' },
      { text: 'Ticket number', value: 'number' },
      { text: 'Subject', align: 'start', value: 'subject' },
      { text: 'Date (created)', value: 'created' },
      { text: 'Date (modified)', value: 'modified' },
      { text: 'Category', value: 'category' },
      { text: 'Priority', value: 'priority' },
      { text: 'Severity', value: 'severity' }
    ],
    customer: null,
    customers: [],
    severity: null,
    priority: null
  }),

  computed: {
    filteredItems () {
      const filter = this.categories[this.category]
      return this.items
        .filter(ticket => !filter || (ticket.category === filter))
        .filter(ticket => !this.customer || (ticket.customerId === this.customer))
        .filter(ticket => !this.severity || (ticket.severity === this.severity))
        .filter(ticket => !this.priority || (ticket.priority === this.priority))
    }
  },

  watch: {
    archived (val) {
      if (val) {
        this.archived = false
        this.__getTickets(this.getTickets)
      }
    }
  },

  methods: {
    getCategories (data) {
      this.categories = data
    },

    sendRequest () {
      this.__getTickets(this.getTickets)
    },

    getTickets (data) {
      this.items = data || []
      this.customers = Array.from(new Set(this.items.map(ticket => ticket.customerId)))
      this.ready = true
    },

    filterBy (category) {
      this.category = typeof category === 'number' ? this.categories[category] : category
    },

    createNewTicket () {
      const { ticketSchema } = JSON.parse(JSON.stringify(require('@/configs/ticketSchema')))
      this.selectedTicket = ticketSchema
      this.newTicket = true
      this.edit = true
    },

    editItem (item) {
      this.selectedTicket = item
      this.edit = true
      this.newTicket = false
    },

    showNewTicketDetails (data) {
      this.items.push(data)
      this.goToEnd()
    },

    pagination (options) {
      // console.log(options)
      this.tablePage = options.page
      this.tablePages = options.pageCount
    },

    goToEnd () {
      this.tablePage = this.tablePages
    },

    unread (ticket) {
      if (!ticket.history?.length) return false

      const { source, read = false } = ticket.history.slice(-1)[0]
      return source === 'admin' && !read
    },

    refreshSettings () {
      this.__refreshSettings(this.refreshCategories)
      setTimeout(this.refreshSettings, 60000)
    },

    refreshCategories () {
      this.__getTicketCategories(this.getCategories)
    },

    getUpdates (updates) {
      this.__getTickets(this.getTickets)
    }
  },

  beforeMount () {
    this.refreshSettings(this.refreshCategories)
    this.refreshCategories(this.getCategories)
    this.__getTickets(this.getTickets)
  },

  beforeDestroy () {
    this.$root.$off('ticket-created', this.showNewTicketDetails)
    this.$root.$off('tickets-updates-received', this.getUpdates)
  },

  mounted () {
    this.$root.$on('ticket-created', this.showNewTicketDetails)
    this.$root.$on('tickets-updates-received', this.getUpdates)
    if (this.create) this.createNewTicket()
  }
}
</script>

<style scoped>

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  font-size: 13px !important;
}

.v-select.v-text-field:not(.v-text-field--single-line) input,
.v-label {
  font-size: 14px;
}

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
