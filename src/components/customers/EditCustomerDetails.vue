<template>
    <v-card flat class="transparent mx-auto" v-if="ready">
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
            <td class="d-none d-md-flex pt-4">
              <v-badge
                v-if="fieldsToUpdate.map(item => item.field).includes('companyName')"
                dark
                :color="badgeColors.companyName"
                icon="mdi-alert-circle-outline"
              >
                Company name {{ fieldsToUpdate.map(item => item.field).includes('companyName') }}
              </v-badge>
              <span v-else>
                Company name
              </span>
            </td>
            <td colspan="2">
              <v-text-field
                v-model="commercial.companyName.value"
                @input="updateCompanyName($event)"
                label="Company name"
                :rules="[rules.required]"
                outlined
                dense
                hide-details
              />
            </td>
          </tr>
          <tr v-if="customerType">
            <td class="d-none d-md-flex pt-4">
              <v-badge
                v-if="fieldsToUpdate.map(item => item.field).includes('companyAbn')"
                dark
                :color="badgeColors.companyAbn"
                icon="mdi-alert-circle-outline"
              >
                Company ABN
              </v-badge>
              <span v-else>
                Company ABN
              </span>
            </td>
            <td colspan="2">
              <v-text-field
                v-model="commercial.companyAbn.value"
                @input="updateCompanyABN($event)"
                label="Company ABN"
                :rules="[rules.required, rules.abn]"
                outlined
                dense
              />
            </td>
          </tr>
          <tr>
            <td class="d-none d-md-flex"></td>
            <td><span>Apartment number</span></td>
            <td><span>Building address</span></td>
          </tr>

          <tr v-if="customer">
            <td class="d-none d-md-flex pt-4">
              <v-badge
                v-if="fieldsToUpdate.map(item => item.field).includes('address')"
                dark
                :color="badgeColors.address"
                icon="mdi-alert-circle-outline"
              >
                Address
              </v-badge>
              <span v-else> Address </span>
            </td>
            <td width="160">
              <v-text-field
                v-model="customer.apartmentNumber"
                @input="updateAddress"
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
          <tr v-for="(prop, propName) in customerDetails" :key="propName">
            <td class="d-none d-md-flex pt-4">
              <v-badge
                v-if="prop.requestForUpdate"
                dark
                :color="badgeColors[propName]"
                icon="mdi-alert-circle-outline"
              >
                {{ prop.title }}
              </v-badge>
              <div v-else>
                <span>{{ prop.title }}</span>
              </div>
            </td>
            <td colspan="2">
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
              />
              <v-text-field
                v-else
                v-model="prop.value"
                :disabled="propName === 'uniqueCode'"
                @input="update(propName, prop.value)"
                :label="prop.title"
                :rules="[prop.required ? rules.required : (value) => true, rule(prop)]"
                outlined
                dense
                hide-details
              />
            </td>
          </tr>

          <tr style="height: 48px;"></tr>

          <tr style="margin-top: 48px!important">
            <td colspan="3" class="text-right">
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

import {
  partnerUniqueCodeHandler,
  customerHandler,
  buildingDetailsHandler,
  messagesHandler
} from '@/helpers/data-handlers'

const { customerDetails, commercial } = customerSchema

const [updatedColor, updateNeededColor] = ['#09b', '#a00']

