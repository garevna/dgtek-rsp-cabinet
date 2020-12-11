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
      <OtherPage v-if="show('OtherPage')" :params="params" />
      <OtherPage2 v-if="show('OtherPage2')" :params="params" />
    </v-container>
  </div>
</template>

<script>
import Menu from '@/components/menu/Menu'
import Button from '@/components/Button'
import OtherPage from '@/views/OtherPage'
import OtherPage2 from '@/views/OtherPage2'

export default {
  name: 'OtherLayout',
  props: [],

  components: {
    Button,
    Menu,
    OtherPage,
    OtherPage2
  },

  data: () => ({
    url: process.env.VUE_APP_API_URL,
    menuOptions: require('@/components/menu/menu-options-for-other-layout.json'),
    name: 'OtherPage',
    params: null,
    button1: false,
    button2: false,
    button3: false,
    button4: false,
    button5: false
  }),

  methods: {
    to (obj) {
      this.$otherLayoutRouter.to(obj)
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
    this.$otherLayoutRouter.addListener(this.callBack)
  }
}
</script>
