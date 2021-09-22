<template>
  <v-card flat class="manual-input-address mx-auto">
    <v-row justify="center" align="center">
      <v-btn v-if="!show" outlined @click="show = true">
        <v-icon>mdi-keyboard</v-icon>
        Type the building address manually
      </v-btn>
    </v-row>
    <v-row v-if="show" justify="center">
      <v-col cols="8">
        <h5>{{ address }}</h5>
      </v-col>
      <v-col cols="3">
        <v-btn :disabled="!ready" outlined @click="submit" color="primary">SUBMIT</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="show" justify="center">
      <table class="mt-8">
        <thead>
          <tr>
            <th v-for="(prop, propName) in addressComponents" :key="propName" :width="prop.width">
              <small>{{ prop.title }}</small>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="(prop, propName) in addressComponents" :key="propName">
              <v-text-field
                v-if="prop.type === 'simple-text' || prop.type === 'post-code'"
                v-model="prop.value"
                outlined
                hide-details
                dense
                :rules="[rules.required, prop.type === 'post-code' ? rules.postCode : val => true]"
              />
              <v-combobox
                v-if="prop.type === 'combo'"
                v-model="prop.value"
                :items="prop.available"
                outlined
                dense
                hide-details
              ></v-combobox>
            </td>
          </tr>
        </tbody>
      </table>
    </v-row>
  </v-card>
</template>

<script>

import { availableStreetTypes } from '@/configs'

export default {
  name: 'InputAddressByParts',

  props: ['value', 'components'],

  data: () => ({
    show: false,
    addressComponents: {
      number: {
        title: 'Street number',
        type: 'simple-text',
        required: true,
        width: 80,
        value: ''
      },
      street: {
        title: 'Street name',
        type: 'simple-text',
        required: true,
        width: 240,
        value: ''
      },
      streetType: {
        title: 'Street type',
        type: 'combo',
        available: availableStreetTypes,
        required: true,
        width: 100,
        value: 'ST'
      },
      city: {
        title: 'Locality name',
        type: 'simple-text',
        required: true,
        width: 240,
        value: ''
      },
      postCode: {
        title: 'Postcode',
        type: 'post-code',
        required: true,
        width: 120,
        value: ''
      },
      state: {
        title: 'State territory',
        type: 'combo',
        available: ['VIC', 'NSW', 'QLD', 'SA', 'TAS', 'WA', 'ACT', 'NT'],
        required: true,
        width: 100,
        value: 'VIC'
      }
    },
    rules: {
      required: value => !!value || 'Required.',
      counter: value => value.length <= 20 || 'Max 20 characters',
      postCode: value => {
        const pattern = /^(?:(?:[2-8]\d|9[0-7]|0?[28]|0?9(?=09))(?:\d{2}))$/
        return pattern.test(value) || 'Invalid postcode.'
      }
    }
  }),
  computed: {
    ready () {

    },
    address () {
      const { number, street, streetType, city, state, postCode } = this.addressComponents
      return `${number.value} ${street.value.toUpperCase()} ${streetType.value}, ${city.value.toUpperCase()} ${state.value} ${postCode.value}`
    }
  },
  watch: {
    address (val) {
      this.$emit('update:value', val)
    }
  },
  methods: {
    submit () {
      this.$emit('update:value', this.address)
    }
  }
}
</script>

<style scoped>
.manual-input-address {
  border: solid 1px #aaa;
  border-radius: 4px;
  padding-bottom: 48px;
  padding-top: 32px;
  background: #eee;
  max-width: 1400px;
  min-width: 960px;
}
</style>
