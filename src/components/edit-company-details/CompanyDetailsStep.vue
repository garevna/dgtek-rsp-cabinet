<template>
  <v-card flat class="transparent mx-auto" max-width="700" v-if="ready">
    <v-row
      v-for="(item, propName) in schema"
      :key="propName"
      class="my-0"
      :style="{ height: rowHeight(item) + 'px' }"
    >
      <v-col cols="0" md="4" class="d-none d-md-inline-block">
        <h6 class="text-right">{{ item.title }}</h6>
      </v-col>
      <v-col cols="12" sm="8">
        <v-text-field
          v-if="textField(item)"
          v-model="item.value"
          @input="update(propName, item.value)"
          :label="item.title"
          :rules="[rules.required, rule(item)]"
          outlined
          dense
          :append-icon="appendIcon(item)"
          :type="type(item)"
          @click:append="showPassword = !showPassword"
        />
        <InputWithAutocomplite
          v-if="item.type === 'address'"
          :address.sync="item.value"
          style="display: block;"
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
    </v-row>
  </v-card>
</template>

<script>

// import { /* schema, */ patterns } from '@/configs'
// import { validateABN } from '@/helpers'

import { rules } from '@/configs'

export default {
  name: 'CompanyDetailsStep',
  components: {
    InputWithAutocomplite: () => import('@/components/edit-company-details/InputWithAutocomplite.vue')
  },
  props: {
    rspData: Object,
    step: String
  },
  data: () => ({
    ready: false,
    schema: {},
    showPassword: false,
    rules
    // rules: {
    //   required: value => !!value || 'Required.',
    //   'simple-text': value => true,
    //   number: value => patterns.number.test(value) || 'Invalid number.',
    //   phone: value => patterns.phone.test(value) || 'Invalid phone number.',
    //   email: value => patterns.email.test(value) || 'Invalid e-mail.',
    //   state: value => patterns.state.indexOf(value) !== -1 || 'Invalid state.',
    //   postcode: value => patterns.postcode.test(value) || 'Invalid state.',
    //   abn: value => validateABN(value) || 'Invalid ABN.',
    //   url: value => patterns.url.test(value) || 'Invalid URL.',
    //   login: value => value.length > 5 || 'Invalid login',
    //   password: value => patterns.password.test(value) || 'Password is not strong enough.'
    // }
  }),
  computed: {
    //
  },
  watch: {
    rspData: {
      deep: true,
      immediate: true,
      handler (value) {
        if (!value) return
        this.schema = JSON.parse(JSON.stringify(value[this.step]))
        this.ready = true
      }
    },
    schema: {
      deep: true,
      handler (val) {
        console.log(val)
      }
    }
  },
  methods: {
    appendIcon (item) {
      return item.type !== 'password' ? '' : this.showPassword ? 'mdi-eye' : 'mdi-eye-off'
    },
    type (item) {
      return item.type !== 'password' || this.showPassword ? 'text' : 'password'
    },
    update (prop, value) {
      this.schema[prop].value = value
      const result = Object.assign({}, this.rspData, { [this.step]: JSON.parse(JSON.stringify(this.schema)) })
      this.$emit('update:rspData', JSON.parse(JSON.stringify(result)))
    },
    rowHeight (item) {
      return item.type === 'textarea' ? 160 : 60
    },
    textField (item) {
      return ['simple-text', 'url', 'phone', 'email', 'abn', 'state', 'postcode', 'number', 'login', 'password'].indexOf(item.type) !== -1
    },
    rule (item) {
      return this.rules[item.type]
    }
    // validateABN (abn) {
    //   if (!abn) return false
    //   const weight = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
    //   const res = abn.split('')
    //     .map((item, index) => item - (index === 0 ? 1 : 0))
    //     .reduce((result, item, index) => result + item * weight[index], 0)
    //   return res % 89 === 0
    // }
  }
}
</script>

<style scoped>
</style>
