<template>
  <v-app>
    <v-row>
      <v-app-bar app flat height="80" class="homefone">
        <v-card flat class="transparent text-left mt-4 ml-0" height="50">
          <v-img :src="require('@/assets/dgtek-logo.svg')" width="70" class="mr-8" />
        </v-card>
        <h3 class="main-header mt-5">DGtek provisioning RSP portal</h3>
      </v-app-bar>

      <v-progress-linear
        :active="progress"
        :indeterminate="progress"
        absolute
        top
        color="buttons"
        style="z-index: 8"
      ></v-progress-linear>

    </v-row>

    <v-row>
      <v-main class="main-content mt-8">
        <Home />
      </v-main>
    </v-row>

    <v-snackbar v-model="snackbar" timeout="5000" color="primary" top>
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="#fff"
          class="close-icon-snackbar"
          icon
          v-bind="attrs"
          @click="snackbar = false"
        >
          <v-icon large>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <error-message />
    <simple-message />
  </v-app>
</template>

<script>

import '@/sass/main.scss'
import 'dgtek-styles'

export default {
  name: 'App',
  components: {
    Home: () => import('@/views/Home.vue')
  },
  data: () => ({
    ready: false,
    progress: false,
    snackbar: false,
    message: 'Welcome to DGtek provisioning RSP portal'
  }),
  methods: {
    errorHandler (event) {
      const { errorType, errorMessage } = event.data
      this.$root.$emit('open-error-popup', { errorType, errorMessage })
    },
    messageHandler (event) {
      const { messageType, messageText } = event.data
      this.$root.$emit('open-message-popup', { messageType, messageText })
    }
  },
  mounted () {
    this.$root.$on('app-is-ready', function (event) {
      this.ready = true
    }.bind(this))
    this.$root.$on('progress-event', function (event) {
      this.progress = event.progress
    }.bind(this))

    this.__worker.addEventListener('message', function (event) {
      event.data.error && this.errorHandler(event)
      event.data.message && this.messageHandler(event)
    }.bind(this))
  }
}
</script>

<style>
body {
  overflow: hidden;
  margin-bottom: 88px;
}
* {
  user-select: none;
}
.main-header {
  font-weight: 900;
}
.field-set {
  border: solid 1px #ddd;
  padding: 32px 0;
  box-shadow: 0 0 4px #0003;
}
.field-set > legend {
  font-size: 14px;
  font-weight: bold;
  color: #881F1A!important;
  background: #FBFBFB;
  border: solid 1px #ddd!important;
  box-shadow: 0 0 4px #0003;
  border-radius: 4px;
  padding: 4px 16px;
}
@media screen and (max-width: 600px) {
  h3 {
    font-size: 20px;
  }
}
@media screen and (max-width: 420px) {
  h3 {
    font-size: 18px;
  }
}
</style>
