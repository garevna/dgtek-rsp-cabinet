<template>
  <v-card flat class="transparent mx-auto py-5">
    <v-toolbar class="transparent" style="box-shadow: none">
      <v-toolbar-title>
        <v-icon>mdi-card-text-outline</v-icon>
        Ticket <b>{{ ticket.number }}</b>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="$emit('update:edit', false)">
        <v-icon large>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider class="mb-12" />
    <v-row justify="center">
      <v-col cols="12" md="4" v-if="categories">
        <Selector :value.sync="category" label="Ticket category" :available="categories" />
      </v-col>

      <v-col cols="12" md="4">
        <Selector :value.sync="severity" label="Severity" :available="severities" />
      </v-col>

      <v-col cols="12" md="4">
        <Selector :value.sync="priority" label="Priority" :available="priorities" />
      </v-col>

    </v-row>

    <v-row>
      <v-col cols="3" class="text-right">
        <p><small>Subject</small></p>
      </v-col>
      <v-col cols="9">
        <v-text-field
          v-model="subject"
          label="Subject"
          outlined
          dense
          hide-details
        />
      </v-col>
    </v-row>

    <v-row v-if="category === 'Customer issue' || category === 'Service issue'" class="mb-8">
      <table width="600" class="mx-auto">
        <tr>
          <td width="100"> Customer </td>
          <td width="420">
            <div v-if="value" class="customer-info mb-5 py-2 px-4">
              {{ customer.apartmentNumber }}/{{ customer.address }}
              <p><small>{{ customer.uniqueCode }}</small></p>
              <p><small>{{ customer.firstName }} {{ customer.lastName }}</small></p>
            </div>
            <v-combobox
              v-else
              :items="customersList"
              label="Customers"
              outlined
              dense
              color="primary"
              :value="value"
              @update:search-input="onInput"
              @change="selectCustomer"
              hide-details
            ></v-combobox>
          </td>
          <td>
            <v-btn text @click="change" v-if="value">
              <v-icon color="primary" class="mr-2">mdi-pencil</v-icon>
              Edit
            </v-btn>
          </td>
        </tr>
      </table>
    </v-row>

    <!-- <v-row> -->
    <v-card flat class="my-5 pa-4" width="100%" style="background: #eee; padding: 16px; border-radius: 4px;">
      <table width="100%">
        <thead>
          <tr v-if="ticket.history">
            <th width="400">
              <v-icon>mdi-transfer-down</v-icon>
              Incoming
            </th>
            <th width="400">
              <v-icon>mdi-transfer-up</v-icon>
              Outgoing
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item of ticket.history" :key="item.date">
            <td class="message">
              <span v-if="item.source === 'admin'">
                <small>{{ new Date(item.date).toISOString().slice(0, 10) }}</small><br>
                <small>{{ item.message }}</small>
              </span>
            </td>
            <td class="message">
              <span v-if="item.source !== 'admin'">
                <small>{{ new Date(item.date).toISOString().slice(0, 10) }}</small><br>
                <small>{{ item.message }}</small>
              </span>
            </td>
          </tr>
          <tr v-if="ticket.history">
            <td><hr class="my-5"></td>
            <td><hr class="my-5"></td>
          </tr>
          <tr>
            <td style="text-align: right">
              <small style="padding-right: 16px">Send message:</small>
            </td>
            <td>
              <span>
                <small>{{ new Date().toISOString().slice(0, 10) }}</small><br>
                <v-text-field v-model="newMessage" outlined />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </v-card>
    <!-- </v-row> -->

    <v-row>
      <v-col cols="12" md="6" class="text-right">
        <p><small><small>Contact number of the responsible person</small></small></p>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="contactPhone"
          label="Phone"
          outlined
          dense
          persistent-hint
          hint="* For urgent matters only"
        />
      </v-col>
    </v-row>

    <v-row class="mt-12">
      <v-btn outlined color="primary" @click="$emit('update:edit', false)">Back to tickets list</v-btn>
      <v-spacer />
      <v-btn dark class="primary mr-2" @click="closeTheTicket" v-if="!ticket._id">
        Archive the ticket
      </v-btn>
      <v-btn dark class="primary" @click="save">Update/save details</v-btn>
    </v-row>
  </v-card>
</template>

<script>

