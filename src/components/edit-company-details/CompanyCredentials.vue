<template>
  <v-card flat class="transparent mx-auto" max-width="700" v-if="details">
    <v-row
      justify="center"
      v-for="(item, propName) in details"
      :key="propName"
      class="my-4"
      :style="{ height: rowHeight(item) + 'px' }"
    >
      <v-col cols="0" md="4" class="d-none d-md-inline-block">
        <h6 class="text-right">{{ item.title }}</h6>
      </v-col>

      <v-col cols="11" md="7">
        <v-text-field
          v-if="textField(item)"
          v-model="item.value"
          @input="update(propName)"
          :label="item.title"
          :rules="[required(item), rule(item)]"
          outlined
          dense
          :prefix="item.prefix"
          :hint="item.hint"
          :error="item.error"
          :type="type(item)"
        />

        <v-text-field
          v-if="propName === 'password'"
          v-model="item.value"
          @input="updatePassword()"
          :label="item.title"
          outlined
          dense
          :hint="passwordHint"
          :error="item.error"
          :append-icon="appendIcon(item)"
          :type="type(item)"
          @click:append="showPassword = !showPassword"
          class="password"
        />
        <v-text-field
          v-if="propName === 'passwordConfirm'"
          v-model="item.value"
          :disabled="!passwordValid"
          @input="updateConfirmPassword()"
          :label="item.title"
          outlined
          dense
          :hint="confirmPasswordHint"
          :error="item.error"
          :append-icon="appendIcon(item)"
          :type="type(item)"
          @click:append="showPassword = !showPassword"
          class="password"
        />
      </v-col>

      <v-col cols="1">
        <v-icon v-if="checkFields.includes(propName)" large color="#fff">
          mdi-alert-outline
        </v-icon>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-btn v-if="!errors.length" text outlined class="mt-12" @click="saveCredentials">
        SAVE
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>

import { testTextField } from '@/helpers'
import { schema, rules } from '@/configs'
import { messagesHandler } from '@/helpers/data-handlers'

export default {
  name: 'CompanyCredentials',

  props: { data: Object },

  data: () => ({
    ready: false,
    errors: 0,
    checkFields: [],
    showPassword: false,
    passwordValid: false,
    passwordHint: '',
    confirmPasswordHint: '',
    passwordDefaultHint: '8-15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',
    confirmPasswordDefaultHint: 'Repeat the password'
  }),

  computed: {
    details: {
      get () {
        if (!this.data) return null

        Object.keys(schema.userInfo)
          .forEach(key => Object.assign(schema.userInfo[key], { value: schema.userInfo[key].type === 'password' ? '' : this.data[key] }))

        return schema.userInfo
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

    updatePassword () {
      const password = this.details.password.value
      const test = typeof rules.password(password) === 'string'
      this.details.password.error = password && test
      this.passwordHint = !password ? this.passwordDefaultHint : test ? rules.password(password) : 'OK'
      this.passwordValid = !this.details.password.error
    },

    updateConfirmPassword () {
      const password = this.details.passwordConfirm.value
      const test = password === this.details.password.value
      this.details.passwordConfirm.error = password && test
      this.confirmPasswordHint = !password ? this.confirmPasswordDefaultHint : test ? 'OK' : 'Not match'
    },

    update (propName) {
      const { required, type, value } = this.details[propName]

      this.details[propName].error = (required && !value) || (rules[type] ? typeof rules[type](value) === 'string' : false)

      const details = Object.keys(this.details)
        .map(key => ({ [key]: this.details[key].value }))
        .reduce((res, item) => Object.assign(res, item), {})

      this.$emit('update:data', details)
      this.errors = Object.keys(this.details).filter(key => this.details[key].error).length
    },

    saveCredentials () {
      const { login, phoneNumber, password } = this.details

      this.__updateClientCredentials({
        login: login.value,
        phoneNumber: phoneNumber.value,
        password: password.value
      }, this.callback)
    },

    callback (credentials) {
      sessionStorage.setItem('refresh', credentials)
    },

    rowHeight (item) {
      return item.type === 'textarea' ? 160 : item.type === 'password' ? 80 : 60
    },

    textField (item) {
      return testTextField(item.type)
    },
    passwordField (item) {
      return item.type === 'password'
    },
    rule (item) {
      return item.value ? rules[item.type](item.value) : value => true
    },
    required (item) {
      return item.required ? rules.required(item.value) : value => true
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
  color: #fff;
}
</style>
