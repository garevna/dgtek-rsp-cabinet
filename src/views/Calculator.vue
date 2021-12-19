<template>
  <v-container fluid class="transparent mt-12">
    <v-btn
      v-if="!drawer"
      text
      color="#900"
      @click.stop="drawer = !drawer"
      style="position: fixed; z-index: 5; top: 24px; right: 100px;"
    >
      <v-icon>mdi-calculator</v-icon>
      Calculator
    </v-btn>
    <PortalCalculator :drawer.sync="drawer" role="rsp" />
  </v-container>
</template>

<script>

export default {
  name: 'Calculator',

  data: () => ({
    drawer: false
  })
}
</script>
