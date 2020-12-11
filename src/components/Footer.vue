<template>
  <v-bottom-navigation
      :value="value"
      color="buttons"
      grow
      app
    >
      <v-btn @click="click('ConnectLayout')">
        <span>Сonnect address</span>
      <v-icon>mdi-domain</v-icon>
      </v-btn>
      <v-btn @click="click('OtherLayout')">
        <span>OtherLayout</span>
      <v-icon>mdi-domain</v-icon>
      </v-btn>
    </v-bottom-navigation>
</template>

<style scoped>
h6, p {
  font-family: 'Gilroy';
  font-style: normal;
}
h6 {
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: #000;
}
p {
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #757575;
}
</style>

<script>

export default {
  name: 'Footer',
  props: [],
  data () {
    return {
      value: 0
    }
  },
  computed: {
  },
  methods: {
    click (name) {
      this.$layoutRouter.to({ name })
    }
  }
}
</script>
