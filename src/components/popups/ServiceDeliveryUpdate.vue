<template>
  <v-dialog v-model="dialog" max-width="480px" class="pa-4">
    <v-card flat class="homefone">
      <v-toolbar dark dense color="primary">
        <v-icon class="mr-4"> mdi-account-reactivate </v-icon>
        <v-toolbar-title> Confirmation </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon large> $close </v-icon>
        </v-btn>
      </v-toolbar>
      <v-row align="center" justify="center">
        <v-card-text class="text-center">
          <h5>{{ message }}</h5>
        </v-card-text>
        <v-card-text class="text-center" v-if="!submitted">
          <v-btn @click="submit">Yes</v-btn>
          <v-btn @click="reset">No</v-btn>
        </v-card-text>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'ServiceDeliveryUpdate',
  data: () => ({
    opened: false,
    message: '',
    submitted: false
  }),
  computed: {
    dialog: {
      get () {
        return this.opened
      },
      set (val) {
        !val && this.resetMessage()
      }
    }
  },
  methods: {
    reset () {
      this.message = ''
      this.opened = false
    },
    submit () {
      this.message = 'You service delivery update request has been sent.'
      this.submitted = true
      this.$root.$emit('service-delivery-update')
    }
  },
  mounted () {
    this.$root.$on('open-confirmation-popup', function (event) {
      this.opened = true
      this.submitted = false
      this.message = 'Would you like to request an update on the service delivery status?'
    }.bind(this))
  }
}
</script>
