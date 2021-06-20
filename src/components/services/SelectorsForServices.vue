<template>
  <v-row justify="center" class="mt-8 mb-2">
    <table>
      <tbody>
        <tr>
          <td>
            <v-select
              :items="types"
              v-model="localType"
              label="Type (residential/commercial)"
              outlined
              clearable
              dense
              color="primary"
              style="width: 270px"
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
              style="width: 180px"
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
              style="width: 120px"
            ></v-select>
          </td>
          <td>
            <v-select
              :items="contractTerms"
              v-model="localContractTerm"
              label="Contract terms"
              outlined
              clearable
              dense
              color="primary"
              style="width: 140px"
            ></v-select>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <v-spacer />
    <v-btn text @click="refreshCustomersList" class="mr-12 mb-5">
      <v-icon>mdi-refresh</v-icon>
      Refresh
    </v-btn> -->
  </v-row>
</template>

<script>

export default {
  name: 'SelectorsForServices',

  props: ['type', 'speed', 'plan', 'plans', 'contractTerm', 'contractTerms'],

  data: () => ({
    types: ['residential', 'commercial'],
    speeds: ['50/50', '150/150', '250/250', '500/500', '1000/1000']
  }),

  computed: {
    localType: {
      get () {
        return this.type
      },
      set (value) {
        this.$emit('update:type', value)
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
    localContractTerm: {
      get () {
        return this.contractTerm
      },
      set (value) {
        this.$emit('update:contractTerm', value)
      }
    }
  },

  methods: {
    refreshCustomersList () {
      this.$emit('update:refresh', true)
      this.__refreshCustomers()
    }
  }
}
</script>
