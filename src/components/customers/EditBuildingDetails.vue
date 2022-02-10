<template>
  <v-card flat class="homefone mx-auto" width="700">
    <v-card flat class="transparent mt-0" v-if="schema">
        <v-row justify="center">
          <v-col cols="4" col-lg="3" col-xl="2" class="d-none d-md-flex">
            <small>Building address</small>
          </v-col>
          <v-col cols="8" col-lg="6" col-xl="5">
            {{ schema.address }}
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="4" col-lg="3" col-xl="2" class="d-none d-md-flex mb-8">
            <small>Building unique code</small>
          </v-col>
          <v-col cols="8" col-lg="6" col-xl="5">
            {{ schema.uniqueCode }}
          </v-col>
        </v-row>

      <v-container v-for="sectionName of ['management', 'owner']" :key="sectionName">
        <v-row justify="center" v-for="(prop, propName) in schema[sectionName]" :key="propName" class="my-0">
          <v-col cols="4" col-lg="3" col-xl="2" class="d-none d-md-flex" justify="end">
            <small>{{ prop.title }}</small>
          </v-col>
          <v-col cols="8" col-lg="6" col-xl="5">
            <v-text-field
              v-if="textField(prop)"
              v-model="prop.value"
              :label="prop.title"
              :rules="[prop.required ? rules.required : (value) => true, rule(prop)]"
              outlined
              dense
              hide-details
            />

            <v-text-field
              v-if="prop.type === 'mobile'"
              v-model="prop.value"
              prefix="+61"
              :rules="[prop.required ? rules.required : value => true, rules.mobile]"
              :label="prop.title"
              outlined
              dense
              hide-details
            ></v-text-field>

            <GeoscapeAutocomplete
              v-if="prop.type === 'address'"
              :value.sync="prop.value"
              style="margin-top: -14px!important; margin-bottom: 8px!important;"
            />
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions class="my-8">
        <v-spacer />
        <v-btn dark class="buttons" @click="saveBuildingDetails">
          Update/save details
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card flat class="transparent mt-0" v-else>
      <h5><small> Building was not found in DB </small></h5>
      <h5><small> Please select the building in customer details section or send a ticket to admin </small></h5>
    </v-card>

    <!-- <v-card-actions class="my-8">
      <v-spacer />
      <v-btn dark class="buttons" @click="saveBuildingDetails">
        Update/save details
      </v-btn>
    </v-card-actions> -->
  </v-card>
</template>

<script>

import { rules } from '@/configs'
import { testTextField } from '@/helpers'
import { customerHandler, buildingDetailsHandler } from '@/helpers/data-handlers'

export default {
  name: 'EditBuildingDetails',

  components: {
    GeoscapeAutocomplete: () => import('@/components/inputs/GeoscapeAutocomplete.vue')
  },

  data: () => ({
    worker: window[Symbol.for('map.worker')],
    ready: false,
    buildingId: customerHandler().buildingId,
    schema: {},
    rules: rules,
    buildingType: null,
    sections: ['management', 'owner']
  }),

  methods: {
    getNewBuildingId (buildingId) {
      this.__sendNotification(buildingId, response => response)
      this.$root.$emit('new-building-created', buildingId)
    },

    showError (errorType, errorMessage) {
      this.$root.$emit('open-error-popup', { errorType, errorMessage })
    },

    sendMessage (event) {
      this.$root.$emit('open-message-popup', {
        messageType: 'Building details',
        messageText: 'Data saved'
      })

      this.$root.$emit('building-data-updated')
    },

    rowHeight (item) {
      return item.type === 'textarea' ? 160 : 60
    },

    textField (item) {
      return testTextField(item.type)
    },

    rule (item) {
      return this.rules[item.type]
    },

    saveBuildingDetails () {
      const result = buildingDetailsHandler('save')

      this.buildingId ? this.worker.patchBuildingDetails(this.buildingId, result, this.sendMessage)
        : this.worker.createNewBuilding(result, this.getNewBuildingId)
    }
  },

  beforeMount () {
    this.schema = buildingDetailsHandler()
  },

  mounted () {
    this.ready = true
    this.$vuetify.goTo(0)
  }
}
</script>

<style scoped>
table {
  width: 100%;
  /* margin-bottom: 160px; */
}
tr {
  margin-bottom: 32px;
}
td {
  /* border: dotted 1px red; */
  font-size: 14px;
  padding: 4px 12px;
}
</style>
