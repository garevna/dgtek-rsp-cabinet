<template>
  <v-card flat class="transparent" height="240" v-if="messages" style="overflow-y: auto">
    <div v-for="message of messages" :key="message._id">
      <div>
        <sup>
          <small>
            {{ new Date(message.modified).toISOString().slice(0, 10) }}
          </small>
        </sup>
      </div>
      <h5>
        <sup>
          <small>
            {{ message.subject }}
          </small>
        </sup>
      </h5>

      <div v-if="message.type === 'update-customer-details'">
        <li
          v-for="item of message.fields"
          :key="item.field"
          @click.stop="showItem(message, item)"
        >
          <small>{{ item.title }}</small>
        </li>
      </div>

      <div v-if="message.type === 'update-company-details'">
        <li
          v-for="item of message.fields"
          :key="`${item.section}-${item.field}`"
          @click.stop="showItem(message, item)"
        >
          <small>{{ item.sectionTitle }}: {{ item.title }}</small>
        </li>
      </div>
      <v-divider class="my-4" />
    </div>
  </v-card>
</template>

<script>

import { messagesHandler, partnerUniqueCodeHandler } from '@/helpers/data-handlers'

export default {
  name: 'Messages',

  data: () => ({
    messages: []
  }),

  methods: {
    getMessages (data) {
      messagesHandler(data)
      this.messages = messagesHandler()
    },

    showItem (message, item) {
      if (message.type === 'update-company-details') this.$root.$emit('go-to-company-details')
      if (message.type === 'update-customer-details') {
        this.$root.$emit('show-snackbar', message.content)
        this.$root.$emit('go-to-customer-details', message.customerId)
      }
    },

    refreshMessages () {
      this.__refreshMessages(this.getMessages)
      setTimeout(this.refreshMessages, 30000)
    }
  },

  beforeDestroy () {
    this.$root.$off('refreshing-finished', this.getMessages)
  },

  beforeMount () {
    this.$root.$on('refreshing-finished', this.getMessages)
  },

  mounted () {
    if (partnerUniqueCodeHandler()) this.refreshMessages()
  }
}
</script>

<style>

li:hover {
  color: #900;
  cursor: pointer;
}
</style>
