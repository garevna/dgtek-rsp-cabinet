<template>
  <v-dialog v-model="opened" max-width="600px">
    <v-toolbar dense>
      <v-toolbar-title>
        <v-icon large class="mt-2 mr-4" color="primary"> mdi-cog-refresh </v-icon>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('update:dialog', false)">
        <v-icon large> $close </v-icon>
      </v-btn>
    </v-toolbar>

    <v-card flat class="homefone pa-8">
      <v-row align="center" justify="center">
        <v-card-text class="text-center">
          <p style="color: #777">
            <b>{{ address }}</b>
          </p>
        </v-card-text>
      </v-row>

      <v-row align="center" justify="center">
        <v-card-text class="text-center">
          <p><small>Service: </small><b>{{ service.serviceName }}</b></p>
        </v-card-text>
      </v-row>

      <v-row align="center" justify="center">
        <v-card-text class="text-center">
          <p><small>Current delivery status: </small><b>{{ service.status }}</b></p>
        </v-card-text>
      </v-row>

      <v-row align="center" justify="center">
        <v-card-text class="text-center">
          <p>
            <small>
              Would you like to request an update on the service delivery status?
            </small>
          </p>
        </v-card-text>
        <v-card-text class="text-center">
          <v-btn outlined color="primary" class="mr-2" @click="sendRequest">Yes</v-btn>
          <v-btn outlined color="primary" @click="reset">No</v-btn>
        </v-card-text>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>

import { serviceController } from '@/controllers'

export default {
  name: 'ServiceDeliveryUpdate',

  props: ['dialog'],

  data: () => ({
    service: null,
    address: ''
  }),

  computed: {
    opened: {
      get () {
        return this.dialog
      },
      set (val) {
        this.$emit('update:dialog', val)
      }
    }
  },

  methods: {
    sendRequest () {
      this.__sendServiceActivationRequest(serviceController.getCustomerId(), this.service.id, this.getResponse)
    },

    getResponse (response) {
      console.log(response)
      this.$emit('update:dialog', false)
    },
    reset () {
      this.$emit('update:dialog', false)
    }
  },

  mounted () {
    this.address = serviceController.getCustomerAddress
    this.service = serviceController.getCurrentService()
  }
}
</script>
