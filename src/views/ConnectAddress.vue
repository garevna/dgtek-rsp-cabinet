<template>
  <v-container>
    <v-row>
      <v-form class="col-7">
        <AddressValidation
          :polygonsMap="polygonsMap"
          :ticketAddress.sync="ticketData.address"
          :ticketLocatedInPolygon.sync="ticketData.locatedInPolygon"
          :ticketDistanceToPolygons.sync="ticketData.distanceToPolygons"
          :ticketDistanceToWell.sync="ticketData.distanceToWell"
          :ticketApartmentNumber.sync="ticketData.apartmentNumber"
          :validateChecked.sync="validateChecked"
        />
        <v-container class="mt-6 mb-16">
          <v-row justify="center" class=" pl-4">
            <TariffCard
              v-for="tariff in tariffs"
              :key="tariff._id"
              :tariff="tariff"
              :tariffId.sync="ticketData.tariffId"
              :tariffName.sync="tariffName"
            />
          </v-row>
        </v-container>
      </v-form>
      <v-container class="col-4 mt-4">
        <v-row>
          <h3 class="mr-2">Address: </h3>
          <p class="tittle">{{ ticketData.address }}</p>
        </v-row>
        <v-row v-if="ticketData.locatedInPolygon && validateChecked">
          <h3 class="mr-2">In Footprint</h3>
        </v-row>
        <v-row v-else-if="!ticketData.locatedInPolygon && validateChecked">
          <h3 class="mr-2">Not in Footprint<br>Distance to Footprint : {{ Math.ceil(ticketData.distanceToPolygons) }} m.</h3>
        </v-row>
        <v-row>
          <h3 class="mr-2">Tariff: </h3>
          <p class="tittle">{{ tariffName }}</p>
        </v-row>
        <v-row>
          <v-textarea
            v-model="ticketData.message"
            label="Meassge"
            color="buttons"
            outlined
            no-resize
          >
          </v-textarea>
        </v-row>
        <v-btn
          color="buttons"
          dark
          @click="sendTicket"
        >
          Send request
        </v-btn>
      </v-container>
    </v-row>
  </v-container>
</template>

<style>
  h3{
    margin-bottom: 30px;
  }
</style>

<style lang="scss" scoped>
  p{
    font-size: 20px;
  }
  h3{
    font-size: 20px;
    margin-bottom: 15px;
  }
</style>

<script>
import { mapState } from 'vuex'
import AddressValidation from '@/components/ConnectAddress/AddressValidation'
import TariffCard from '@/components/ConnectAddress/TariffCard'

export default {
  name: 'ConnectAddress',
  components: {
    AddressValidation,
    TariffCard
  },
  data: () => ({
    polygonsMap: null,
    ticketData: {
      address: '',
      apartmentNumber: '',
      locatedInPolygon: false,
      distanceToPolygons: null,
      distanceToWell: null,
      tariffId: '',
      message: ''
    },
    validateChecked: false,
    tariffName: '',
    loadScript: require('@/helpers/loadGoogleMapsScript').default
  }),
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('connection', ['conectMessage', 'connectError', 'connectLoading']),
    ...mapState('tariff', ['tariffs', 'tariffError', 'tariffLoading']),
    ...mapState('polygons', ['polygons', 'polygonsError', 'polygonsLoading'])
  },
  watch: {
    polygonsLoading (val) {
      if (val) return
      this.createMap()
    },
    polygonsMap (val) {
      if (val) return
      console.log()
    }
  },
  methods: {
    convertPolygons () {
      this.polygonsMap = this.polygons.features
        .filter((feature) => feature.properties.typeOf === 'ServiceAvailable')
        .map((feature) => feature.geometry.coordinates[0])
        .map((pairs) => pairs.map((pair) => ({
          lat: pair[1],
          lng: pair[0]
        })))
        .map((paths) =>
          new window.google.maps.Polygon({ paths })
        )
    },
    async createMap () {
      if (!window?.google?.maps && !await this.loadScript()) return console.error('Error accessing Google Maps API')
      if (this.polygons) this.convertPolygons()
    },
    sendTicket () {
      this.ticketData.resellerId = this.user._id
      if (this.ticketData.locatedInPolygon) this.$store.dispatch('connection/REQUEST', this.ticketData)
      else this.$store.dispatch('connection/RESEARCH', this.ticketData)
    }
  },
  created () {
    this.createMap()
    this.$store.dispatch('tariff/GET_TARIFS')
    this.$store.dispatch('polygons/GET_POLYGONS')
  }
}
</script>
