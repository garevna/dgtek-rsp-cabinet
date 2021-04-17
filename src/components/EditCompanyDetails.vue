<template>
  <v-container class="homefone" v-if="ready">
    <v-card flat class="transparent" v-for="(step, stepName) in steps" :key="stepName">
      <h4>{{ step }}</h4>
      <CompanyDetailsStep :step="stepName" />
    </v-card>
  </v-container>
</template>

<script>

import { CompanyDetailsStep } from '@/components/edit-company-details'

// import { mapState } from 'vuex'

export default {
  name: 'EditCompanyDetails',
  components: {
    CompanyDetailsStep
  },
  data: () => ({
    steps: {
      company: 'Company details',
      general: 'General information',
      technic: 'Technical information',
      auth: 'Authorization'
    }
  }),
  computed: {
    first () {
      return this.step === 1
    },
    second () {
      return this.step === 2
    },
    third () {
      return this.step === 3
    },
    fourth () {
      return this.step === 4
    }
  },
  methods: {
    callback (event) {
      console.log('RSP GET LISTENER:\n', event.data)
      this.__worker.removeEventListener('message', this.callback)
    },
    submit () {
      const result = {}
      for (const sectionName in this.data) {
        result[sectionName] = {}
        for (const propName in this.data[sectionName]) {
          result[sectionName][propName] = this.data[sectionName][propName].value
        }
      }
    }
  },
  created () {
    this.__getClientData()
    this.__addClientGetListener(this.callback)
  }
}
</script>
<style>
/* .tab {
  background: transparent!important;
  border: solid 1px #900;
}

.active {
  background: #900!important;
  color: #fff!important;
} */
</style>
