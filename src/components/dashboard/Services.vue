<template>
  <v-card flat class="transparent pb-12 px-12" v-if="ready">
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        dense
        outlined
        hide-details
        style="display: inline-block; width: 280px"
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
    ></v-data-table>

    <!-- <span class="ml-12"><small>Total number of: {{ selectedServiceNumber }}</small></span> -->
  </v-card>
</template>

<script>

export default {
  name: 'Services',
  data: () => ({
    ready: false,
    items: null,
    search: null,
    headers: [
      {
        text: 'Plan name',
        align: 'start',
        value: 'serviceName'
      },
      { text: 'Speed (Mbps)', value: 'speed' },
      { text: 'Data (MB)', value: 'dataLimit' },
      { text: 'Term (months)', value: 'term' },
      { text: 'Connection fee', value: 'connectionFee' },
      { text: 'Router fee', value: 'routerFee' },
      { text: 'Service fee', value: 'serviceFee' },
      { text: 'PROMO', value: 'promo' }
    ]
  }),
  methods: {
    getData (data) {
      console.log('SERVICES COMPONENT RECEIVE THE DATA:\n', data)
      this.items = Array.isArray(data) ? data : data.result ? data.result : []
      this.items.forEach(item => {
        item.speed = `${item.downstreamSpeed}/${item.upstreamSpeed}Mbps`
      })
      this.ready = true
    }
  },
  watch: {
    items: {
      deep: true,
      handler (val) {
        console.log('SERVICES DATA CHANGED:\n', val)
      }
    }
  },
  mounted () {
    console.warn('SERVICES LIST MOUNTED')
    this.__getServices()
    this.$root.$on('services-list-received', this.getData)
  }
}
</script>
