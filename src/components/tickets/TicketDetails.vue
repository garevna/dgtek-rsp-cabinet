<template>
  <v-card flat class="transparent mx-auto py-5">
    <v-toolbar class="transparent" style="box-shadow: none">
      <v-toolbar-title>
        <v-icon>mdi-card-text-outline</v-icon>
        Ticket
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="$emit('update:edit', false)">
        <v-icon large>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider class="mb-12" />
    <v-row justify="center">
      <v-col cols="12" md="4" v-if="categories">
        <v-select
          :items="categories"
          v-model="category"
          label="Ticket category"
          outlined
          dense
          hide-details
          color="#900"
          style="width: 270px"
        ></v-select>
      </v-col>

      <v-col cols="12" md="4">
        <v-select
          :items="severities"
          v-model="severity"
          label="Severity"
          outlined
          dense
          hide-details
          color="#900"
          style="width: 270px"
        ></v-select>
      </v-col>

      <v-col cols="12" md="4">
        <v-select
          :items="priorities"
          v-model="priority"
          label="Priority"
          outlined
          dense
          hide-details
          color="#900"
          style="width: 270px"
        ></v-select>
      </v-col>

    </v-row>

    <v-row>
      <v-col cols="3" class="text-right">
        <p>Subject</p>
      </v-col>
      <v-col cols="9">
        <v-text-field
          v-model="subject"
          label="Subject"
          outlined
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

    <v-row>
      <v-textarea
        v-model="details"
        label="Details"
        outlined
        hide-details
        @input="updateDetails($event)"
      />
    </v-row>

    <v-row>
      <v-col cols="12" md="6" class="text-right">
        <p><small>Contact number of the responsible person</small></p>
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

    <!-- <v-row v-if="ticket.history.length > 0">
      <v-text-field v-for="item of ticket.history" :key="item.modified">

      </v-text-field>
    </v-row> -->

    <v-row class="mt-12">
      <v-btn outlined color="primary" @click="$emit('update:edit', false)">Back to tickets list</v-btn>
      <v-spacer />
      <v-btn dark class="primary mr-2" @click="closeTheTicket">Archive the ticket</v-btn>
      <v-btn dark class="primary" @click="save">Update/save details</v-btn>
    </v-row>
  </v-card>
</template>

<script>

export default {
  name: 'TicketDetails',
  // props: ['ticket', 'newTicket', 'edit'],
  props: ['ticket', 'categories', 'newTicket', 'edit'],
  data: () => ({
    customersList: [],
    postCode: '',
    severities: ['Low', 'Medium', 'Hight'],
    priorities: ['Low', 'Medium', 'Hight'],
    customers: null,
    customersIds: null,
    customer: null,
    customerAddress: '',
    customerName: '',
    customerUniqueCode: '',
    value: '',
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
      this.__saveTicketData(this.ticket._id, Object.assign({}, this.ticket, { status: 'Archived' }))
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
      partOfAddress && this.__getCustomersListForTicket(partOfAddress)
    },

    fillCustomerList (data) {
      this.customers = data
      if (!data.length) return
      this.customersList = data.map(customer => `${customer.apartmentNumber}/${customer.address}`)
      this.customersList = data.map(customer => `${customer.apartmentNumber}/${customer.address}`)
      this.customersIds = data.map(customer => customer._id)
    },

    postNewTicket () {
      this.update('created', Date.now())
      this.update('modified', Date.now())
      const result = JSON.parse(JSON.stringify(this.ticket))
      this.__postNewTicket(result)
    },

    updateTicket () {
      this.update('modified', Date.now())
      this.__saveTicketData(this.ticket._id, this.ticket)
    },

    save () {
      this.newTicket ? this.postNewTicket() : this.updateTicket()
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

  beforeDestroy () {
    this.$root.$off('categories-received', this.getCategories)
    this.$root.$off('customers-list-for-ticket-received', this.fillCustomerList)
    this.$root.$off('customer-data-received', this.updateCustomerInfo)
  },

  mounted () {
    if (this.ticket && this.ticket.customerId) {
      this.__getCustomerData(this.ticket.customerId)
    } else {
      this.$emit('update:edit', true)
    }
    if (!this.categories || !this.categories.length) {
      this.$root.$on('categories-received', this.getCategories)
      this.__getCategories()
    }
    this.$root.$on('customers-list-for-ticket-received', this.fillCustomerList)
    this.$root.$on('customer-data-received', this.updateCustomerInfo)
  }
}
</script>

<style scoped>
.customer-info {
  border: solid 1px #ddd;
  border-radius: 4px;
  padding: 8px 16px;
  margin-bottom: 16px;
}
</style>
