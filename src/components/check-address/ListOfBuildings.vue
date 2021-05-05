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
      :loading="loading"
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
    buildings: null,
    eventType: null,
    ready: false
  }),

  computed: {
    title () {
      return this.type === 'lit' ? 'On-net buildings' : 'Upcoming buildings'
    }
  },

  methods: {
    getListOfBuildings (event) {
      if (event.store !== this.type) return
      this.buildings = event.result
      this.eventType = event.result.event
      this.loading = false
      this.ready = true
    },
    clickListItem (item) {
      const event = this.type === 'lit' ? 'on-net' : this.type
      this.$emit('update:selected', Object.assign(item, { event }))
    }
  },

  beforeDestroy () {
    this.$root.$off('buildings-data-list', this.getListOfBuildings)
  },

  mounted () {
    this.$root.$on('buildings-data-list', this.getListOfBuildings)
    this.__getBuildingsByStatus(this.type)
  }
}
</script>
