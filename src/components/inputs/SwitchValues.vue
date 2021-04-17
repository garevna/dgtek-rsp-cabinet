<template>
  <v-switch
    v-model="localValue"
    inset
    :hint="`${states[0]}/${states[1]}`"
    persistent-hint
    :label="`${localValue ? states[1] : states[0]}`"
  >
  </v-switch>
</template>

<style>
.v-input--switch--inset .v-input--switch__track {
  width: 72px !important;
}
.v-application--is-ltr .v-input--switch--inset.v-input--is-dirty .v-input--selection-controls__ripple,
.v-application--is-ltr .v-input--switch--inset.v-input--is-dirty .v-input--switch__thumb {
  transform: translate(44px) !important;
}
.v-input--selection-controls .v-input__slot > .v-label, .v-input--selection-controls .v-radio > .v-label {
  margin-left: 16px!important;
}
</style>

<script>

export default {
  name: 'SwitchValue',
  props: ['label', 'value', 'states'],
  // data: () => ({
  //   switchValue: false
  // }),
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
