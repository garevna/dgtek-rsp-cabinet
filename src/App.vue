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

    <v-snackbar v-model="snackbar" :timeout="-1" color="primary" top>
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
    <confirmation-popup />
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

* {
  user-select: none;
}

.v-snack--top {
  padding-top: 280px !important;
  position: absolute !important;
}

.v-snack:not(.v-snack--absolute) {
  z-index: 4 !important;
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
}
</style>
