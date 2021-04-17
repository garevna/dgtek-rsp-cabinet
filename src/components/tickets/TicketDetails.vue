<template>
  <v-card flat class="transpareent mx-auto">
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-select
          :items="categories"
          v-model="ticket.category"
          label="Ticket category"
          outlined
          clearable
          dense
          color="#900"
          style="width: 270px"
        ></v-select>
      </v-col>

      <v-col cols="12" md="4">
        <v-select
          :items="severities"
          v-model="ticket.severity"
          label="Severity"
          outlined
          clearable
          dense
          color="#900"
          style="width: 270px"
        ></v-select>
      </v-col>

      <v-col cols="12" md="4">
        <v-select
          :items="priorities"
          v-model="ticket.priority"
          label="Priority"
          outlined
          clearable
          dense
          color="#900"
          style="width: 270px"
        ></v-select>
      </v-col>

    </v-row>

    <v-row>
      <v-col cols="3">
        <p>Subject</p>
      </v-col>
      <v-col cols="9">
        <v-text-field
          v-model="ticket.subject"
          label="Subject"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-text-field
        v-model="ticket.subject"
        label="Subject"
      />
    </v-row>
  </v-card>
</template>

<script>

import { ticketSchema } from '@/configs'

export default {
  name: 'EditTicket',
  props: ['ticket', 'categories'],
  data: () => ({
    newTicket: true,
    severities: ['Low', 'Medium', 'Hight'],
    priorities: ['Low', 'Medium', 'Hight'],
    severity: null,
    priority: null
  }),
  computed: {
    category: {
      get () {
        return this.item.categoty
      },
      set (val) {
        this.update('category', val)
      }
    },
    severity: {
      get () {
        return this.item.severity
      },
      set (val) {
        this.update('severity', val)
      }
    },
    priority: {
      get () {
        return this.item.priority
      },
      set (val) {
        this.update('priority', val)
      }
    },
    subject: {
      get () {
        return this.item.subject
      },
      set (val) {
        this.update('subject', val)
      }
    },
    details: {
      get () {
        return this.item.details
      },
      set (val) {
        this.update('details', val)
      }
    }
  },
  methods: {
    update (prop, value) {
      this.$emit('update:ticket', Object.assign({}, this.ticket, { [prop]: value }))
    },
    getData (data) {
      console.log(data)
      this.ticket = data
      this.ready = true
    }
  },
  mounted () {
    if (this.ticketId) {
      this.$on('ticket-data-received', this.getData)
      this.__getTicketById(this.ticketId)
    } else {
      this.newTicket = true
      this.ticket = ticketSchema
    }
  }
}
</script>
