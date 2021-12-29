<template>
  <v-row v-if="customersListReady">
    <v-select
      :items="customersList"
      label="Customer address"
      @change="selectCustomer"
      item-text="address"
      item-value="customerId"
      outlined
      dense
      clearable
      :menu-props="{ bottom: true, offsetY: true }"
      style="width: 420px"
    ></v-select>

    <v-select
      :items="priorities"
      label="Priority"
      @change="selectPriority"
      outlined
      clearable
      dense
      :menu-props="{ bottom: true, offsetY: true }"
      style="max-width: 160px"
    ></v-select>

    <v-select
      :items="severities"
      label="Severity"
      @change="selectSeverity"
      outlined
      dense
      clearable
      :menu-props="{ bottom: true, offsetY: true }"
      style="max-width: 160px"
    ></v-select>
  </v-row>
</template>

<script>

export default {
  name: 'Filters',

  props: ['customer', 'severity', 'priority', 'customers'],

  data: () => ({
    severities: ['High', 'Medium', 'Low'],
    priorities: ['High', 'Medium', 'Low'],
    customersList: [],
    customersListReady: false
  }),

  computed: {
    localValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('update:value', val)
      }
    }
  },

  methods: {
    getCustomersList (data) {
      this.customersList = data
      this.customersListReady = true
    },

    selectCustomer (customerId) {
      this.$emit('update:customer', customerId)
    },

    selectPriority (priority) {
      this.$emit('update:priority', priority)
    },

    selectSeverity (severity) {
      this.$emit('update:severity', severity)
    }
  },

  mounted () {
    this.__getFilteredShortListOfCustomers(this.customers, this.getCustomersList)
  }
}
</script>
