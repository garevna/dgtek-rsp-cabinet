<template>
  <v-dialog v-model="dialog" max-width="480px" class="pa-4">
    <v-card flat>
      <v-toolbar dense color="buttons">
        <v-icon class="mr-4" :color="warning ? 'warning' : 'error'" large> $error </v-icon>
        <v-toolbar-title v-if="!warning"> Error </v-toolbar-title>
        <v-toolbar-title v-else> Warning </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon large> $close </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="text-center mt-10">
        <h4>{{ errorType || 'Unknown error' }}</h4>
      </v-card-text>
      <v-card-text class="text-center">
        <p>{{ errorMessage || 'Something went wrong...' }}</p>
      </v-card-text>
      <v-card-text class="text-center">
        <v-btn outlined @click="dialog = false">OK</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'ErrorMessage',

  data: () => ({
    error: false,
    warning: false,
    errorType: '',
    errorMessage: ''
  }),

  computed: {
    dialog: {
      get () {
        return this.error || this.warning
      },
      set (val) {
        !val && this.resetError()
      }
    }
  },
  methods: {
    resetError () {
      this.error = false
      this.warning = false
      this.errorType = ''
      this.errorMessage = ''
    }
  },
  mounted () {
    this.$root.$on('open-error-popup', function (event) {
      this.error = !event.warning
      this.warning = event.warning
      this.errorType = event.errorType || event.messageType
      this.errorMessage = event.errorMessage || event.messageText
    }.bind(this))
  }
}
</script>
