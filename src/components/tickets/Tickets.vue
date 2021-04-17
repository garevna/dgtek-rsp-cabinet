<template>
  <v-card flat class="transparent pb-12 px-12" v-if="ready">
    <v-row align="start" justify="center" v-if="!edit">
      <v-col cols="12" md="4" lg="3" xl="2" class="text-center mt-4">
        <fieldset class="pa-5" style="border: solid 1px #999">
          <legend>
            <h5><sup>Ticket category</sup></h5>
          </legend>
          <v-list dense class="transparent">
            <v-list-item-group
              v-model="category"
              color="primary"
              class="transparent"
              active-class="border"
            >
              <v-list-item
                v-for="(item, i) in categories"
                :key="i"
              >
                <!-- <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon> -->
                <v-list-item-content>
                  <v-list-item-title v-text="item"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-btn text dark class="primary mt-4 mx-auto" outlined @click="createNewTicket">Create a ticket</v-btn>
        </fieldset>
      </v-col>

      <v-col cols="12" md="9" lg="8" xl="6">

        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          class="transparent"
        >

          <template v-slot:top>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              label="Search"
              single-line
              dense
              hide-details
              append-icon="mdi-magnify"
              outlined
              class="transparent ml-12 mr-0 pb-12 mb-12"
            ></v-text-field>
          </template>

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
      </v-col>
    </v-row>
    <v-row v-else>
      <TicketDetails :ticket.sync="selectedTicket" :categories="categories" />
    </v-row>

    <!-- <v-card-title>
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
    </v-card-title> -->

    <!-- <span class="ml-12"><small>Total number of: {{ selectedServiceNumber }}</small></span> -->

    <!-- <v-dialog v-model="dialog"> -->
    <!-- <TicketDetails :ticketId="selectedTicketId" v-if="editTicket" /> -->
    <!-- </v-dialog> -->
  </v-card>
</template>

<script>

// import { ticketCategories } from '@/configs'

export default {
  name: 'Tickets',
  components: {
    TicketDetails: () => import('@/components/tickets/TicketDetails.vue')
  },
  data: () => ({
    ready: false,
    edit: false,
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
      if (!this.category || this.category === '...') return this.tickets
      return this.tickets
        .filter(ticket => !this.category || (ticket.category === this.category))
    }
  },
  methods: {
    getCategories (data) {
      console.log('CATEGORIES RESPONSE:\n', data)
      this.categories = data.result
    },
    getTickets (data) {
      console.log('TICKETS RESPONSE:\n', data)
      this.items = data.result.map((ticket) => {
        ticket.created = new Date(ticket.created).toISOString().slice(0, 10)
        ticket.modified = new Date(ticket.modified).toISOString().slice(0, 10)
        console.log(ticket)
        return ticket
      })

      this.ready = true
    },
    createNewTicket () {
      this.dialog = true
    },
    editItem (item) {
      console.log(item)
      this.selectedTicket = item
      this.edit = true
    }
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
