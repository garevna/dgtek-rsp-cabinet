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
        v-if="addressData.buildingId"
        outlined
        color="buttons"
        class="mx-2"
        @click="$emit('update:newCustomer', true)"
        :disabled="newCustomerDisabled"
      >
        Add new customer
      </v-btn>

      <!-- <v-btn
        v-else
        outlined
        color="buttons"
        class="mx-2"
        @click="createNewBuilding"
        :disabled="newCustomerDisabled"
      >
        Add new building
      </v-btn> -->

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

import { buildingDetailsHandler, customerHandler } from '@/helpers/data-handlers'

export default {
  name: 'ResultBar',

  props: ['addressData', 'newCustomer', 'selectCustomer', 'services'],

  data: () => ({
    worker: window[Symbol.for('map.worker')],
    statusToDisplay: '',
    estimatedServiceDeliveryTime: '',
    newCustomerDisabled: false
  }),

  watch: {
    addressData: {
      deep: true,
      immediate: true,
      handler (data) {
        this.__getEstimatedServiceDeliveryTime(data.status, this.getSettings)
      }
    }
  },

  methods: {
    createNewBuilding () {
      this.worker.createNewBuilding(buildingDetailsHandler('to-save'), this.getNewBuildingId)
    },

    getNewBuildingId (buildingId) {
      customerHandler(Object.assing(customerHandler(), { buildingId }))
    },

    getSettings (data) {
      const { toDisplay, statusToDisplay, value, estimatedServiceDeliveryTime, newCustomerDisabled } = data

      this.statusToDisplay = toDisplay || statusToDisplay || this.addressData.event
      this.estimatedServiceDeliveryTime = estimatedServiceDeliveryTime || value
      this.newCustomerDisabled = newCustomerDisabled

      !this.addressData.buildingId && this.$emit('update:addressData', Object.assign(this.addressData, { estimatedServiceDeliveryTime: this.estimatedServiceDeliveryTime }))
    }
  }
}
</script>
