<template>
  <v-row justify="center">
    <v-toolbar class="transparent" style="box-shadow: none">
      <v-autocomplete
        v-model="address"
        :loading="loading"
        :items="addresses"
        :search-input.sync="search"
        cache-items
        flat
        hide-no-data
        hide-details
        :placeholder="value"
        outlined
        dense
        @change="notSubmited"
        :style="{ background: color }"
      />

      <v-btn text @click="submit" color="primary">SUBMIT</v-btn>
    </v-toolbar>
  </v-row>
</template>

<script>
export default {
  name: 'GeoscapeAutocomplete',

  props: ['value'],

  data: () => ({
    address: '',
    variants: [],
    loading: false,
    search: null,
    google: '',
    formula: '',
    color: 'transparent'
  }),
  computed: {
    addresses () {
      return this.variants.map(item => item.address)
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.address = val
      }
    },
    search (val) {
      val && val !== this.select && this.getVariants(val)
    }
  },
  methods: {
    notSubmited () {
      this.color = '#9004'
    },
    submit () {
      this.color = 'transparent'
      this.$emit('update:value', this.address)
    },
    async getVariants (val) {
      if (val.length < 4) return
      this.loading = true
      this.variants = (await (await fetch(`https://api.psma.com.au/v1/predictive/address?maxNumberOfResults=20&query=${encodeURIComponent(val)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.VUE_APP_GEOSCAPE_KEY
        }
      })).json()).suggest
      this.loading = false
    }
  }
}
</script>

<style>
::placeholder {
  color: #555!important;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
 color: #555!important;
}

::-ms-input-placeholder { /* Microsoft Edge */
 color: #555!important;
}
</style>
