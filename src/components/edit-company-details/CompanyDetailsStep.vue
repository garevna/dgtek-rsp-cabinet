<template>
  <v-card flat class="transparent mx-auto" max-width="960" v-if="details">
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

      <v-col style="width: 480px!important">
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
          type="text"
          class="mx-auto"
          style="width: 460px!important;"
        />

        <div v-if="item.type === 'address'">
          <SimpleAutocomplete
            :value.sync="address"
            style="margin-top: -12px!important; margin-bottom: 16px!important; margin-left: -8px!important"
          />
        </div>

        <v-textarea
          v-if="item.type === 'textarea'"
          v-model="item.value"
          @input="update(propName, item.value)"
          :label="item.title"
          hide-details
          outlined
          dense
          class="mx-auto"
          style="width: 470px!important;"
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
import { schema, rules } from '@/configs'
import { messagesHandler } from '@/helpers/data-handlers'

import SimpleAutocomplete from '@/components/inputs/SimpleAutocomplete.vue'

export default {
  name: 'CompanyDetailsStep',
  components: {
    SimpleAutocomplete
  },
  props: {
    data: Object,
    step: String,
    errors: Number
  },

  data: () => ({
    ready: false,
    checkFields: [],
    editAddress: false
  }),

  computed: {
    address: {
      get () {
        return this.details.address ? this.details.address.value : ''
      },
      set (value) {
        this.details.address.value = value
        this.update('address')
      }
    },
    details: {
      get () {
        if (!this.data) return null

        Object.keys(schema[this.step])
          .forEach(key => Object.assign(schema[this.step][key], { value: this.data[key] }))

        return schema[this.step]
      }
    }
  },

  methods: {
    markField (propName) {
      return this.checkFields.includes(propName)
    },

    update (propName) {
      const { required, type, value } = this.details[propName]

      this.details[propName].error = (required && !value) || (rules[type] ? typeof rules[type](value) === 'string' : false)

      const details = Object.keys(this.details)
        .map(key => ({ [key]: this.details[key].value }))
        .reduce((res, item) => Object.assign(res, item), {})

      this.$emit('update:data', details)
      this.$emit('update:errors', Object.keys(this.details).filter(key => this.details[key].error).length)
    },

    rowHeight (item) {
      return item.type === 'textarea' ? 160 : 60
    },

    textField (item) {
      return testTextField(item.type)
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

.bordered-item {
  width: 400px;
  padding: 4px 8px;
  border: solid 1px #ccc;
  border-radius: 4px;
}

input:-webkit-autofill {
  -webkit-background-clip: text;
}
.password {
  -webkit-text-fill-color: #fff;
  color: #fff;
}
</style>
