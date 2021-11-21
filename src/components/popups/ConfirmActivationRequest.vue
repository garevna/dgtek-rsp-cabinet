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

import { serviceController } from '@/controllers'

export default {
  name: 'ConfirmActivationRequest',

  props: ['open'],

  computed: {
    dialog: {
      get () {
        return this.open
      },
      set (val) {
        this.$emit('update:open', val)
      }
    }
  },

  methods: {
    confirm () {
      this.__sendServiceActivationRequest(serviceController.getCustomerId(), serviceController.getCurrentService().id, this.activationSuccess)
    },

    activationSuccess (data) {
      console.log('ACTIVATION REQUEST RESPONSE:\n', data)
      if (!data) return

      const { status, log, modified } = data[0]

      serviceController.updateCurrentService({ status, log, modified })

      this.dialog = false
    }
  }
}
</script>
