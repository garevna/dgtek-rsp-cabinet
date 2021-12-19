<template>
  <v-card flat class="transparent" v-if="ready">
    <v-card-title>
      <h5>{{ title }}</h5>
    </v-card-title>
    <v-combobox
      :items="buildings.map(item => item.address)"
      :label="title"
      outlined
      dense
      hide-details
      :loading="loading"
      v-model="selectedAddress"
    ></v-combobox>
    <v-list dense max-height="360" style="overflow-y: auto">
      <v-list-item
        v-for="building of buildings"
        :key="building.id"
        @click="clickListItem(building)"
      >
        {{ building.address }}
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>

export default {
  name: 'ListOfBuildings',

  props: ['type', 'selected'],

  data: () => ({
    worker: window[Symbol.for('map.worker')],
    buildings: null,
    selectedAddress: null,
    eventType: null,
    ready: false
  }),

  computed: {
    title () {
      return this.type === 'lit' ? 'On-net buildings' : 'Upcoming buildings'
    }
  },

  watch: {
    selectedAddress (address) {
      const item = this.buildings.find(building => building.address === address)
      this.clickListItem(item)
    }
  },

  methods: {
    getListOfBuildings (data) {
      const { buildingStatus, event } = data
      if (buildingStatus.toLowerCase() !== this.type) return
      this.buildings = data
      this.eventType = event
      this.loading = false
      this.ready = true
    },

    clickListItem (item) {
      const event = this.type === 'lit' ? 'on-net' : this.type
      this.$emit('update:selected', Object.assign(item, { event }))
    }
  },

  beforeMount () {
    this.worker.getBuildingsListForTable(this.type, this.getListOfBuildings)
  }
}
</script>
