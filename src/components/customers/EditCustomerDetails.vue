<template>
  <fieldset class="mt-4 pa-4">
    <legend class="ml-4"><h5>Customer details</h5></legend>
    <v-card flat class="transparent mt-0">
      <table width="100%">
        <tbody>
          <tr>
            <td width="160" class="d-none d-md-flex">
              Residential/commercial
            </td>
            <td width="*" colspan="2">
              <SwitchValues
                label="Residential/commercial"
                :value.sync="customerType"
                :states="['residential', 'commercial']"
                hide-details
                class="mb-8"
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
              <v-text-field
                v-model="customer.apartmentNumber"
                @input="changeUniqueCode"
                label="apt"
                outlined
                dense
                hide-details
              />
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
          <tr v-for="(prop, propName) in customerDetailsSchema" :key="propName">
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
                :rules="[prop.required && !customerDetailsSchema.phoneWork.value ? rules.required : (value) => true, rules.mobile]"
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
              <v-btn outlined color="buttons" class="mr-2" @click="assignNewService">
                Assign new service
              </v-btn>
              <v-btn dark class="buttons" @click="saveCustomerDetails" :disabled="saveDisabled">
                Update/save details
              </v-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </v-card>
  </fieldset>
</template>

<script>

import { customerSchema, rules } from '@/configs'
import { testTextField, getBuildingUniqueCode } from '@/helpers'
import { SwitchValues } from '@/components/inputs'

const { customerDetails, commercial } = customerSchema

export default {
  name: 'EditCustomerDetails',
  components: {
    SwitchValues
  },
  props: {
    initialCustomer: Object,
    buildingId: {
      type: String,
      required: false
    },
    buildingPostCode: {
      type: String,
      required: false
    }
  },
  data: () => ({
    customer: null,
    customerDetailsSchema: customerDetails,
    buildingData: null,
    commercialSchema: commercial,
    rules: rules,
    buildings: [],
    customerType: null
  }),
  computed: {
    saveDisabled () {
      return !this.customer || !this.customer.buildingId
    }
  },
  watch: {
    buildingId (value) {
      console.log('BUILDING ID CHANGED TO: ', value)
      Object.assign(this.customer, { buildingId: value })
    },
    buildingPostCode (value) {
      console.log('POST CODE CHANGED TO: ', value)
      Object.assign(this.customer, { postCode: value })
    },
    customerType: {
      handler (newVal, oldVal) {
        if (newVal && (!this.customer.commercial || !Object.keys(this.customer.commercial))) {
          this.customer.commercial = this.commercialSchema
        }
      }
    },
    customer: {
      deep: true,
      immediate: true,
      handler (data) {
        console.log('CUSTOMER:\n', data)
      }
    }
  },
  methods: {
    changeUniqueCode () {
      this.createCustomerCode()
    },
    update (propName, propValue) {
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
      console.log('BUILDING ADDRESS: ', data.address)
      this.customer.buildingId = data._id
      this.customer.postCode = data.addressComponents.postCode
      this.customer.uniqueCode = `${getBuildingUniqueCode(data.addressComponents)}.${this.customer.apartmentNumber || 0}`
      this.customerDetailsSchema.uniqueCode.value = this.customer.uniqueCode
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
    createSchema () {
      if (this.customer.commercial && Object.keys(this.customer.commercial).length > 0) {
        this.customerType = true
        this.commercialSchema.companyName.value = this.customer.commercial.companyName
        this.commercialSchema.companyAbn.value = this.customer.commercial.companyAbn
      }
      this.customerDetailsSchema = customerSchema.customerDetails
      for (const prop in this.customerDetailsSchema) {
        this.customerDetailsSchema[prop].value = this.customer[prop]
      }
    },
    getCustomerData (data) {
      this.customer = data.result
      this.createSchema()

      const { buildingId } = data.result
      if (buildingId) {
        this.__getBuildingById(buildingId)
      }
    },
    getBuildings (data) {
      this.buildings.push(...data)
    },
    assignNewService () {
      //
    },
    saveCustomerDetails () {
      if (!this.customerType) this.customer.commercial = {}
      console.log(this.customer)
      this.customer._id ? this.__putCustomer(this.customer._id, this.customer) : this.__postCustomer(this.customer)
    },
    close () {
      this.$parent.$emit('update:initialCustomer', this.customer)
    }
  },
  beforeDestroy () {
    this.$root.$off('building-data-received', this.getBuildingDetails)
    this.$root.$off('lit-buildings-list', this.getBuildings)
    this.$root.$off('footprint-buildings-list', this.getBuildings)
    this.$root.$off('customer-updated', this.close)
    this.$root.$off('customer-created', this.close)
  },
  mounted () {
    this.customer = this.initialCustomer
    this.buildings = [this.customer.address]
    this.createSchema()
    console.log(this.customer.address)
    this.customer.buildingId && this.__getBuildingById(this.customer.buildingId)

    this.$root.$on('building-data-received', this.getBuildingDetails)
    this.$root.$on('lit-buildings-list', this.getBuildings)
    this.$root.$on('footprint-buildings-list', this.getBuildings)

    this.$root.$on('customer-updated', this.close)
    this.$root.$on('customer-created', this.close)

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
