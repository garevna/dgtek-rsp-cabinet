<template>
  <v-card flat class="transparent" width="100%">
    <!-- <v-toolbar class="transparent" style="box-shadow: none">
      <v-spacer />
      <v-btn icon large @click="$emit('update:dialog', false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar> -->
    <v-card flat class="transparent ma-8 px-12">
      <v-row justify="center" class="mb-8">
        <SwitchValues
          label="Residential/commercial"
          :value.sync="customerType"
          :states="['residential', 'commercial']"
        />
      </v-row>
      <v-row v-if="customerType" justify="center" class="mb-12">
        <v-col>
          <v-row>
            <v-col cols="0" md="4" class="d-none d-md-inline-block">
              <h6 class="text-right">Company name</h6>
            </v-col>
            <v-col cols="12" sm="8">
              <v-text-field
                v-model="companyName"
                label="Company name"
                :rules="[rules.required]"
                outlined
                dense
                hide-details
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="0" md="4" class="d-none d-md-inline-block">
              <h6 class="text-right">Company ABN</h6>
            </v-col>
            <v-col cols="12" sm="8">
              <v-text-field
                v-model="companyAbn"
                label="Company ABN"
                :rules="[rules.required, rules.abn]"
                outlined
                dense
                hide-details
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="center">

        <v-col cols="0" md="3" lg="2" class="d-none d-md-inline-block">
          <h6 class="text-right">Address</h6>
        </v-col>
        <v-col cols="3" lg="2">
          <v-text-field v-model="customerDetails.apartmentNumber.value" label="Apartment number" outlined />
        </v-col>
        <v-col cols="8" md="6" lg="6">
          <v-select
            :items="buildings"
            v-model="customerDetails.address"
            hide-details
            outlined
            label="Building address"
            :menu-props="{ bottom: true, offsetY: true }"
          />
        </v-col>
      </v-row>
      <v-row
        v-for="(prop, propName) in customerDetails"
        :key="propName"
        class="my-0"
      >
        <v-col cols="0" md="4" class="d-none d-md-inline-block">
          <h6 class="text-right">{{ prop.title }}</h6>
        </v-col>
        <v-col cols="12" sm="8">
          <v-text-field
            v-if="textField(prop)"
            v-model="prop.value"
            @input="update(propName, prop.value)"
            :label="prop.title"
            :rules="[prop.required ? rules.required : (value) => true, rule(prop)]"
            outlined
            dense
            hide-details
          />

          <!-- <GeoscapeAutocomplete
            v-if="prop.type === 'address'"
            :value.sync="prop.value"
            style="margin-top: -14px!important; margin-bottom: 8px!important;"
          /> -->
        </v-col>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>

import { customerSchema, rules } from '@/configs'
import { SwitchValues } from '@/components/inputs'

export default {
  name: 'CustomerDetails',
  components: {
    // GeoscapeAutocomplete: () => import('@/components/inputs/GeoscapeAutocomplete.vue'),
    SwitchValues
  },
  props: {
    customerId: String,
    dialog: Boolean
  },
  data: () => ({
    ready: false,
    customer: null,
    customerDetails: {},
    tmp: { companyName: '', companyAbn: '' },
    rules: rules,
    buildings: [],
    customerType: null,
    companyName: '',
    companyAbn: ''
  }),
  computed: {
    // customerType: {
    //   get () {
    //     if (!this.customerDetails || !this.customerDetails.commercial) return false
    //     const { companyName, companyAbn } = this.customerDetails.commercial
    //     return !!companyName.value && !!companyAbn.value
    //   },
    //   set (value) {
    //     const { companyName, companyAbn } = value
    //     const commercial = this.customerDetails.commercial
    //     commercial.companyName.value = companyName || commercial.companyName.value
    //     commercial.companyAbn.value = companyAbn || commercial.companyAbn.value
    //   }
    // }
  },
  // watch: {
  //   customerType (val) {
  //     if (!this.ready) return
  //     if (!val) {
  //       this.tmp = {
  //         companyName: this.customerDetails.commercial.companyName.value,
  //         companyAbn: this.customerDetails.commercial.companyAbn.value
  //       }
  //       this.customerDetails.commercial = null
  //     } else {
  //       this.customerDetails.commercial = {
  //         companyName: {
  //           title: 'Company name',
  //           type: 'simple-text',
  //           value: this.tmp.companyName
  //         },
  //         companyAbn: {
  //           title: 'Company ABN',
  //           type: 'abn',
  //           value: this.tmp.companyAbn
  //         }
  //       }
  //     }
  //   }
  // },
  methods: {
    rowHeight (item) {
      return item.type === 'textarea' ? 160 : 60
    },
    textField (item) {
      return ['simple-text', 'url', 'phone', 'email', 'abn', 'state', 'postcode', 'number', 'password'].indexOf(item.type) !== -1
    },
    rule (item) {
      return this.rules[item.type]
    },
    getCustomerData (data) {
      this.customer = data.result
      console.log(this.customer)
      this.customerDetails = customerSchema.customerDetails
      for (const prop in this.customerDetails) {
        if (prop === 'commercial') {
          this.customerType = !!data.result.commercial.companyName && !!data.result.commercial.companyAbn
          this.customerDetails.commercial = {
            companyName: {
              title: 'Company name',
              type: 'simple-text',
              value: data.result.commercial.companyName
            },
            companyAbn: {
              title: 'Company ABN',
              type: 'abn',
              value: data.result.commercial.companyAbn
            }
          }
          continue
        }
        if (prop === 'apartmentNumber' || prop === 'address') continue
        this.customerDetails[prop].value = data.result[prop]
      }

      console.log('CUSTOMER DETAILS:\n', this.customerDetails)

      const { buildingId } = data.result

      console.log('BUILDING ID: ', buildingId)
      console.log(this.__getBuildingById)

      if (buildingId) {
        this.__getBuildingById(buildingId)
      }

      this.ready = true
    },
    getBuildings (data) {
      console.log('GET BUILDINGS LIST:\n', data)
      this.buildings.push(...data)
    },
    getServices (data) {
      console.log('SERVICES:\n', data)
    },
    getBuildingDetails (key, result) {
      console.log('BUILDING DETAILS:\n', key, result)
    }
  },
  mounted () {
    this.$root.$on('customer-data-received', this.getCustomerData)
    this.__getCustomerData(this.customerId)
    this.$root.$on('services-list-received', this.getServices)
    this.__getServices()

    this.$root.$on('building-data-received', this.getBuildingDetails)

    this.$root.$on('lit-buildings-list', this.getBuildings)
    this.$root.$on('footprint-buildings-list', this.getBuildings)

    console.log(this.__getLitBuildings, this.__getFootprintBuildings)

    this.buildings = []

    this.__getLitBuildings()
    this.__getFootprintBuildings()
  }
}
</script>
