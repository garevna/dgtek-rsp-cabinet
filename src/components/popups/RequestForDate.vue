<template>
  <v-dialog v-model="dialog" max-width="600px" class="pa-4">
    <v-card flat>
      <v-toolbar dense color="#900">
        <v-icon class="mr-4"> mdi-account-box </v-icon>
        <v-toolbar-title>
          <h6>{{ header }}</h6>
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon class="transparent" @click="dialog = false">
          <v-icon large color="#777"> $close </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="text-center mt-10">
        <h5><small>{{ title }}</small></h5>
      </v-card-text>
      <v-card-text class="text-center">
        <p>{{ message }}</p>
      </v-card-text>

      <v-row justify="center" class="mx-auto mb-8">
        <DatePicker :title="action" :date.sync="localDate" />
      </v-row>

      <v-card-text class="text-center pb-8">
        <v-btn v-if="localDate" dark color="primary" @click="confirm" class="mr-4">
          Confirm
        </v-btn>
        <v-btn outlined color="primary" @click="dialog = false">
          Cancel
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'RequestForDate',

  components: {
    DatePicker: () => import('@/components/inputs/DatePicker.vue')
  },

  data: () => ({
    header: '',
    title: '',
    message: '',
    action: '',
    dialog: false,
    localDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString().slice(0, 10)
  }),

  watch: {
    localDate (val) {
      console.log(val)
    }
  },

  methods: {
    confirm () {
      this.$root.$emit('operation-confirmed', { action: this.action, date: this.localDate })
      this.dialog = false
    },

    open (data) {
      this.header = data.header || 'Confirm operation'
      this.title = data.title || 'Select the date to change connection status'
      this.message = data.message || 'Do you wish to proceed?'
      this.action = data.action || null
      this.dialog = true
    }
  },
  beforeDestroy () {
    this.$root.$off('open-date-selection-popup', this.open)
  },

  mounted () {
    this.$root.$on('open-date-selection-popup', this.open)
  }
}
</script>
