<template>
  <v-dialog v-model="opened" max-width="600px">
    <v-toolbar dense>
      <v-toolbar-title>
        <v-icon large class="mt-2 mr-4" color="primary"> mdi-cog-refresh </v-icon>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('update:dialog', false)" v-if="!disableClose">
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
          <p><small>Service: </small><b>{{ serviceData.serviceName }}</b></p>
        </v-card-text>
      </v-row>

      <v-row align="center" justify="center" v-if="!submited">
        <v-card-text class="text-center">
          <p><small>Current delivery status: </small><b>{{ serviceData.serviceStatus }}</b></p>
        </v-card-text>
      </v-row>

      <v-row align="center" justify="center" v-if="!submited">
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

      <v-row align="center" justify="center" v-if="submited">
        <v-card-text class="text-center">
          <p>
            <small>
              You service delivery update request has been sent.
            </small>
          </p>
        </v-card-text>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'ServiceDeliveryUpdate',

  props: ['dialog', 'address', 'serviceData', 'customerId'],

  data: () => ({
    status,
    disableClose: false,
    submited: false
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
      this.disableClose = true
      this.submited = true
      this.__sendServiceActivationRequest({ customerId: this.customerId, serviceId: this.serviceData.serviceId })
    },

    getResponse (updatedCustomerServices) {
      console.log('UPDATED CUSTOMER SERVICES:\n', updatedCustomerServices)
      // this.submited = true
      const service = updatedCustomerServices.find(item => item.id === this.serviceData.serviceId)
      this.$emit('update:serviceData', Object.assign({}, this.serviceData, {
        serviceStatus: service.status,
        serviceStatusModified: new Date(service.modified).toISOString().slice(0, 10)
      }))
      console.log('SERVICE DATA:', this.serviceData)
      this.disableClose = false
    },
    reset () {
      this.opened = false
    }
  },

  beforeDestroy () {
    this.$root.$off('service-activation-request-sent', this.getResponse)
  },

  mounted () {
    this.$root.$on('service-activation-request-sent', this.getResponse)
  }
}
</script>
