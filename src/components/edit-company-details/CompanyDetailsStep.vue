<template>
  <v-card flat class="transparent mx-auto" max-width="700" v-if="ready">
    <v-row
      justify="center"
      v-for="(item, propName) in schema"
      :key="propName"
      class="my-0"
      :style="{ height: rowHeight(item) + 'px' }"
    >
      <v-col cols="0" md="4" class="d-none d-md-inline-block">
        <h6 class="text-right">{{ item.title }}</h6>
      </v-col>

      <v-col cols="11" md="7">
        <v-text-field
          v-if="textField(item)"
          v-model="item.value"
          @input="update(propName, item.value)"
          :label="item.title"
          :rules="[required(item), rule(item)]"
          outlined
          dense
          :type="type(item)"
        />

        <v-text-field
          v-if="propName === 'password'"
          v-model="password"
          @input="update(propName, item.value)"
          :label="item.title"
          :rules="[required(item), rule(item)]"
          outlined
          dense
          :append-icon="appendIcon(item)"
          :type="type(item)"
          @click:append="showPassword = !showPassword"
          class="password"
        />
        <v-text-field
          v-if="propName === 'passwordConfirm'"
          v-model="passwordConfirm"
          @input="update(propName, item.value)"
          :label="item.title"
          :rules="[rules.required, rule(item)]"
          outlined
          dense
          :append-icon="appendIcon(item)"
          :type="type(item)"
          @click:append="showPassword = !showPassword"
          class="password"
        />

        <GeoscapeAutocomplete
          v-if="item.type === 'address'"
          :value.sync="item.value"
          style="margin-top: -4px!important; margin-bottom: 8px!important;"
        />

        <v-textarea
          v-if="item.type === 'textarea'"
          v-model="item.value"
          :label="item.title"
          hide-details
          outlined
          dense
        />
      </v-col>

      <v-col cols="1">
        <v-icon v-if="checkFields.includes(propName)" large color="primary">
          mdi-alert-outline
        </v-icon>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

import { testTextField } from '@/helpers'
import { rules } from '@/configs'
import { messagesHandler } from '@/helpers/data-handlers'

export default {
  name: 'CompanyDetailsStep',
  components: {
    GeoscapeAutocomplete: () => import('@/components/inputs/GeoscapeAutocomplete.vue')
  },
  props: {
    data: Object,
    step: String
  },

  data: () => ({
    ready: false,
    checkFields: [],
    schema: {},
    showPassword: false,
    rules,
    password: '',
    passwordConfirm: ''
  }),

  watch: {
    data: {
      deep: true,
      immediate: true,
      handler (value) {
        if (!value) return
        this.schema = value[this.step]
        this.ready = true
      }
    }
  },

  methods: {
    markField (propName) {
      return this.checkFields.includes(propName)
    },
    appendIcon (item) {
      return item.type !== 'password' ? '' : this.showPassword ? 'mdi-eye' : 'mdi-eye-off'
    },
    type (item) {
      return item.type !== 'password' || this.showPassword ? 'text' : 'password'
    },
    update (prop, value) {
      this.schema[prop].value = this.schema[prop].type === 'password' ? '' : value
      const result = Object.assign({}, this.rspData, { [this.step]: JSON.parse(JSON.stringify(this.schema)) })
      this.$emit('update:rspData', JSON.parse(JSON.stringify(result)))
    },
    rowHeight (item) {
      return item.type === 'textarea' ? 160 : 60
    },
    textField (item) {
      return testTextField(item.type)
    },
    passwordField (item) {
      return item.type === 'password'
    },
    rule (item) {
      return item.value ? this.rules[item.type] : value => true
    },
    required (item) {
      return item.required ? this.rules.required : value => true
    }
  },

  mounted () {
    this.checkFields = messagesHandler().filter(message => message.type === 'update-company-details')
      .flatMap(message => message.fields)
      .filter(field => field.section === this.step)
      .map(item => item.field)
  }
}
</script>

<style>

input:-webkit-autofill {
  -webkit-background-clip: text;
}
.password {
  -webkit-text-fill-color: #fff;
}
</style>
