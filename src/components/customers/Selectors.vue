<template>
  <v-row justify="center" class="mt-8 mb-2 ml-5">
    <table>
      <tbody>
        <tr>
          <td>
            <v-text-field
              v-model="localSearch"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              dense
              outlined
              style="display: inline-block; width: 280px"
            ></v-text-field>
          </td>
          <td>
            <v-select
              :items="statuses"
              v-model="localStatus"
              label="Service status"
              outlined
              clearable
              dense
              color="primary"
              class="selector-content"
              style="width: 200px"
              :menu-props="{ maxHeight: 360 }"
            ></v-select>
          </td>
          <td>
            <v-select
              :items="speeds"
              v-model="localSpeed"
              label="Service speed"
              outlined
              clearable
              dense
              color="primary"
              class="selector-content"
              style="width: 140px"
              bottom
              :offset-y="true"
            ></v-select>
          </td>
          <td>
            <v-select
              :items="plans"
              v-model="localPlan"
              label="Plan"
              outlined
              clearable
              dense
              color="primary"
              class="selector-content"
              style="width: 120px"
              bottom
              :offset-y="true"
            ></v-select>
          </td>
          <td>
            <v-select
              :items="postalCodes"
              v-model="localPostCode"
              label="Post code"
              outlined
              clearable
              dense
              color="primary"
              class="selector-content"
              style="width: 140px"
              bottom
              :offset-y="true"
            ></v-select>
          </td>
        </tr>
      </tbody>
    </table>
    <v-spacer />
    <v-btn text @click="gotoCheckAddressPage" class="mr-12 mb-5">
      <v-icon>mdi-plus</v-icon>
      Add new customer
    </v-btn>
    <v-btn text @click="refreshCustomersList" class="mr-12 mb-5">
      <v-icon>mdi-refresh</v-icon>
      Refresh
    </v-btn>
  </v-row>
</template>

<script>

export default {
  name: 'Selectors',

  props: ['status', 'speed', 'plan', 'postCode', 'postalCodes', 'plans', 'refresh', 'search'],

  data: () => ({
    statuses: [],
    speeds: ['50/50', '150/150', '250/250', '500/500', '1000/1000']
  }),

  computed: {
    localSearch: {
      get () {
        return this.search
      },
      set (value) {
        this.$emit('update:search', value)
      }
    },

    localStatus: {
      get () {
        return this.status
      },
      set (value) {
        this.$emit('update:status', value)
      }
    },

    localSpeed: {
      get () {
        return this.speed
      },
      set (value) {
        this.$emit('update:speed', value)
      }
    },

    localPlan: {
      get () {
        return this.plan
      },
      set (value) {
        this.$emit('update:plan', value)
      }
    },

    localPostCode: {
      get () {
        return this.postCode
      },
      set (value) {
        this.$emit('update:postCode', value)
      }
    }
  },

  methods: {
    refreshCustomersList () {
      this.$emit('update:refresh', true)
      this.__refreshCustomers()
    },

    gotoCheckAddressPage () {
      this.$root.$emit('go-to-check-address')
    },

    setAvailableServiceStatus (data) {
      this.statuses = data
    }
  },

  beforeMount () {
    this.__getAvailableServiceStatus(this.setAvailableServiceStatus)
  }
}
</script>

<style>
.v-menu__content {
  margin-top: 40px !important;
  /* vertical-align: top !important; */
}
</style>
