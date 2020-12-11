<template>
  <v-app>
    <Header
    :drawer.sync="showDrawer"
    :toRoute="toRoute"
    />
    <v-main>
      <v-container>
        <!-- <router-view /> -->
        <div v-if="currentRoute === routes[0]"><Profile /></div>
        <div v-if="currentRoute === routes[1]"><ConnectAddress /></div>
      </v-container>
    </v-main>
    <Footer :toRoute="toRoute" />
    <v-snackbar v-model="snackbar" :timeout="timeout" :color="color" top>
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          class="close-icon-snackbar"
          icon
          v-bind="attrs"
          @click="snackbar = false"
        >
          <v-icon large>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<style lang="scss">
@import "@/sass/main.scss";
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}

#container-for-map {
  // width: 50%;
  // height: 700px;
}
.nav {
  // margin-bottom: 48px;
}
button {
  padding: 8px 16px;
  outline: none;
}
.theme--light.v-list-item .v-list-item__mask {
  // color: #83332C !important;
  // background: transparent !important;
}
button {
  padding: 8px 16px;
  outline: none;
}
// button:hover {
//   color: #09b;
//   background: #09b7;
// }
</style>

<script>
import { mapState } from 'vuex'

import 'dgtek-styles'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Profile from '@/views/Profile'
import ConnectAddress from '@/views/ConnectAddress'

export default {
  name: 'App',

  components: {
    Header,
    Profile,
    ConnectAddress,
    Footer
  },

  data: () => ({
    showDrawer: false,
    currentRoute: 'ConnectAddress',
    routes: ['Profile', 'ConnectAddress'],
    snackbar: false,
    text: '',
    timeout: 8000,
    color: 'green'
  }),
  computed: {
    ...mapState('auth', ['authError'])
  },
  watch: {
    authError (val) {
      if (!val) return
      this.text = val
      this.color = 'red'
      this.snackbar = true
    }
  },
  methods: {
    toRoute (route) {
      if (this.routes.includes(route)) this.currentRoute = route
    }
  },
  created () {
    if (this.$route.redirectedFrom) {
      const arr = this.$route.redirectedFrom.split('/')
      const hash = arr[arr.length - 1]
      this.$store.dispatch('auth/GET_USER', hash)
    }
  }
}
</script>
