<template>
  <v-row justify="center">
    <v-card flat class="transparent mt-4" max-width="470" v-if="mapIsReady">
      <table>
        <tbody>
          <tr>
            <td width="420">
              <div class="bordered-item" v-if="!editAddress">
                {{ address }}
              </div>
              <SimpleGoogleAutocomplete v-else />
            </td>
            <td width="50">
              <v-btn v-if="!editAddress" outlined color="primary" @click="editAddress = true">
                Edit
              </v-btn>
              <v-btn v-else outlined color="primary" @click="submit">
                Submit
              </v-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </v-card>
  </v-row>
</template>

<script>

import 'simple-google-autocomplete'
import 'simple-google-autocomplete/dist/simple-google-autocomplete.css'

export default {
  name: 'SimpleAutocomplete',

  props: ['value', 'close'],

  data: () => ({
    mapIsReady: false,
    address: '',
    editAddress: false,
    variants: [],
    loading: false,
    search: null,
    google: '',
    color: 'transparent'
  }),

  computed: {
    addresses () {
      return this.variants.map(item => item.address)
    }
  },
  watch: {
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
      this.editAddress = false
    },
    catchGoogleAutocompleteEvent (event) {
      this.address = event.detail.address
    }
  },

  beforeDestroy () {
    window.removeEventListener('address-selected', this.catchGoogleAutocompleteEvent)

    this.$unloadGoogleMapsScripts()
  },

  created () {
    const script = document.getElementById('google-maps-script')

    if (!script) {
      window.google = null
      this.$loadGoogleMapsScript().then(response => { this.mapIsReady = true })
    }
  },

  mounted () {
    this.address = this.value
    window.addEventListener('address-selected', this.catchGoogleAutocompleteEvent)
  }
}
</script>
