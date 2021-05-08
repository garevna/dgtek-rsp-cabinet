<template>
  <v-dialog v-model="opened" max-width="600px">
    <v-toolbar dense>
      <v-toolbar-title>
        <v-icon large class="mt-2 mr-4" color="primary"> mdi-cog-refresh </v-icon>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('update:dialog', false)">
        <v-icon large> $close </v-icon>
      </v-btn>
    </v-toolbar>

    <v-card flat class="homefone pa-8">
      <v-row align="center" justify="center">
        <v-card-text class="text-center">
          <p style="color: #777">
            <b>{{ address }}</b>
          </p>
        </v-card-text>
      </v-row>

      <v-row align="center" justify="center">
        <v-card-text class="text-center">
          <p><small>Service: </small><b>{{ serviceData.name }}</b></p>
        </v-card-text>
      </v-row>

      <v-row align="center" justify="center" v-if="!submitted">
        <v-card-text class="text-center">
          <p><small>Current status: </small><b>{{ serviceData.status }}</b></p>
        </v-card-text>
      </v-row>

      <v-row align="center" justify="center" v-if="!submitted">
        <v-col cols="4">
          <p class="text-right">
            <small>Change to:</small>
          </p>
        </v-col>
        <v-col cols="7">
          <v-select
            :items="statuses"
            v-model="status"
            label="Service status"
            outlined
            dense
            color="primary"
            style="width: 270px"
          ></v-select>
        </v-col>
      </v-row>

      <v-row align="center" justify="center" v-if="!submitted">
        <v-card-text class="text-center">
          <p>
            <small>
              Would you like to request an update on the service delivery status?
            </small>
          </p>
        </v-card-text>
        <v-card-text class="text-center">
          <v-btn outlined color="primary" class="mr-2" @click="submit">Yes</v-btn>
          <v-btn outlined color="primary" @click="reset">No</v-btn>
        </v-card-text>
      </v-row>

      <v-row align="center" justify="center" v-if="submitted">
        <v-card-text class="text-center">
          <p>
            <small>
              You service delivery update request has been sent.
            </small>
          </p>
        </v-card-text>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'ServiceDeliveryUpdate',
  props: ['dialog', 'address', 'serviceData'],
  data: () => ({
    message: 'Would you like to request an update on the service delivery status?',
    submitted: false,
    statuses: ['Active', 'Not connected', 'Awaiting for connection'],
    status
  }),
  computed: {
    opened: {
      get () {
        return this.dialog
      },
      set (val) {
        this.$emit('update:dialog', val)
      }
    }
  },
  methods: {
    reset () {
      this.opened = false
    },
    submit () {
      this.submitted = true
      // this.$root.$emit('service-delivery-update')
    }
  },
  mounted () {
    // this.$root.$on('open-confirmation-popup', function (event) {
    //   this.opened = true
    //   this.submitted = false
    // }.bind(this))
  }
}
</script>
