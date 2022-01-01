<template>
  <v-container class="homefone" v-if="ready">
    <v-card flat class="transparent pa-5 mx-auto" max-width="1440" outlined style="border: solid 1px #900">
      <v-row>
        <v-col cols="10">
          <CompanyDetailsStep step="company" :data.sync="company" :errors.sync="companyErrors" />
          <CompanyDetailsStep step="general" :data.sync="general" :errors.sync="generalErrors" />
          <CompanyDetailsStep step="technic" :data.sync="technic" :errors.sync="technicErrors" />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn dark class="buttons" @click="saveData" :disabled="Boolean(companyErrors || generalErrors || technicErrors)">
          Update/save details
        </v-btn>
        <!-- <v-card-text class="text-center text--buttons" v-if="companyErrors || generalErrors || technicErrors" style="color: #900">
          <v-icon color="primary">mdi-alert</v-icon>
          {{ errorMessage }}
        </v-card-text> -->
      </v-row>
    </v-card>

    <v-card dark class="primary px-5 py-12 my-12 mx-auto" max-width="960">
      <v-row>
        <!-- <CompanyDetailsStep :data.sync="userInfo" step="userInfo" :errors="userInfoErrors" /> -->
        <CompanyCredentials :data.sync="userInfo" />
      </v-row>
      <!-- <v-row justify="center">
        <v-btn text outlined class="mt-12" @click="saveCredentials">
          SAVE
        </v-btn>
      </v-row> -->
    </v-card>

  </v-container>
</template>

<script>

// import { rules } from '@/configs'

export default {
  name: 'CompanyDetails',

  components: {
    CompanyDetailsStep: () => import('@/components/edit-company-details/CompanyDetailsStep.vue'),
    CompanyCredentials: () => import('@/components/edit-company-details/CompanyCredentials.vue')
  },

  data: () => ({
    ready: false,
    company: null,
    general: null,
    technic: null,
    userInfo: null,
    companyErrors: 0,
    generalErrors: 0,
    technicErrors: 0,
    userInfoErrors: 0,
    steps: ['company', 'general', 'technic', 'userInfo'],
    errorMessage: ''
  }),

  methods: {
    getData (details) {
      this.steps.forEach(step => {
        this[step] = JSON.parse(JSON.stringify(details[step]))
      })

      this.ready = true
    },

    saveData () {
      console.group('RESULT TO BE SAVED:')

      console.log('COMPANY:\n', this.company)
      console.log('GENERAL:\n', this.general)
      console.log('TECHNIC:\n', this.technic)

      const result = Object.assign({}, {
        company: this.company,
        general: this.general,
        technic: this.technic
      })

      console.log('RESULT:\n', result)

      console.groupEnd('RESULT TO BE SAVED')
      this.__putClientData(result, response => console.log('Partner\' details saved'))
    }
  },

  mounted () {
    this.__getClientData(this.getData)
  }
}
</script>
