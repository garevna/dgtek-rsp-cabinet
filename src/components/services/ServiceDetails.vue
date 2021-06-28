<template>
  <v-container style="margin-bottom: 320px">
    <!-- <v-card flat class="transparent mx-auto" max-width="700">
      <v-row justify="center" align="center">
          <v-spacer />
          <v-btn icon @click="$router.push({ name: 'services-list' })">
            <v-icon large>mdi-close</v-icon>
          </v-btn>
        </v-row>
    </v-card> -->

    <fieldset class="mt-4 pa-8 mb-12 mx-auto" style="max-width: 600px; border: solid 1px #bbb; box-shadow: 0 0 3px #0007">
      <legend class="ml-4" style="background: #fbfbfb; border-radius: 8px; border: solid 1px #bbb; padding: 4px 8px">
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
              <td class="d-none d-md-flex" style="border: 1px solid #999; padding: 8px 16px">
                <p style="margin-bottom: 0"><small>{{ prop.title }}</small></p>
              </td>
              <td v-if="propName !== 'serviceSLA'" style="border: 1px solid #999; padding: 8px 16px">
                <p style="margin-bottom: 0"><small><b>{{ typeof prop.value === 'boolean' ? prop.value ? 'Yes' : 'No' : prop.value }}</b></small></p>
              </td>
              <td v-else>
                <iframe width="360" height="480" :src="prop.value"></iframe>
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

// import { serviceHandler } from '@/helpers'

export default {
  name: 'ServiceDetails',

  props: ['serviceDetails', 'opened'],

  data: () => ({
    service: serviceSchema,
    ready: false
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

  mounted () {
    this.service = JSON.parse(JSON.stringify(serviceSchema))
    delete this.service.partners
    if (this.serviceDetails) {
      for (const prop in this.service) {
        this.service[prop].value = this.serviceDetails[prop]
      }
      this.ready = true
    }

    this.$vuetify.goTo(0)
  }
}
</script>
