<template>
  <v-card flat class="transparent pb-12 px-12 mx-auto" max-with="960" v-if="ready">
    <v-row align="start" justify="center" v-if="!edit">
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
          <v-btn text dark class="primary mt-4 mx-auto" outlined @click="createNewTicket">Create a ticket</v-btn>
        </fieldset>
      </v-col>

      <v-col style="min-width: calc(100% - 240px)" class="text-right">

        <v-data-table
          :headers="headers"
          :items="filteredItems"
          :search="search"
          class="transparent"
        >

          <template v-slot:top>
            <v-spacer />
            <v-text-field
              v-model="search"
              label="Search"
              single-line
              dense
              hide-details
              append-icon="mdi-magnify"
              outlined
              class="transparent ml-12 mr-0 pb-8 mb-4"
            ></v-text-field>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn outlined @click="editItem(item)" dark class="primary">Edit</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row v-else>
      <TicketDetails
        :ticket.sync="selectedTicket"
        :categories="categories"
        :edit.sync="edit"
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
  data: () => ({
    ready: false,
    edit: false,
    newTicket: false,
    items: null,
    selectedTicket: null,
    search: null,
    category: null,
    categories: null,
    headers: [
      {
        text: 'Subject',
        align: 'start',
        value: 'subject'
      },
      { text: 'Date (created)', value: 'created' },
      { text: 'Date (modified)', value: 'modified' },
      { text: 'Category', value: 'category' },
      { text: 'Priority', value: 'priority' },
      { text: 'Severity', value: 'severity' },
      { text: 'Status', value: 'status' },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),
  computed: {
    filteredItems () {
      const filter = this.categories[this.category]
      return this.items
        .filter(ticket => !filter || (ticket.category === filter))
    }
  },
  methods: {
    getCategories (data) {
      this.categories = data
    },
    getTickets (data) {
      console.log(data)
      this.items = data || []
      this.ready = true
    },
    filterBy (category) {
      this.category = typeof category === 'number' ? this.categories[category] : category
    },
    createNewTicket () {
      const { ticketSchema } = require('@/configs/ticketSchema')
      this.selectedTicket = ticketSchema
      this.edit = true
      this.newTicket = true
    },
    editItem (item) {
      this.selectedTicket = item
      this.edit = true
      this.newTicket = false
    }
  },

  beforeDestroy () {
    this.$root.$off('categories-received', this.getCategories)
    this.$root.$off('tickets-list-received', this.getTickets)
  },

  mounted () {
    this.$root.$on('categories-received', this.getCategories)
    this.$root.$on('tickets-list-received', this.getTickets)
    this.__getCategories()
    this.__getTickets()
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
