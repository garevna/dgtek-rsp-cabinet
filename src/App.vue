<template>
  <v-app>
    <v-app-bar app flat height="100" class="main-app-bar-header homefone">
      <v-card flat class="homefone text-left mt-8 ml-4" height="100">
        <v-img :src="require('@/assets/dgtek-logo.svg')" width="70" class="mr-8" />
      </v-card>
      <h3 class="main-header">DGtek provisioning partner's portal</h3>

      <v-progress-linear
        :active="progress"
        :indeterminate="progress"
        absolute
        top
        color="buttons"
        style="top: 80px; z-index: 11"
      ></v-progress-linear>
    </v-app-bar>

    <v-row>
      <v-main class="main-content mt-0">
        <Home />
      </v-main>
    </v-row>

    <v-snackbar v-model="snackbar" right class="mr-2" :timeout="-1" color="#9009" top style="position: fixed !important">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="#fff"
          class="transparent close-icon-snackbar"
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
    <confirmation-popup />
  </v-app>
</template>

<script>

import '@/sass/main.scss'
import 'dgtek-styles'

import Home from '@/views/Home.vue'

export default {
  name: 'App',

  components: {
    Home
  },

  data: () => ({
    ready: false,
    progress: false,
    snackbar: false,
    message: 'Welcome to DGtek provisioning RSP portal.'
  }),

  methods: {
    showSnackbar (message) {
      this.message = message
      this.snackbar = true
    },
    hideSnackbar () {
      this.snackbar = false
    }
  },

  mounted () {
    this.$root.$on('show-snackbar', this.showSnackbar)
    this.$root.$on('hide-snackbar', this.hideSnackbar)

    if (this.$apiHost() === 'https://portal.staging.dgtek.net') this.$root.$emit('show-snackbar', 'Staging release. You are at testing mode now.')

    this.$root.$on('progress-event', function (event) {
      this.progress = event.progress
    }.bind(this))
  },

  errorCaptured (err, instance, info) {
    console.warn('ERROR:\n', err, info, instance.$options._componentTag)
    return false
  }
}
</script>

<style>
body {
  overflow: hidden;
  margin-bottom: 88px;
  background: #fbfbfb !important;
}

/* * {
  user-select: none;
} */

input, textarea {
  user-select: text;
  -webkit-user-select: text;
}

.v-snack--top {
  position: absolute !important;
}

.v-snack:not(.v-snack--absolute) {
  z-index: 20 !important;
  margin-top: -88px !important;
}

.v-toolbar__content, .v-toolbar__extension {
  background: #fbfbfb!important;
}

.v-sheet.v-toolbar:not(.v-sheet--outlined) {
  background: transparent!important;
  box-shadow: none!important;
}

.main-app-bar-header {
  position: fixed;
  height: 100px;
  margin-top: 32px;
  left: 0px;
  right: 0px;
  z-index: 15;
  background: #fbfbfb!important;
}

.main-header {
  font-weight: 900;
  margin-top: -32px;
}

.v-stepper__wrapper {
  padding-top: 16px;
}

.theme--light.v-data-table {
  background-color: transparent!important;
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

.theme--light.v-btn.v-btn--disabled {
  color: #888 !important;
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
  h4 {
    font-size: 16px;
  }
  h5 {
    font-size: 14px;
  }
}
</style>
