<template>
  <v-card flat class="transparent" height="240" v-if="messages" style="overflow-y: auto">
    <div v-for="message of messages" :key="message._id">
      <h5>
        <sup>
          <small>
            {{ new Date(message.modified).toISOString().slice(0, 10) }} | {{ message.subject }}
          </small>
        </sup>
      </h5>

      <div v-if="message.type === 'update-company-details'">
        <li
          v-for="item of message.fields"
          :key="item.field"
          @click.stop="showItem(item)"
        >
          <small>{{ item.title }}</small>
        </li>
      </div>

      <p v-if="message.type !== 'update-company-details'">
        <small v-html="message.content.split('\n').join('<br>')"></small>
      </p>
      <v-divider class="my-4" />
    </div>
  </v-card>
</template>

<script>

import { messagesHandler } from '@/helpers/data-handlers'

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
    showItem (item) {
      this.$root.$emit('go-to-company-details')
    }
  },

  beforeDestroy () {
    this.$root.$off('refreshing-finished', this.getMessages)
  },

  beforeMount () {
    this.$root.$on('refreshing-finished', this.getMessages)
  },

  mounted () {
    this.messages = this.messages.length ? this.messages : messagesHandler()
  }
}
</script>

<style>

li:hover {
  color: #900;
  cursor: pointer;
}
</style>
