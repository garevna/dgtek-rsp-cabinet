<template>
  <v-dialog v-model="dialog" max-width="480px" class="pa-4">
    <v-card flat>
      <v-toolbar dark dense color="buttons">
        <v-icon class="mr-4"> $error </v-icon>
        <v-toolbar-title> Error </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon large> $close </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="text-center mt-10">
        <h4>{{ errorType || 'Unknown error type' }}</h4>
      </v-card-text>
      <v-card-text class="text-center">
        <p>{{ errorMessage || 'Unknown Error' }}</p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'ErrorMessage',
  data: () => ({
    error: false,
    errorType: '',
    errorMessage: ''
  }),
  computed: {
    dialog: {
      get () {
        return this.error
      },
      set (val) {
        !val && this.resetError()
      }
    }
  },
  methods: {
    resetError () {
      this.error = false
      this.errorType = ''
      this.errorMessage = ''
    }
  },
  mounted () {
    this.$root.$on('open-error-popup', function (event) {
      this.error = true
      this.errorType = event.errorType
      this.errorMessage = event.errorMessage
    }.bind(this))
  }
}
</script>
