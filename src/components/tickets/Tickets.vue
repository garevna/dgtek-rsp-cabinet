<template>
  <v-card flat class="transparent mt-8 pb-12 px-12 mx-auto" max-with="960" v-if="ready">
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

      <v-col style="min-width: calc(100% - 240px)" class="text-center mt-12">
          <v-data-table
            :headers="headers"
            :items="filteredItems"
            :search="search"
            class="transparent"
            @click:row="editItem"
            width="700"
            @pagination="pagination"
            :options="{
              page: tablePage,
              itemsPerPage: rowsPerPage
            }"
          >
            <template v-slot:top>
              <!-- <v-row>
                <v-select
                  :items="customersList"
                  label="Customer address"
                  v-model="customer"
                  item-text="address"
                  item-value="customerId"
                  outlined
                  dense
                  clearable
                  :menu-props="{ bottom: true, offsetY: true }"
                  style="width: 480px"
                ></v-select>

                <v-select
                  :items="priorities"
                  label="Priority"
                  v-model="priority"
                  outlined
                  clearable
                  dense
                  :menu-props="{ bottom: true, offsetY: true }"
                  style="max-width: 160px"
                ></v-select>

                <v-select
                  :items="severities"
                  label="Severity"
                  v-model="severity"
                  outlined
                  dense
                  clearable
                  :menu-props="{ bottom: true, offsetY: true }"
                  style="max-width: 160px"
                ></v-select>
              </v-row> -->
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
    customersList: [],
    customer: null,
    tablePage: 1,
    tablePages: null,
    rowsPerPage: 8,
    headers: [
      { text: 'Ticket number', value: 'number' },
      { text: 'Subject', align: 'start', value: 'subject' },
      { text: 'Date (created)', value: 'created' },
      { text: 'Date (modified)', value: 'modified' },
      { text: 'Category', value: 'category' },
      { text: 'Priority', value: 'priority' },
      { text: 'Severity', value: 'severity' }
    ],
    severities: ['High', 'Medium', 'Low'],
    severity: null,
    priorities: ['High', 'Medium', 'Low'],
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

    getTickets (data) {
      this.items = data || []

      const list = Array.from(new Set(this.items.map(ticket => ticket.customerId)))

      this.__getFilteredShortListOfCustomers(list, this.getCustomersList)

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

    getCustomersList (data) {
      this.customersList = data
    },

    showNewTicketDetails (data) {
      this.items.push(data)
      this.goToEnd()
    },

    pagination (options) {
      this.tablePage = options.page
      this.tablePages = options.pageCount
    },

    goToEnd () {
      this.tablePage = this.tablePages
    }
  },

  beforeMount () {
    this.__getTicketCategories(this.getCategories)
    this.__getTickets(this.getTickets)
  },

  beforeDestroy () {
    this.$root.$off('ticket-created', this.showNewTicketDetails)
  },

  mounted () {
    this.$root.$on('ticket-created', this.showNewTicketDetails)
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
