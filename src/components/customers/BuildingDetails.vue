<template>
  <v-card flat class="transparent mx-auto" width="960">
    <fieldset class="my-4 pa-8">
      <legend class="ml-4"><h5>Building details</h5></legend>
      <v-toolbar class="transparent" style="box-shadow: none">

      </v-toolbar>
      <v-card flat class="transparent mt-0" v-if="schema">
        <v-container>
          <v-row justify="center">
            <v-col cols="4" col-lg="3" col-xl="2" class="d-none d-md-flex">
              <small>Building address</small>
            </v-col>
            <v-col cols="8" col-lg="6" col-xl="5">
              {{ schema.address.value }}
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="4" col-lg="3" col-xl="2" class="d-none d-md-flex">
              <small>Building unique code</small>
            </v-col>
            <v-col cols="8" col-lg="6" col-xl="5">
              {{ schema.buildingUniqueCode.value }}
            </v-col>
          </v-row>
        </v-container>
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
                :rules="[prop.required ? rules.required : (value) => true, rules.mobile]"
                label="prop.title"
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-card-actions class="my-8">
        <v-spacer />
        <v-btn dark class="buttons" @click="saveBuildingDetails">Save</v-btn>
      </v-card-actions>
    </fieldset>
  </v-card>
</template>

<script>

import { buildingSchema, rules } from '@/configs'
import { testTextField, getBuildingUniqueCode } from '@/helpers'

export default {
  name: 'BuildingDetails',
  props: {
    buildingData: Object
  },
  data: () => ({
    ready: false,
    schema: buildingSchema,
    buildingDetails: {},
    rules: rules,
    buildingType: null
  }),
  computed: {},
  watch: {
    buildingData: {
      deep: true,
      handler (data) {
        console.log(data)
        if (!data) return
        this.schema.address.value = data.address
        this.schema.buildingUniqueCode.value = getBuildingUniqueCode(data.addressComponents)
        for (const sectionName of ['management', 'owner']) {
          for (const propName in this.schema[sectionName]) {
            this.schema[sectionName][propName].value = data[sectionName][propName]
          }
        }
      }
    }
  },
  methods: {
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
      const result = {
        address: this.schema.address.value,
        management: {},
        owner: {}
      }
      for (const section of ['management', 'owner']) {
        for (const propName in this.schema[section]) {
          Object.assign(result[section], { [propName]: this.schema[section][propName].value })
        }
      }

      console.log(this.buildingData._id)
      console.log(result)
      this.__putBuildingDetails(this.buildingData._id, result)
      this.$emit('update:dialog', false)
    }
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
