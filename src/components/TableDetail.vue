<template>
  <v-card flat class="d-flex flex-column align-center transparent">
    <table>
      <tr v-for="option in options" :key="option.text">
        <td>{{option.text}}</td>
        <td>{{data[option.prop]}}</td>
      </tr>
    </table>
  </v-card>
</template>

<script>
export default {
  props: ['options', 'data'],
  data () {
    return {
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style>
tr,td {
  color:black;
}
</style>
