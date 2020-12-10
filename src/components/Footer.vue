<template>
  <v-bottom-navigation
      :value="value"
      color="buttons"
      grow
      app
    >
      <v-btn @click="toRoute('Profile')">
        <span>Profile</span>
      <v-icon>mdi-card-account-details</v-icon>
      </v-btn>
      <v-btn @click="toRoute('ConnectAddress')">
        <span>Сonnect address</span>
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
  props: ['toRoute'],
  data () {
    return {
      value: 1
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
