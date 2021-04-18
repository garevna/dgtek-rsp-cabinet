<template>
  <v-switch
    v-model="switcher"
    inset
    :hint="hint"
    persistent-hint
    :label="label"
  >
  </v-switch>
</template>

<script>

export default {
  name: 'Switch',
  props: ['label', 'value', 'states'],
  data: () => ({
    switcher: false
  }),
  computed: {
    hint () {
      return `${this.states[0]}/${this.states[1]}`
    },
    // label () {
    //   return `${this.switcher ? this.states[1] : this.states[0]}`
    // },
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

<style>
/* .v-input--switch--inset .v-input--switch__track {
  width: 72px !important;
}
.v-application--is-ltr .v-input--switch--inset.v-input--is-dirty .v-input--selection-controls__ripple,
.v-application--is-ltr .v-input--switch--inset.v-input--is-dirty .v-input--switch__thumb {
  transform: translate(44px) !important;
}
.v-application--is-ltr .v-input--switch--inset.v-input--is-dirty .v-input--selection-controls__ripple,
.v-application--is-ltr .v-input--switch--inset.v-input--is-dirty .v-input--switch__thumb {
    transform: translate(42px)!important;
}
.v-input--selection-controls .v-input__slot > .v-label, .v-input--selection-controls .v-radio > .v-label {
  margin-left: 16px!important;
} */
</style>
