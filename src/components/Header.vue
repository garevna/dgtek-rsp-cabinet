<template>
  <v-app-bar
    app
    elevate-on-scroll
    hide-on-scroll
    scroll-threshold="75"
    height="100"
  >
    <v-container>
      <v-row>
        <a :href="url">
          <img src="img/logo.png" alt="dgtek-logo" height="48" />
        </a>
        <v-spacer></v-spacer>
        <!-- <v-btn
        icon
        fab
        >
          <v-icon color="buttons">mdi-account</v-icon>
        </v-btn> -->
        <v-btn icon @click="toRoute('Profile')">
          <v-icon color="buttons">mdi-account</v-icon>
        </v-btn>
      </v-row>
    </v-container>
    <!-- icon v-if="isLogged" @click="goToCabinet"
    color="secondaryGray" -->
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
  props: ['drawer', 'toRoute'],

  components: {
    //
  },

  data: () => ({
    url: process.env.VUE_APP_API_URL
  }),

  methods: {
    drowerToggle () {
      this.$emit('update:drawer', !this.drawer)
    }
  }
}
</script>
