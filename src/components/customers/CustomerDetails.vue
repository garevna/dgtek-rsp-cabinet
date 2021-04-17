<template>
  <v-card flat height="70vh" width="100%">
    <v-toolbar class="transparent" style="box-shadow: none">
      <v-spacer />
      <v-btn icon large>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card flat class="transparent ma-12 px-12">
      <v-row>
        <SwitchValues
          label="Residential/commercial"
          :value.sync="customerType"
          :states="['residential', 'commercial']"
        />
      </v-row>
      <v-row
        v-for="(prop, propName) in customer"
        :key="propName"
        class="my-0"
      >
        <v-col cols="0" md="4" class="d-none d-md-inline-block">
          <h6 class="text-right">{{ prop.title }}</h6>
        </v-col>
        <v-col cols="12" sm="8">
          <v-text-field
            v-if="textField(item)"
            v-model="prop.value"
            @input="update(propName, prop.value)"
            :label="prop.title"
            :rules="[prop.required ? rules.required : (value) => true, rule(prop)]"
            outlined
            dense
            :append-icon="appendIcon(prop)"
            :type="type(prop)"
            @click:append="showPassword = !showPassword"
          />

          <!-- <InputWithAutocomplite
            v-if="item.type === 'address'"
            :address.sync="item.value"
            style="display: block;"
          /> -->
          <GeoscapeAutocomplete
            v-if="prop.type === 'address'"
            :value.sync="prop.value"
            style="margin-top: -14px!important; margin-bottom: 8px!important;"
          />

          <v-textarea
            v-if="item.type === 'textarea'"
            v-model="prop.value"
            :label="prop.title"
            hide-details
            outlined
            dense
          />
        </v-col>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>

import { customerSchema } from '@/configs'
import { SwitchValues } from '@/components/inputs'

export default {
  name: 'CustomerDetails',
  components: {
    GeoscapeAutocomplete: () => import('@/components/inputs/GeoscapeAutocomplete.vue'),
    SwitchValues
  },
  prop: {
    customerId: [String, Number],
    dialog: Boolean
  },
  data: () => ({
    ready: null,
    customer: null,
    customerType: false,
    tmp: { companyName: '', companyAbn: '' }
  }),
  computed: {
    // commercial: {
    //   get () {
    //     if ()
    //     return this
    //   }
    // }
  },
  watch: {
    customerId (val) {
      if (!val) {
        this.createNewCustomer()
      } else {
        this.__getCustomerData(val)
      }
    },
    customerType (val) {
      if (!this.ready) return
      if (!val) {
        this.tmp = {
          companyName: this.customer.commercial.companyName.value,
          companyAbn: this.customer.commercial.companyAbn.value
        }
        this.customer.commercial = null
      } else {
        this.customer.commercial = {
          companyName: {
            title: 'Company name',
            type: 'simple-text',
            value: this.tmp.companyName
          },
          companyAbn: {
            title: 'Company ABN',
            type: 'abn',
            value: this.tmp.companyAbn
          }
        }
      }
    }
  },
  methods: {
    getData (data) {
      console.log(data)
      const { commercial, ...rest } = data.result
      this.customer = customerSchema
      for (const key in rest) {
        this.customer[key].value = rest[key]
      }
      if (commercial) {
        this.customer.commecial.companyName.value = commercial.companyName
        this.customer.commecial.companyAbn.value = commercial.companyAbn
      } else { this.customer.commecial = null }

      console.log('CUSTOMER:\n', this.customer)

      this.ready = true
    }
  },
  mounted () {
    this.$on('customer-data-received', this.getData)
    this.__getCustomerData(this.customerId)
  }
}
</script>
