<template>
  <v-container style="margin-bottom: 320px">
    <fieldset class="mt-4 pa-8 mb-12 mx-auto" style="max-width: 700px; border: solid 1px #bbb; box-shadow: 0 0 3px #0005">
      <legend class="ml-4 py-1">
        <h5><small>Service details</small></h5>
      </legend>
      <v-row align="start" justify="end">
        <v-btn icon @click="$emit('update:opened', false)" style="margin-top: -32px; margin-bottom: 32px;">
          <v-icon large>mdi-close</v-icon>
        </v-btn>
      </v-row>
      <v-card flat class="transparent mt-0" v-if="ready">
        <table width="100%">
          <tbody>
            <tr v-for="(prop, propName) in service" :key="propName">
              <td class="d-none d-md-flex" style="padding: 8px 16px; text-align: right">
                <p style="margin-bottom: 0; width: 100%; text-align: right;"><small>{{ prop.title }}</small></p>
              </td>
              <td v-if="propName !== 'serviceSLA'" style="padding: 8px 16px">
                <p style="margin-bottom: 0"><small><b>{{ typeof prop.value === 'boolean' ? prop.value ? 'Yes' : 'No' : prop.value }}</b></small></p>
              </td>
              <td v-else>
                <v-btn text @click="sla=true">
                  <v-icon color="primary">mdi-open-in-new</v-icon>
                  <span class="ml-2">{{ serviceSLATitle }}</span>
                </v-btn>
                <ViewPDF
                  :dialog.sync="sla"
                  :content="serviceSLAContent"
                  :title="serviceSLATitle"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </v-card>
    </fieldset>
  </v-container>
</template>

<script>

import { serviceSchema } from '@/configs'

export default {
  name: 'ServiceDetails',

  props: ['serviceDetails', 'opened'],

  components: {
    ViewPDF: () => import('@/components/inputs/ViewPDF.vue')
  },

  data: () => ({
    service: serviceSchema,
    ready: false,
    sla: false,
    serviceSLATitle: '',
    serviceSLAContent: ''
  }),

  computed: {
    dialog: {
      get () {
        return this.opened
      },
      set (val) {
        this.$emit('update:opened', val)
      }
    }
  },

  methods: {
    getSLAContent (data) {
      this.serviceSLATitle = data.title
      this.serviceSLAContent = data.content
    }
  },

  beforeDestroy () {
    this.$root.$off('sla-content-received', this.getSLAContent)
  },

  beforeMount () {
    this.$root.$on('sla-content-received', this.getSLAContent)
    this.__getSLAContent(this.serviceDetails.serviceSLA)
  },

  mounted () {
    this.service = JSON.parse(JSON.stringify(serviceSchema))
    delete this.service.partners
    if (this.serviceDetails) {
      for (const prop in this.service) {
        if (prop === 'serviceSLA') continue
        this.service[prop].value = this.serviceDetails[prop]
      }
      this.ready = true
    }

    this.$vuetify.goTo(0)
  }
}
</script>
