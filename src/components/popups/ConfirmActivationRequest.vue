<template>
  <v-dialog v-model="dialog" max-width="480px" class="pa-4">
    <v-card flat>
      <v-toolbar dense color="#900">
        <!-- <v-icon large class="mr-4"> mdi-hand-pointing-up </v-icon>
        <v-toolbar-title> Terms and conditions </v-toolbar-title> -->
        <v-spacer />
        <v-btn icon @click="dialog = false">
          <v-icon large> $close </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="text-center mt-10">
        <p>
          By clicking yes, you agree to abide by the terms and conditions stipulated in your MSA and that a $220 charge will be incurred if you cancel the order before activation.
        </p>
      </v-card-text>
      <v-card-text class="text-center">
        <p>Do you wish to proceed?</p>
      </v-card-text>
      <v-card-text class="text-center pb-8">
        <v-btn dark color="primary" @click="confirm" class="mr-4">Yes</v-btn>
        <v-btn outlined color="primary" @click="dialog = false">No</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'ConfirmActivationRequest',
  data: () => ({
    dialog: false
  }),
  methods: {
    confirm () {
      this.$root.$emit('operation-confirmed', this.source)
      this.dialog = false
    },
    open (data) {
      this.dialog = true
    }
  },
  beforeDestroy () {
    this.$root.$off('open-terms-and-conditions', this.open)
  },

  mounted () {
    this.$root.$on('open-terms-and-conditions', this.open)
  }
}
</script>
