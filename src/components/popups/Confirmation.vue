<template>
  <v-dialog v-model="dialog" max-width="600px" class="pa-4">
    <v-card flat>
      <v-toolbar dense color="#900">
        <v-icon class="mr-4"> mdi-account-box </v-icon>
        <v-toolbar-title>
          <h6>{{ header }}</h6>
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon class="transparent" @click="dialog = false">
          <v-icon large color="#777"> $close </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="text-center mt-10">
        <h5><small>{{ title }}</small></h5>
      </v-card-text>
      <v-card-text class="text-center">
        <p>{{ message }}</p>
      </v-card-text>
      <v-card-text class="text-center pb-8">
        <v-btn dark color="primary" @click="confirm" class="mr-4">Confirm</v-btn>
        <v-btn outlined color="primary" @click="dialog = false">Cancel</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'Confirmation',

  data: () => ({
    header: '',
    title: '',
    message: '',
    action: '',
    dialog: false
  }),

  methods: {
    confirm () {
      this.$root.$emit('operation-confirmed', this.action)
      this.dialog = false
    },

    open (data) {
      console.log('CONFIRMATION DIALOG OPENED WITH DATA:\n', data)
      this.header = data.header || 'Confirm operation'
      this.title = data.title || 'By clicking yes, you agree to abide by the terms and conditions stipulated in your MSA and that a $220 charge will be incurred if you cancel the order before activation.'
      this.message = data.message || 'Do you wish to proceed?'
      this.action = data.action || null
      this.dialog = true
    }
  },
  beforeDestroy () {
    this.$root.$off('open-confirmation-popup', this.open)
  },

  mounted () {
    this.$root.$on('open-confirmation-popup', this.open)
  }
}
</script>
