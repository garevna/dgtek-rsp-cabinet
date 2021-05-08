<template>
  <v-card flat class="transparent text-center" width="100%" v-if="addressData">
    <v-card-text text-center>
      <p>DGtek service at</p>
      <h5>{{ addressData.address }}</h5>
      <p>check results</p>
      <p>Status: {{ addressData.event }}</p>
      <p>Estimated service delivery time: {{ addressData.estimatedServiceDeliveryTime || 'Not defined' }}</p>

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

import { buildingStatusConfig } from '@/configs'

export default {
  name: 'ResultBar',
  props: [
    'addressData',
    'newCustomer',
    'selectCustomer',
    'services'
  ],
  computed: {
    newCustomerDisabled () {
      return buildingStatusConfig[this.addressData.event].newCustomerDisabled
    }
  }
}
</script>
