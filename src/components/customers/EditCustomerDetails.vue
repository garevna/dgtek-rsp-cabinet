<template>
    <v-card flat class="transparent mx-auto">
      <table>
        <tbody>
          <tr>
            <td width="280">Customer creation date</td>
            <td width="480">
              <DatePicker :date.sync="customer.customerCreationDate" title="Created" />
            </td>
            <td width="280" class="d-none d-md-flex">
            </td>
            <td width="320">
              <SwitchValues
                label="Residential/commercial"
                :value.sync="customerType"
                :states="['residential', 'commercial']"
                hide-details
                class="mb-8"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
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
                :rules="[rules.required]"
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
              />
            </td>
          </tr>
          <tr v-for="(prop, propName) in customerSchema" :key="propName">
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
                :rules="[prop.required && !customerSchema.phoneWork.value ? rules.required : (value) => true, rules.mobile]"
                label="mobile phone number"
                outlined
                dense
                hide-details
              ></v-text-field>
            </td>
          </tr>

          <tr style="height: 48px;"></tr>

          <tr style="margin-top: 48px!important">
            <!-- <td class="d-none d-md-flex">
              <v-btn outlined text color="buttons" @click="$emit('update:dialog', false)">Exit</v-btn>
            </td> -->
              <td colspan="3" class="text-right">
              <!-- <v-spacer /> -->
              <v-btn dark class="buttons" @click="saveCustomerDetails" v-if="!saveDisabled">
                Update/save details
              </v-btn>
              <v-card-text class="text--buttons" v-if="saveDisabled" style="color: #900">
                <v-icon color="primary">mdi-alert</v-icon>
                {{ errorMessage }}
              </v-card-text>
            </td>
          </tr>
        </tbody>
      </table>
    </v-card>
</template>

<script>

import { customerSchema, rules } from '@/configs'
import { testTextField } from '@/helpers'
import { SwitchValues, DatePicker } from '@/components/inputs'

import { partnerUniqueCodeHandler, customerHandler, buildingDetailsHandler } from '@/helpers/data-handlers'

const { customerDetails, commercial } = customerSchema

export default {
  name: 'EditCustomerDetails',

  components: {
    SwitchValues,
    DatePicker
  },

  props: ['dialog'],

  data: () => ({
    worker: window[Symbol.for('map.worker')],
    customer: customerHandler(),
    customerSchema: JSON.parse(JSON.stringify(customerDetails)),
    commercialSchema: JSON.parse(JSON.stringify(commercial)),
    rules: rules,
    buildings: [],
    customerType: null,
    errorMessage: '',
    uniqueCode: ''
  }),

  computed: {
    saveDisabled () {
      return !this.customer || this.testForErrors()
    },
    buildingId: {
      get () {
        return this.customer.buildingId
      },
      set (value) {
        this.customer.buildingId = value
      }
    }
  },

  watch: {
    'customer.apartmentNumber': {
      handler (val) {
        this.changeUniqueCode(val)
      }
    },
    customerType: {
      handler (newVal, oldVal) {
        if (newVal && (!this.customer.commercial || !Object.keys(this.customer.commercial))) {
          this.customer.commercial = this.commercialSchema
        }
      }
    },
    'customer.buildingId': {
      handler (val) {
        this.customer.buildingId = val
        this.worker.getBuildingDetailsById(val, this.getBuildingById)
      }
    }
  },

  methods: {
    changeUniqueCode () {
      this.customer.uniqueCode = `${partnerUniqueCodeHandler()}.${buildingDetailsHandler().uniqueCode}`
      this.customer.uniqueCode += this.customer.apartmentNumber ? `.${this.customer.apartmentNumber}` : ''
      this.customerSchema.uniqueCode.value = this.customer.uniqueCode
    },

    getBuildingById (buildingDetails) {
      console.log(buildingDetails)
      if (!buildingDetails) this.worker.getBuildingDetailsByAddress(this.customer.address, this.updateBuildingDetails)
      this.updateBuildingDetails(buildingDetails)
    },

    updateBuildingDetails (buildingDetails) {
      console.log('SEARCH BY ADDRESS:\n', buildingDetails)
      if (!buildingDetails) {
        this.customer.buildingId = null
        customerHandler(Object.assign(customerHandler(), { buildingId: null }))
        console.log('Building was not found by address.\nSuch building not exist.\nYou shold create new one.\n', customerHandler())
        return
      }
      this.customer.buildingId = buildingDetails._id
      buildingDetailsHandler(buildingDetails)
      this.changeUniqueCode(this.customer.apartmentNumber)
    },

    update (propName, propValue) {
      this.customer[propName] = propValue
    },

    updateBuildingId () {
      this.worker.getBuildingDetailsByAddress(this.customer.address, this.updateBuildingDetails)
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

    testForErrors () {
      if (!this.customer?.buildingId) {
        this.errorMessage = 'Building details should be saved first'
        return true
      }

      for (const fieldName in this.customerSchema) {
        const field = this.customerSchema[fieldName]

        if (field.required ? !field.value : false) {
          this.errorMessage = `${field.title} is required`
          return true
        }

        const valid = this.rules[field.type](field.value)

        if (!valid || typeof valid === 'string') {
          this.errorMessage = `${field.title} invalid`
          return true
        }
      }
      return false
    },

    createSchema () {
      if (this.customer.commercial && Object.keys(this.customer.commercial).length > 0) {
        this.customerType = true
        this.commercialSchema.companyName.value = this.customer.commercial.companyName || ''
        this.commercialSchema.companyAbn.value = this.customer.commercial.companyAbn || ''
      }
      this.customerSchema = customerSchema.customerDetails
      for (const prop in this.customerSchema) {
        this.customerSchema[prop].value = this.customer[prop]
      }
    },

    getBuildings (data) {
      this.buildings.push(...data, this.customer.address)
    },

    saveCustomerDetails () {
      if (!this.customerType) this.customer.commercial = null
      this.customer.postCode = buildingDetailsHandler().addressComponents.postCode
      this.customer._id
        ? this.__putCustomer(this.customer._id, this.customer, this.customerUpdated)
        : this.__postCustomer(this.customer, this.customerCreated)
    },

    customerUpdated (data) {
      this.$root.$emit('customer-updated', data)
    },

    customerCreated (data) {
      this.$root.$emit('customer-created', data)
    },

    close (data) {
      this.$root.$emit('customer-modified')
      this.$vuetify.goTo(0)
    }
  },

  created () {
    this.worker.getBuildingsList('lit', this.getBuildings)
  },

  mounted () {
    this.customer = customerHandler()
    this.createSchema()

    // this.$root.$on('customer-updated', this.close)
    // this.$root.$on('customer-created', this.close)

    this.$vuetify.goTo(0)
  }
}
</script>

<style>
.v-input__control {
  font-size: 14px !important;
  font-weight: bold;
}
</style>

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
.theme--light.v-application .text--primary {
  color: #900 !important;
}
</style>
