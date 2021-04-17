<template>
  <v-card flat>
    <!-- <v-card-text> -->
      <!-- <span v-if="search">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
        </svg>
      </span> -->
      <input
        id="autocompleteAddress"
        class="input-field"
        :style="{ borderColor: borderColor }"
        v-model="localAddress"
        placeholder="Address"
      />
      <!-- <v-card-text>
        <p style="color: #09b" v-if="address">{{ address }}</p>
        <p style="color: #f50" v-if="message">{{ message }}</p>
      </v-card-text>
    </v-card-text> -->
  </v-card>
</template>

<script>

export default {
  name: 'InputWithAutocomplete',
  props: ['address', 'properties'],
  data () {
    return {
      borderColor: '#bbb',
      message: ''
    }
  },
  computed: {
    localAddress: {
      get () {
        return this.address
      },
      set (val) {
        this.$emit('update:address', val)
      }
    }
  },
  methods: {
    initAutocomplete () {
      let counter = 0
      return new Promise(function recurse (resolve, reject) {
        if (counter++ === 30) reject(new Error('Error accessing Google maps API'))
        if (!window.google || !document.getElementById('autocompleteAddress')) setTimeout(() => recurse(resolve, reject), 100)
        else {
          resolve({
            inputElement: document.getElementById('autocompleteAddress'),
            Autocomplete: window.google.maps.places.Autocomplete
          })
        }
      })
    },

    getAddressComponents (place) {
      if (!place.geometry) {
        this.borderColor = '#900'
        this.message = 'Invalid address'
        return {
          street: '',
          locality: '',
          admin1: '',
          admin2: '',
          postCode: ''
        }
      }
      this.message = ''
      this.$emit('update:address', place.formatted_address)
      this.$emit('update:coordinates', [place.geometry.location.lng(), place.geometry.location.lat()])

      const components = [
        { name: 'subnumber', value: 'subpremise' },
        { name: 'number', value: 'street_number' },
        { name: 'street', value: 'route' },
        { name: 'city', value: 'locality' },
        { name: 'state', value: 'administrative_area_level_1' },
        { name: 'admin', value: 'administrative_area_level_2' },
        { name: 'postCode', value: 'postal_code' }
      ].map(item => ({ [item.name]: this.getInfo(item.value, place.address_components) }))

      this.$emit('update:properties', Object.assign({}, ...components))
    },

    getInfo (type, details) {
      const res = details.find(item => item.types[0] === type)
      return res ? res.short_name : ''
    },

    async initAddressInputField () {
      try {
        var { inputElement, Autocomplete } = await this.initAutocomplete()
      } catch (err) {
        console.warn(err)
        return
      }
      this.autocomplete = new Autocomplete(inputElement, { componentRestrictions: { country: 'au' } })
      this.autocomplete.addListener('place_changed', function (event) {
        const place = this.autocomplete.getPlace()
        this.getAddressComponents(place)
        this.$emit('update:address', this.localAddress)
        const properties = this.getAddressComponents(place)
        this.$emit('update:properties', properties)
      }.bind(this))
    }
  },
  mounted () {
    setTimeout(this.initAddressInputField.bind(this), 1000)
  }
}
</script>

<style>

.input-field {
  display: block;
  outline: none;
  width: 100%;
  padding: 8px 16px;
  border: solid 1px #bbb;
}
.input-field:focus {
  outline: none;
  border: solid 1px #09b;
}
</style>
