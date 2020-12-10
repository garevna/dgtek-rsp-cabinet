<template>
  <v-app-bar
    app
    elevate-on-scroll
    hide-on-scroll
    scroll-threshold="75"
    height="100"
  >
    <v-container>
      <a :href="url">
        <img src="img/logo.png" alt="dgtek-logo" height="48" />
      </a>

      <v-spacer></v-spacer>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
  props: ['drawer'],

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
