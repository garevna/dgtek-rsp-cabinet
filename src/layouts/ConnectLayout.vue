<template>
  <div>
    <v-app-bar app elevate-on-scroll>
      <v-toolbar-title>
        <a :href="url">
          <img src="img/logo.png" alt="dgtek-logo" height="48" />
        </a>
      </v-toolbar-title>

      <v-toolbar flat class="transparent">
        <v-spacer />

        <Button
          :clicked.sync="button1"
          icon="generalDescription"
          color="#777"
          text="General Description"
        />

        <Button
          :clicked.sync="button2"
          icon="buildingLevels"
          color="#777"
          text="Building Levels"
        />

        <Button
          :clicked.sync="button3"
          icon="infrastructure"
          color="#777"
          text="Infrastructure"
        />

        <Button
          :clicked.sync="button4"
          icon="save"
          color="#09b"
          text="Save current building data"
        />

        <Button
          :clicked.sync="button5"
          icon="delete"
          color="#900"
          text="Remove current building forever"
        />

        <Menu :options="menuOptions" :callBack="to" />
      </v-toolbar>
      <!-- <v-spacer/> -->
    </v-app-bar>

    <v-container>
      <ConnectAddress v-if="show('ConnectAddress')" :params="params" />
      <Profile
        v-if="show('Profile')"
        :params="params"
      />
    </v-container>
  </div>
</template>

<script>
import Button from '@/components/Button'
import Menu from '@/components/menu/Menu'
import ConnectAddress from '@/views/ConnectAddress'
import Profile from '@/views/Profile'

export default {
  name: 'ConnectLayout',
  props: [],

  components: {
    Button,
    Menu,
    ConnectAddress,
    Profile
  },

  data: () => ({
    url: process.env.VUE_APP_API_URL,
    menuOptions: require('@/components/menu/menu-options-for-connect-layout.json'),
    name: 'ConnectAddress',
    params: null,
    button1: false,
    button2: false,
    button3: false,
    button4: false,
    button5: false
  }),

  methods: {
    to (obj) {
      this.$connectLayoutRouter.to(obj)
    },
    show (name) {
      return this.name === name
    },
    callBack ({ name, params }) {
      this.name = name
      this.params = params
    }
  },
  mounted () {
    this.$connectLayoutRouter.addListener(this.callBack)
  }
}
</script>
