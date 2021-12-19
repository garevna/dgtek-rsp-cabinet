<template>
  <v-select
    :items="available"
    v-model="localValue"
    :label="label"
    outlined
    dense
    hide-details
    color="#900"
    style="width: 270px"
  ></v-select>
</template>

<script>

export default {
  name: 'Selector',

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
