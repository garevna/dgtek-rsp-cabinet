<template>
  <v-card flat class="transparent mx-auto" width="960">
    <v-toolbar class="transparent" style="box-shadow: none">
      <v-spacer />
      <v-btn icon large @click="$emit('update:dialog', false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <fieldset class="mt-4 pa-4">
      <legend class="ml-4"><h5>Customer details</h5></legend>
      <v-card flat class="transparent mt-0">
        <table width="100%">
          <tbody>
            <tr>
              <td width="120" class="d-none d-md-flex">
                Residential/commercial
              </td>
              <td width="*" colspan="2">
                <SwitchValues
                  label="Residential/commercial"
                  :value.sync="customerType"
                  :states="['residential', 'commercial']"
                  hide-details
                />
              </td>
            </tr>
            <tr v-if="customerType">
              <td class="d-none d-md-flex">Company name</td>
              <td colspan="2">
                <v-text-field
                  v-model="customer.commercial.companyName"
                  label="Company name"
                  :rules="[rules.required]"
                  outlined
                  dense
                  hide-details
                />
              </td>
            </tr>
            <tr v-if="customerType">
              <td class="d-none d-md-flex">Company ABN</td>
              <td colspan="2">
                <v-text-field
                  v-model="customer.commercial.companyAbn"
                  label="Company ABN"
                  :rules="[rules.required, rules.abn]"
                  outlined
                  dense
                  hide-details
                />
              </td>
            </tr>
            <tr>
              <td class="d-none d-md-flex"></td>
              <td>Apartment number</td>
              <td>Building address</td>
            </tr>
            <tr v-if="customer">
              <td class="d-none d-md-flex">Address</td>
              <td width="160">
                <v-text-field v-model="customer.apartmentNumber" label="apt" outlined dense hide-details />
              </td>
              <td>
                <v-select
                  :items="buildings"
                  v-model="customer.address"
                  @input="updateBuildingId"
                  hide-details
                  outlined
                  dense
                  label="address"
                  :menu-props="{ bottom: true, offsetY: true }"
                />
              </td>
            </tr>
            <tr v-for="(prop, propName) in customerDetails" :key="propName">
              <td class="d-none d-md-flex">{{ prop.title }}</td>
              <td colspan="2">
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
                <v-text-field
                  v-if="prop.type === 'mobile'"
                  v-model="prop.value"
                  @input="update(propName, prop.value)"
                  prefix="+61"
                  :rules="[prop.required && !customerDetails.phoneWork.value ? rules.required : (value) => true, rules.mobile]"
                  label="mobile phone number"
                  outlined
                  dense
                  hide-details
                ></v-text-field>
              </td>
            </tr>
            <tr style="height: 48px;"></tr>
            <tr style="margin-top: 48px!important">
              <td class="d-none d-md-flex">
                <!-- <v-btn outlined text color="buttons" @click="$emit('update:dialog', false)">Exit</v-btn> -->
              </td>
              <td colspan="2" class="text-right">
                <v-spacer />
                <v-btn dark class="buttons" @click="saveCustomerDetails">Save</v-btn>
              </td>
            </tr>
          </tbody>
        </table>
      </v-card>
    </fieldset>
    <BuildingDetails :buildingData="buildingData" />
    <v-row justify="center" class="my-12">
      <v-btn outlined text color="buttons" @click="$emit('update:dialog', false)">Exit</v-btn>
    </v-row>
  </v-card>
</template>

<script>

import { customerSchema, rules } from '@/configs'
import { testTextField, getBuildingUniqueCode } from '@/helpers'
import { SwitchValues } from '@/components/inputs'

export default {
  name: 'CustomerDetails',
  components: {
    BuildingDetails: () => import('@/components/customers/BuildingDetails.vue'),
    SwitchValues
  },
  props: {
    customerId: String,
    dialog: Boolean
  },
  data: () => ({
    customerSchema: customerSchema,
    buildingData: null,
    ready: false,
    customer: null,
    customerDetails: {},
    commercialSchema: { companyName: '', companyAbn: '' },
    rules: rules,
    buildings: [],
    customerType: null,
    companyName: '',
    companyAbn: ''
  }),
  computed: {},
  watch: {
    customerType: {
      handler (newVal, oldVal) {
        if (newVal && (!this.customer.commercial || !Object.keys(this.customer.commercial))) {
          this.customer.commercial = this.commercialSchema
        }
      }
    }
  },
  methods: {
    update (propName, propValue) {
      console.log(propName, propValue)
      this.customer[propName] = propValue
    },
    createBuildingCode (addressComponents) {
      return getBuildingUniqueCode(addressComponents)
    },
    createCustomerCode (addressComponents) {
      return `${getBuildingUniqueCode(addressComponents)}.${this.customer.apartmentNumber}`
    },
    updateBuildingId () {
      console.log(this.customer.address)
      this.__getBuildingByAddress(this.customer.address)
    },
    getBuildingDetails (data) {
      console.log('BUILDING DETAILS:\n', data)
      console.log(data.address)
      this.customer.buildingId = data._id
      this.customer.postCode = data.addressComponents.postCode
      this.buildingId = data._id
      this.customer.uniqueCode = `${getBuildingUniqueCode(data.addressComponents)}.${this.customer.apartmentNumber}`
      this.customerDetails.uniqueCode.value = `${getBuildingUniqueCode(data.addressComponents)}.${this.customer.apartmentNumber}`
      this.buildingData = {
        _id: data._id,
        address: data.address,
        addressComponents: data.addressComponents,
        buildingUniqueCode: getBuildingUniqueCode(data.addressComponents),
        management: JSON.parse(JSON.stringify(data.management)),
        owner: JSON.parse(JSON.stringify(data.owner))
      }
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
    getCustomerData (data) {
      this.customer = data.result

      if (this.customer.commercial && Object.keys(this.customer.commercial).length > 0) {
        this.customerType = true
        this.customerDetails.commercial = this.customerSchema.commercial
        this.customerDetails.commercial.companyName.value = this.customer.commercial.companyName
        this.customerDetails.commercial.companyAbn.value = this.customer.commercial.companyAbn
      }
      this.customerDetails = customerSchema.customerDetails
      for (const prop in this.customerDetails) {
        this.customerDetails[prop].value = data.result[prop]
      }

      const { buildingId } = data.result

      if (buildingId) {
        this.__getBuildingById(buildingId)
      }

      this.ready = true
    },
    getBuildings (data) {
      this.buildings.push(...data)
    },
    getServices (data) {
      console.log('SERVICES:\n', data)
    },
    saveCustomerDetails () {
      if (!this.customerType) this.customer.commercial = {}
      console.log(this.customer)
      console.log(this.customerDetails)
      this.__putCustomer(this.customer._id, this.customer)
    },
    close () {
      console.log('CUSTOMER UPDATED')
      this.$parent.$emit('refresh-page')
      this.$emit('update:dialog', false)
    }
  },
  mounted () {
    this.$root.$on('customer-data-received', this.getCustomerData)
    this.$root.$on('services-list-received', this.getServices)
    this.$root.$on('building-data-received', this.getBuildingDetails)
    this.$root.$on('lit-buildings-list', this.getBuildings)
    this.$root.$on('footprint-buildings-list', this.getBuildings)

    this.$root.$on('customer-updated', this.close)

    this.__getCustomerData(this.customerId)
    this.__getServices()

    this.buildings = []

    this.__getLitBuildings()
    this.__getFootprintBuildings()
  }
}
</script>

<style scoped>
table {
  width: 100%;
  margin-bottom: 48px;
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
