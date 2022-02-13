<template>
  <v-card flat class="transparent mx-auto">
    <v-row class="mt-2" justify="center" align="center">
      <v-col>
        <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="localDate"
          persistent
          width="320px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="localDate"
              :label="title"
              prepend-inner-icon="mdi-calendar-search"
              readonly
              outlined
              dense
              hide-details
              v-bind="attrs"
              v-on="on"
              color="primary"
              style="max-width: 180px; display: inline-block"
              @click:append-outer="$emit('update:action', true)"
            ></v-text-field>
          </template>

          <v-date-picker
            v-model="localDate"
            scrollable
            no-title
            color="primary"
            class="pt-4"
            :min="localMin"
            :max="localMax"
            :first-day-of-week="1"
          >

            <v-spacer />

            <v-btn text color="primary" @click="modal = false">
              Cancel
            </v-btn>

            <v-btn text color="primary" @click="$refs.dialog.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>
    </v-row>
  </v-card>
  <!-- <v-menu
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
  </v-menu> -->
</template>

<script>

export default {
  name: 'DatePicker',

  props: ['title', 'date', 'min', 'max'],

  data: () => ({
    // menu: false,
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