export default {
  name: 'TicketDetails',

  components: {
    Selector: () => import('@/components/tickets/Selector.vue')
  },

  props: ['ticket', 'categories', 'edit'],

  data: () => ({
    customersList: [],
    postCode: '',
    severities: ['Low', 'Medium', 'High'],
    priorities: ['Low', 'Medium', 'High'],
    customers: null,
    customersIds: null,
    customer: null,
    customerAddress: '',
    customerName: '',
    customerUniqueCode: '',
    value: '',
    newMessage: '',
    ready: false
  }),

  computed: {
    category: {
      get () {
        return this.ticket.category
      },
      set (val) {
        this.update('category', val)
      }
    },
    severity: {
      get () {
        return this.ticket.severity
      },
      set (val) {
        this.update('severity', val)
      }
    },
    priority: {
      get () {
        return this.ticket.priority
      },
      set (val) {
        this.update('priority', val)
      }
    },
    subject: {
      get () {
        return this.ticket.subject
      },
      set (val) {
        this.update('subject', val)
      }
    },
    details: {
      get () {
        return this.ticket.details
      },
      set (val) {
        this.update('details', val)
      }
    },
    customerId: {
      get () {
        return this.ticket.customerId
      },
      set (val) {
        this.update('customerId', val)
      }
    },
    contactPhone: {
      get () {
        return this.ticket.contactPhone
      },
      set (val) {
        this.update('contactPhone', val)
      }
    }
  },

  methods: {
    closeTheTicket () {
      console.log(this.ticket)
      this.__saveTicketData(this.ticket._id, Object.assign({}, this.ticket, { status: 'Archived' }), response => console.log(response))
      this.$emit('update:edit', false)
    },

    getCategories (data) {
      this.$emit('update:categories', data)
    },

    updateDetails ($event) {
      this.update('details', $event)
    },

    change () {
      this.value = ''
    },

    onInput (value) {
      value && value.length > 3 && this.getList(value)
    },

    selectCustomer (value) {
      this.customerAddress = value
      const index = this.customers.findIndex(item => item.address === value.split('/')[1])
      if (index !== -1) this.ticket.customerId = this.customers[index]._id
    },

    getList (partOfAddress) {
      partOfAddress && this.__getCustomersListForTicket(partOfAddress, this.fillCustomerList)
    },

    fillCustomerList (data) {
      this.customers = data
      if (!data.length) return
      this.customersList = data.map(customer => `${customer.apartmentNumber}/${customer.address}`)
      this.customersList = data.map(customer => `${customer.apartmentNumber}/${customer.address}`)
      this.customersIds = data.map(customer => customer._id)
    },

    updateTicketHistory () {
      if (this.newMessage) {
        this.ticket.history = Array.isArray(this.ticket.history) ? this.ticket.history : []
        this.ticket.history.push({
          date: Date.now(),
          source: 'partner',
          message: this.newMessage
        })
      }
    },

    postNewTicket () {
      this.updateTicketHistory()
      const result = JSON.parse(JSON.stringify(this.ticket))
      this.__postNewTicket(result, response => console.log('Ticket created', response))
    },

    updateTicket () {
      this.update('modified', Date.now())
      this.updateTicketHistory()
      this.__saveTicketData(this.ticket._id, this.ticket, () => console.log('Ticket updated'))
    },

    save () {
      this.ticket._id ? this.updateTicket() : this.postNewTicket()
      this.$emit('update:edit', false)
    },

    updateCustomerInfo (data) {
      const { apartmentNumber, address, firstName, lastName, uniqueCode, _id } = data
      this.customer = { apartmentNumber, address, firstName, lastName, uniqueCode, _id }
      this.value = address
    },

    update (prop, value) {
      this.$emit('update:ticket', Object.assign({}, this.ticket, { [prop]: value }))
    }
  },

  mounted () {
    if (this.ticket && this.ticket.customerId) this.__getCustomerData(this.ticket.customerId, this.updateCustomerInfo)
    else this.$emit('update:edit', true)

    if (!this.categories || !this.categories.length) {
      this.__getTicketCategories(this.getCategories)
    }
  }
}
</script>

<style>
.v-label {
  font-size: 14px!important;
}
</style>

<style scoped>
.customer-info {
  border: solid 1px #ddd;
  border-radius: 4px;
  padding: 8px 16px;
  margin-bottom: 16px;
}

.v-select__selection--comma {
  font-size: 14px;
}

td.message {
  border: solid 1px #ddd;
  border-radius: 4px;
  padding: 4px 8px;
}
</style>
