<template>
    <v-card>
      <v-card-text>
        <table with="100%">
          <tbody>
            <tr>
              <td style="width: 140px">
                <v-text-field
                  v-model="editedItem.addressComponents.number"
                  label="Street number*"
                  placeholder="Number"
                  color="buttons"
                  outlined
                />
              </td>
              <td colspan="2">
                <v-text-field
                  v-model="editedItem.addressComponents.street"
                  label="Street name*"
                  placeholder="Name"
                  color="buttons"
                  outlined
                />
              </td>
            </tr>
            <tr>
              <td colspan="3">
                <v-text-field
                  v-model="editedItem.addressComponents.city"
                  label="City (optional)"
                  color="buttons"
                  outlined
                />
              </td>
            </tr>
            <tr>
              <td>
                <v-text-field
                  v-model="editedItem.addressComponents.state"
                  label="State*"
                  placeholder="VIC"
                  color="buttons"
                  outlined
                />
              </td>
              <td>
                <v-text-field
                  v-model="editedItem.addressComponents.postCode"
                  label="Postal code*"
                  placeholder="3182"
                  color="buttons"
                  outlined
                />
              </td>
            </tr>
            <!-- <v-select
              v-model="selectState"
              :items="states"
              item-text="stateName"
              item-value="shortStateName"
              return-object
              label="State"
              class="mx-4"
              color="inputColor"
              flat
              width="320"
            ></v-select> -->
            <!-- <v-text-field v-model="editedItem.addressComponents.state" label="State" /> -->
            <!-- <v-text-field  v-model="editedItem.addressComponents.city" label="City" /> -->
          </tbody>
        </table>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="false"
          class="mb-6"
          color="buttons"
          dark
          @click="validateAddress"
        >
          Validate address
        </v-btn>
      </v-card-text>
    </v-card>
</template>

<script>

export default {
  name: 'AddressValidation',
  props: ['polygons', 'ticketAddress', 'canSave'],
  data: () => ({
    editedItem: require('@/config/newBuilding.js').default,
    ValidateAddress: require('@/helpers/validateAddress').default
    // selectState: {
    //   stateName: 'Victoria',
    //   shortStateName: 'VIC'
    // },
    // states: [
    //   {
    //     stateName: 'Victoria',
    //     shortStateName: 'VIC'
    //   },
    //   {
    //     stateName: 'Queensland',
    //     shortStateName: 'QLD'
    //   },
    //   {
    //     stateName: 'South Australia',
    //     shortStateName: 'SA'
    //   },
    //   {
    //     stateName: 'Western Australia',
    //     shortStateName: 'WA'
    //   },
    //   {
    //     stateName: 'Tasmania',
    //     shortStateName: 'TAS'
    //   },
    //   {
    //     stateName: 'Northern Territory',
    //     shortStateName: 'NT'
    //   },
    //   {
    //     stateName: 'Australian Capital Territory',
    //     shortStateName: 'ACT'
    //   }
    // ]
    // polygons: require('@/components/mockData/polygons.json')
  }),
  computed: {
    addressReady () {
      return this.editedItem.addressComponents.postCode &&
        this.editedItem.addressComponents.state &&
        this.editedItem.addressComponents.street &&
        this.editedItem.addressComponents.number
    },
    address () {
      const { number = '', street = '', city = '', state = '', postCode = '' } = this.editedItem.addressComponents
      return `${number} ${street}, ${city} ${state} ${postCode}`
    },
    coordinates: {
      get () {
        return this.editedItem.coordinates
      },
      set (val) {
        console.log(this.editedItem)
        Object.assign(this.editedItem, { coordinates: val })
      }
    }
  },
  methods: {
    test (coordinates) {
      if (!this.polygons) return false
      return this.polygons.some(polygon => window.google.maps.geometry.poly.containsLocation(coordinates, polygon))
    },
    async validateAddress () {
      try {
        const result = await this.ValidateAddress(this.address)
        Object.assign(this.editedItem, {
          coordinates: result.formattedCoordinates,
          addressComponents: result.properties,
          address: result.formattedAddress
        })

        if (result.location) this.$emit('update:canSave', this.test(result.location))
        else this.$emit('update:canSave', false)

        this.$emit('update:ticketAddress', this.address)
      } catch (status) {
        console.warn('ADDRESS ERROR: ', status)
        this.canSave = false
      }
    }
  },
  mounted () {
    this.editedItem.addressComponents.city = 'Melbourne'
  }
}
</script>

<style scoped>
table {
  width: 100%;
}
th, td {
  min-width: 140px;
  text-align: center;
}
</style>
