<template>
  <v-container class="homefone" v-if="ready">
    <v-card flat class="transparent pa-5 mx-auto" max-width="1440" outlined style="border: solid 1px #900">
      <v-row>
        <v-col cols="10">
          <CompanyDetailsStep :data.sync="schema" step="company" />
          <CompanyDetailsStep :data.sync="schema" step="general" />
          <CompanyDetailsStep :data.sync="schema" step="technic" />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn dark class="buttons" @click="saveData" v-if="!saveDisabled">
          Update/save details
        </v-btn>
        <v-card-text class="text-center text--buttons" v-if="saveDisabled" style="color: #900">
          <v-icon color="primary">mdi-alert</v-icon>
          {{ errorMessage }}
        </v-card-text>
      </v-row>
    </v-card>

    <v-card dark class="primary px-5 py-12 my-12 mx-auto" max-width="960">
      <v-row>
        <CompanyDetailsStep :data.sync="schema" step="userInfo" />
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

import { schema, rules } from '@/configs'

export default {
  name: 'CompanyDetails',
  components: {
    CompanyDetailsStep: () => import('@/components/edit-company-details/CompanyDetailsStep.vue')
  },
  data: () => ({
    ready: false,
    schema: schema,
    steps: Object.keys(schema),
    errorMessage: ''
  }),

  computed: {
    saveDisabled () {
      return this.testForErrors()
    }
  },

  methods: {
    getData (details) {
      console.log(details.uniqueCode)
      for (const step in this.schema) {
        for (const prop in this.schema[step]) {
          this.schema[step][prop].value = details[step][prop]
        }
      }
      this.ready = true
    },

    saveData () {
      const result = {}
      for (const stepName of Object.keys(this.schema)) {
        result[stepName] = {}
        const step = this.schema[stepName]
        for (const propName of Object.keys(step)) {
          result[stepName][propName] = step[propName].value
        }
      }
      this.__putClientData(result)
    },

    testForErrors () {
      for (const sectionName of ['company', 'general', 'technic']) {
        const section = this.schema[sectionName]
        for (const fieldName in section) {
          const field = section[fieldName]
          let test = field.required ? rules.required(field.value) : true
          if (!test || typeof test === 'string') {
            this.errorMessage = `${field.title} is required`
            return true
          }

          test = rules[field.type] ? rules[field.type](field.value) : true
          if (!test || typeof test === 'string') {
            this.errorMessage = `${field.title} invalid`
            return true
          }
        }
      }
      return false
    },

    saveCredentials () {
      this.__putClientCredentials({
        login: this.schema.userInfo.login.value,
        userPhone: this.schema.userInfo.phoneNumber.value,
        password: this.schema.userInfo.password.value
      })
    }
  },

  mounted () {
    this.__getClientData()
    this.$root.$on('client-data-received', this.getData)
  }
}
</script>