export default {
  name: 'EditCustomerDetails',

  components: {
    SwitchValues,
    DatePicker
  },

  props: ['dialog'],

  data: () => ({
    ready: true,
    worker: window[Symbol.for('map.worker')],
    customer: customerHandler(),
    requestToUpdateAddress: false,
    fieldsToUpdate: [],
    customerDetails: JSON.parse(JSON.stringify(customerDetails)),
    commercial: JSON.parse(JSON.stringify(commercial)),
    rules: rules,
    buildings: [],
    customerType: null,
    errorMessage: '',
    uniqueCode: '',

    badgeColors: {},
    messageId: null
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
          this.customer.commercial = this.commercial
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
      this.customerDetails.uniqueCode.value = this.customer.uniqueCode
    },

    getBuildingById (buildingDetails) {
      if (!buildingDetails) this.worker.getBuildingDetailsByAddress(this.customer.address, this.updateBuildingDetails)
      this.updateBuildingDetails(buildingDetails)
    },

    updateBuildingDetails (buildingDetails) {
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

    changeBadgeColor (propName) {
      const index = this.fieldsToUpdate.findIndex(item => item.field === propName)
      if (index !== -1) {
        Object.assign(this.fieldsToUpdate[index], { updated: new Date().toISOString().slice(0, 10) })
        Object.assign(this.badgeColors, { [propName]: updatedColor })
      }
    },

    update (propName, propValue) {
      this.customer[propName] = propValue
      this.changeBadgeColor(propName)
    },

    updateCompanyName (value) {
      this.changeBadgeColor('companyName')
    },

    updateCompanyABN (value) {
      this.changeBadgeColor('companyAbn')
    },

    updateAddress (value) {
      this.changeBadgeColor('address')
    },

    updateBuildingId () {
      this.worker.getBuildingDetailsByAddress(this.customer.address, this.updateBuildingDetails)
      this.changeBadgeColor('address')
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

      for (const fieldName in this.customerDetails) {
        const field = this.customerDetails[fieldName]

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
        this.commercial.companyName.value = this.customer.commercial.companyName || ''
        this.commercial.companyAbn.value = this.customer.commercial.companyAbn || ''
      }

      for (const propName in this.customerDetails) {
        this.customerDetails[propName].value = this.customer[propName]
      }
    },

    getBuildings (data) {
      this.buildings.push(...data, this.customer.address)
    },

    saveCustomerDetails () {
      if (this.messageId) this.__updateMessage(this.messageId, this.fieldsToUpdate)

      this.customer.commercial = !this.customerType ? null
        : ({ companyName: this.commercial.companyName.value, companyAbn: this.commercial.companyAbn.value })
      this.customer.postCode = buildingDetailsHandler().addressComponents.postCode

      this.customer.status = Date.now()

      this.customer._id
        ? this.__putCustomer(this.customer._id, this.customer, this.customerUpdated)
        : this.__postCustomer(this.customer, this.customerCreated)
    },

    customerUpdated (data) {
      this.$root.$emit('customer-updated', data)
    },

    customerCreated (customerId) {
      this.$root.$emit('customer-created', customerId)
    },

    findMessage () {
      return messagesHandler().find(message => message.type === 'update-customer-details' && message.customerId === this.customer._id)
    },

    findIndex (data) {
      return data.findIndex(message => message.type === 'update-customer-details' && message.customerId === this.customer._id)
    },

    setFieldsToUpdate () {
      this.ready = false
      const checkRecord = this.findMessage()

      if (checkRecord) {
        [this.messageId, this.fieldsToUpdate] = [checkRecord._id, checkRecord.fields]

        this.fieldsToUpdate = JSON.parse(JSON.stringify(checkRecord.fields))

        for (const item of this.fieldsToUpdate) {
          Object.assign(this.badgeColors, { [item.field]: item.updated ? updatedColor : updateNeededColor })
        }

        const fields = this.fieldsToUpdate.map(item => item.field)

        this.requestToUpdateAddress = this.fieldsToUpdate.map(item => item.field).includes('address')

        Object.keys(this.customerDetails).forEach(key => Object.assign(this.customerDetails[key], {
          requestForUpdate: fields.includes(key)
        }))
      }

      this.$nextTick(() => { this.ready = true })
    },

    refreshFieldsToUpdate (data) {
      if (!data) return
      this.setFieldsToUpdate()
    },

    getCustomerUpdates (data) {
      if (!data) return
      const customer = data.find(item => item._id === this.customer._id)
      if (customer) customerHandler(customer)
      Object.assign(this.customer, customerHandler())
      this.createSchema()
    }
  },

  beforeDestroy () {
    this.$root.$off('messages-updates-received', this.refreshFieldsToUpdate)
    this.$root.$off('customers-updates-received', this.getCustomerUpdates)
  },

  beforeMount () {
    this.worker.getBuildingsList('lit', this.getBuildings)
  },

  mounted () {
    this.customer = customerHandler()
    this.createSchema()
    this.__refreshMessages(this.setFieldsToUpdate)

    this.$root.$on('messages-updates-received', this.refreshFieldsToUpdate)
    this.$root.$on('customers-updates-received', this.getCustomerUpdates)

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
