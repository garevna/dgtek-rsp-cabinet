<template>
    <v-card>
      <v-card-text>
        <table with="100%">
          <tbody>
            <tr>
              <td style="width: 140px">
                <v-text-field
                  v-model="apartmentNumber"
                  label="Apartment number"
                  placeholder="1"
                  color="buttons"
                  outlined
                />
              </td>
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
              <td colspan="3">
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
          class="mb-6 ml-3"
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
import {
  // function for calculate distance
  distanceToPoint,
  distanceToPoligon
} from 'dgtek-function-for-map'
import { mapState } from 'vuex'
const wells = require('@/components/ConnectAddress/mockData/wells-DGtek.json')

export default {
  name: 'AddressValidation',
  props: ['polygonsMap', 'ticketAddress', 'ticketLocatedInPolygon', 'ticketDistanceToPolygons', 'ticketDistanceToWell', 'ticketApartmentNumber', 'validateChecked'],
  data: () => ({
    editedItem: require('@/config/newBuilding.js').default,
    ValidateAddress: require('@/helpers/validateAddress').default,
    distanceToWell: null,
    apartmentNumber: ''
  }),
  computed: {
    ...mapState('polygons', ['polygons']),
    addressReady () {
      return this.editedItem.addressComponents.postCode &&
        this.editedItem.addressComponents.state &&
        this.editedItem.addressComponents.street &&
        this.editedItem.addressComponents.number
    },
    address () {
      const { number = '', street = '', city = '', state = '', postCode = '' } = this.editedItem.addressComponents
      return `${this.apartmentNumber}, ${number} ${street}, ${city} ${state} ${postCode}`
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
  watch: {
    coordinates (val) {
      if (!val) return
      this.calculate()
    }
  },
  methods: {
    distanceToWells (addressCoordinate) {
      // const currentWells = wells['DGtek-Pits']
      return wells['DGtek-Pits'].map(well => distanceToPoint(addressCoordinate, [well[1], well[0]]))
        .sort((a, b) => (a.distance < b.distance ? -1 : 0))[0]
    },
    distanceToPolygons (targetCoord) {
      const distance = this.polygons.features
        .map(poligon =>
          distanceToPoligon(targetCoord, poligon.geometry.coordinates[0])
        )
        .sort((a, b) => (a.distance < b.distance ? -1 : 0))[0]
      return distance
    },
    async calculate () {
      if (this.ticketLocatedInPolygon) {
        this.$emit('update:ticketDistanceToPolygons', 0)
      } else {
        this.$emit('update:ticketDistanceToPolygons', this.distanceToPolygons(this.coordinates).distance)
      }
      this.distanceToWell = this.distanceToWells(this.coordinates)
      this.$emit('update:ticketDistanceToWell', this.distanceToWell)
    },
    test (coordinates) {
      if (!this.polygons) return false
      return this.polygonsMap.some(polygon => window.google.maps.geometry.poly.containsLocation(coordinates, polygon))
    },
    async validateAddress () {
      try {
        const result = await this.ValidateAddress(this.address)
        Object.assign(this.editedItem, {
          coordinates: result.formattedCoordinates,
          addressComponents: result.properties,
          address: result.formattedAddress
        })
        if (result.location) this.$emit('update:ticketLocatedInPolygon', this.test(result.location))
        else this.$emit('update:ticketLocatedInPolygon', false)
        this.$emit('update:ticketAddress', this.address)
        this.$emit('update:ticketApartmentNumber', this.apartmentNumber)
        this.$emit('update:validateChecked', true)
      } catch (status) {
        console.warn('ADDRESS ERROR: ', status)
        this.$emit('update:ticketAddress', 'Address is invalid')
        this.$emit('update:ticketLocatedInPolygon', false)
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
