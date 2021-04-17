<template>
  <v-container class="homefone" v-if="ready">
    <v-card flat class="transparent pa-5 mx-auto" max-width="1440" outlined style="border: solid 1px #900">
      <v-row>
        <v-col cols="10">
          <CompanyDetailsStep :rspData.sync="schema" step="company" />
          <CompanyDetailsStep :rspData.sync="schema" step="general" />
          <CompanyDetailsStep :rspData.sync="schema" step="technic" />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn dark color="buttons" @click="saveData">
          SAVE
        </v-btn>
      </v-row>
    </v-card>

    <v-card dark class="primary px-5 py-12 my-12 mx-auto" max-width="960">
      <v-row>
        <CompanyDetailsStep :rspData.sync="schema" step="userInfo" />
      </v-row>
      <v-row justify="center">
        <v-btn text outlined class="mt-12" @click="saveCredentials">
          SAVE
        </v-btn>
      </v-row>
    </v-card>

  </v-container>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

import { schema } from '@/configs'

export default {
  name: 'CompanyDetails',
  components: {
    CompanyDetailsStep: () => import('@/components/edit-company-details/CompanyDetailsStep')
  },
  data: () => ({
    ready: false,
    schema: schema,
    steps: Object.keys(schema)
  }),
  methods: {
    ...mapMutations({
      message: 'MESSAGE'
    }),
    getData (data) {
      console.log('RSP DATA:\n', data)
      for (const step in data) {
        console.log(step)
        if (step === 'activeSesions') continue
        for (const prop in data[step]) {
          if (prop === 'password' || prop === 'role') continue
          console.log(step, prop)
          this.schema[step][prop].value = data[step][prop]
        }
      }
      console.log('RSP SCHEMA:\n', this.schema)
      this.ready = true
    },
    saveData () {
      const result = {}
      console.log(this.schema.company.address)
      for (const stepName of Object.keys(this.schema)) {
        result[stepName] = {}
        const step = this.schema[stepName]
        for (const propName of Object.keys(step)) {
          result[stepName][propName] = step[propName].value
        }
      }
      console.log('RSP for save\n', result)
      this.__putClientData(result)
    },
    showMessage (data) {
      console.log(data)
      this.message({
        message: true,
        messageType: 'Data saved',
        messageText: 'Success'
      })
    },
    saveCredentials (event) {
      console.log(event.data)
    }
  },
  computed: {
    ...mapState(['refreshed']),
    readyToSendRequestForData () {
      console.log('RSP REFRESHED: ', this.refreshed.rsp)
      return this.refreshed.rsp
    }
  },
  watch: {
    schema: {
      deep: true,
      handler (val) {
        console.log('RSP DATA CHANGED:\n', val)
      }
    },
    readyToSendRequestForData (val) {
      if (val) {
        this.__addClientGetListener(this.getData)
        this.__getClientData()
        this.__addClientPutListener(this.showMessage)
      }
    }
  }
}
</script>

<style scoped>
</style>
