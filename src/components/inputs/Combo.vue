<template>
  <v-card flat>
    <v-card-text>
      <v-combobox
        v-model="localvalue"
        :items="available"
        :label="label"
        outlined
        dense
      ></v-combobox>
    </v-card-text>
  </v-card>
</template>

<script>

import { } from './'

export default {
  name: 'Combo',
  props: ['label', 'value', 'available'],

  data: () => ({
    select: null
  }),

  computed: {
    localvalue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('update:value', val)
      }
    }
  }
}
</script>
