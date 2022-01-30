<template>
  <v-container class="homefone" v-if="ready">
    <v-card flat class="transparent pa-5 mx-auto" max-width="1440" outlined style="border: solid 1px #900">
      <v-row>
        <v-col cols="10">
          <CompanyDetailsStep
            step="company"
            :data.sync="company"
            :checkFields.sync="checkFields"
            :errors.sync="companyErrors"
          />
          <CompanyDetailsStep
            step="general"
            :data.sync="general"
            :checkFields.sync="checkFields"
            :errors.sync="generalErrors"
          />
          <CompanyDetailsStep
            step="technic"
            :data.sync="technic"
            :checkFields.sync="checkFields"
            :errors.sync="technicErrors"
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn dark class="buttons" @click="saveData" :disabled="Boolean(companyErrors || generalErrors || technicErrors)">
          Update/save details
        </v-btn>
      </v-row>
    </v-card>

    <v-card dark class="primary px-5 py-12 my-12 mx-auto" max-width="960">
      <v-row>
        <CompanyCredentials :data.sync="userInfo" />
      </v-row>
    </v-card>

  </v-container>
</template>

<script>

import { messagesHandler } from '@/helpers/data-handlers'

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
    errorMessage: '',
    messageIndex: null,
    checkFields: null
  }),

  watch: {
    checkFields: {
      deep: true,
      handler (data) {
        // console.log('CHECK FIELDS UPDATED:\n', data)
      }
    }
  },

  methods: {
    getData (details) {
      this.steps.forEach(step => {
        this[step] = JSON.parse(JSON.stringify(details[step]))
      })

      this.ready = true
    },

    saveData () {
      const result = Object.assign({}, {
        company: this.company,
        general: this.general,
        technic: this.technic
      })
      this.__putClientData(result, response => console.log('Partner\' details saved:\n', response))

      if (this.checkFields.length) {
        const message = messagesHandler()[this.messageIndex]
        messagesHandler(Object.assign(message, { fields: this.checkFields }))
        this.__updateMessage(message._id, this.checkFields, response => console.log('Message updated:\n', response))
      }
    },

    getCheckFields () {
      this.messageIndex = messagesHandler().findIndex(message => message.type === 'update-company-details')
      this.checkFields = this.messageIndex !== -1 ? messagesHandler()[this.messageIndex].fields : []
    },

    getMessages () {
      const updated = messagesHandler().find(message => message.type === 'update-company-details')
      if (!updated) this.getCheckFields()
    }
  },

  mounted () {
    this.__getClientData(this.getData)
    this.getCheckFields()
    this.$root.$on('messages-updates-received', this.getMessages)
  }
}
</script>
