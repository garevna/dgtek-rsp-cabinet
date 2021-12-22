<template>
  <v-row>
    <v-select
      :items="customersList"
      label="Customer address"
      v-model="customer"
      item-text="address"
      item-value="customerId"
      outlined
      dense
      clearable
      :menu-props="{ bottom: true, offsetY: true }"
      style="width: 480px"
    ></v-select>

    <v-select
      :items="priorities"
      label="Priority"
      v-model="priority"
      outlined
      clearable
      dense
      :menu-props="{ bottom: true, offsetY: true }"
      style="max-width: 160px"
    ></v-select>

    <v-select
      :items="severities"
      label="Severity"
      v-model="severity"
      outlined
      dense
      clearable
      :menu-props="{ bottom: true, offsetY: true }"
      style="max-width: 160px"
    ></v-select>
  </v-row>
</template>

<script>

export default {
  name: 'Filters',

  props: ['label', 'value', 'available'],

  computed: {
    localValue: {
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
