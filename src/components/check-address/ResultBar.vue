<template>
  <v-card flat class="transparent text-center" width="100%" v-if="addressData">
    <v-card-text text-center>
      <p>DGtek service at</p>
      <h5>{{ addressData.address }}</h5>
      <p>check results</p>
      <p>Status: {{ statusToDisplay }}</p>
      <p>Estimated service delivery time: {{ addressData.estimatedServiceDeliveryTime || estimatedServiceDeliveryTime }}</p>

    </v-card-text>

    <v-card-text text-center v-if="addressData.address">
      <v-btn
        outlined
        color="buttons"
        class="mx-2"
        @click="$emit('update:newCustomer', true)"
        :disabled="newCustomerDisabled"
      >
        Add new customer
      </v-btn>

      <v-btn
        outlined
        color="buttons"
        class="mx-2"
        @click="$emit('update:selectCustomer', true)"
      >
        Select existing customer
      </v-btn>

      <v-btn
        outlined
        color="buttons"
        class="mx-2"
        @click="$emit('update:services', true)"
      >
        Check the available services
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: 'ResultBar',

  props: [
    'addressData',
    'newCustomer',
    'selectCustomer',
    'services'
  ],

  data: () => ({
    statusToDisplay: '',
    estimatedServiceDeliveryTime: '',
    newCustomerDisabled: false
  }),

  watch: {
    addressData: {
      deep: true,
      immediate: true,
      handler (data) {
        this.__getEstimatedServiceDeliveryTime(data.status)
      }
    }
  },

  methods: {
    getSettings (data) {
      const { toDisplay, statusToDisplay, value, estimatedServiceDeliveryTime, newCustomerDisabled } = data

      this.statusToDisplay = toDisplay || statusToDisplay
      this.estimatedServiceDeliveryTime = estimatedServiceDeliveryTime || value
      this.newCustomerDisabled = newCustomerDisabled

      !this.addressData.buildingId && this.$emit('update:addressData', Object.assign(this.addressData, { estimatedServiceDeliveryTime: this.estimatedServiceDeliveryTime }))
    }
  },

  beforeDestroy () {
    this.$root.$off('settings-data-received', this.getSettings)
  },

  mounted () {
    this.$root.$on('settings-data-received', this.getSettings)
  }
}
</script>
