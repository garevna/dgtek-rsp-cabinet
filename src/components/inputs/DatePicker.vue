<template>
  <v-menu
    v-model="menu"
    close-on-content-click
    transition="scale-transition"
    max-width="290"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="localDate"
        :label="title"
        prepend-icon="mdi-calendar"
        readonly
        outlined
        dense
        hide-details
        color="primary"
        v-bind="attrs"
        v-on="on"
        style="max-width: 140px"
        class="mx-auto"
      />
    </template>
    <v-date-picker
      v-model="localDate"
      :min="localMin"
      :max="localMax"
      @input="menu = false"
      color="primary"
      :first-day-of-week="1"
      no-title
      scrollable
    />
  </v-menu>
</template>

<script>

export default {
  name: 'DatePicker',

  props: ['title', 'date', 'min', 'max'],

  data: () => ({
    menu: false,
    modal: false
  }),

  computed: {
    localMin () {
      return this.min
        ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString().slice(0, 10)
        : null
    },
    localMax () {
      return this.max
        ? typeof this.max === 'string'
          ? this.max
          : new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString().slice(0, 10)
        : null
    },
    localDate: {
      get () {
        return this.date || new Date().toISOString().substr(0, 10)
      },
      set (value) {
        this.$emit('update:date', value)
      }
    }
  }
}
</script>
