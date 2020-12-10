<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="homefone">
        <v-toolbar-title class="primary--text text-center mx-auto my-0">Settings</v-toolbar-title>
        <v-btn icon dark color="primary" @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container>
        <v-row class="mt-16">
          <v-col cols="12" offset-md="3" md="6" v-if="user">
            <v-form ref="form-profile">
              <v-text-field
                color="success"
                label="full name"
                v-model="RSP.fullName"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                color="success"
                label="login"
                v-model="RSP.login"
                :rules="[rules.required]"
              />
              <v-text-field
                color="success"
                label="company name"
                v-model="RSP.companyName"
                :rules="[rules.required]"
              />
              <v-text-field
                color="success"
                label="ABN"
                v-model="RSP.ABN"
                :rules="[rules.required, rules.abnRule1, rules.abnRule2]"
              />
              <v-text-field
                color="success"
                label="contact phone"
                v-model="RSP.contactPhone"
                :rules="[rules.required, rules.phoneRule1]"
              ></v-text-field>
              <v-text-field
                color="success"
                label="contact email"
                v-model="RSP.email"
                :rules="[rules.required, rules.emailRule1]"
              ></v-text-field>
            </v-form>
            <v-card flat class="transparent d-flex justify-center">
              <v-btn color="buttons" dark @click="cancelChanges" class="mr-4"
                >cancel changes</v-btn
              >
              <v-btn color="buttons" dark @click="confirmChanges" class="ml-4"
                >confirm changes</v-btn
              >
            </v-card>
          </v-col>
          <v-col v-else cols="12">
            <h2 class="text-center py-8">Profile data missing</h2>
          </v-col>
          <v-snackbar v-model="snackbar" :timeout="timeout" :color="color" top>
            {{ text }}
            <template v-slot:action="{ attrs }">
              <v-btn
                color="blue"
                class="close-icon-snackbar"
                icon
                v-bind="attrs"
                @click="snackbar = false"
              >
                <v-icon large>mdi-close</v-icon>
              </v-btn>
            </template>
          </v-snackbar>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<style>
</style>
<script>
// import { mapState } from 'vuex'

export default {
  name: 'Profile',
  props: ['dialog', 'user'],
  components: {},
  data () {
    return {
      RSP: {
        fullName: '',
        login: '',
        companyName: '',
        ABN: '',
        contactPhone: '',
        email: ''
      },
      snackbar: false,
      text: '',
      timeout: 8000,
      color: 'green',
      rules: {
        required: v => !!v || 'input is required',
        minPass: v => v.length >= 8 || 'Min 8 characters',
        abnRule1: value => {
          const pattern = /^[0-9]{11}$/gm
          return pattern.test(value.split(' ').join('')) || 'Invalid ABN number'
        },
        abnRule2: value => {
          const weight = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
          const array = value
            .split(' ')
            .join('')
            .split('')
          array.unshift(array.shift() - 1)
          const result = array.reduce((accum, item, index) => {
            return accum + item * weight[index]
          }, 0)
          const abnError = result % 89 !== 0
          return !abnError || 'Invalid ABN number'
        },
        phoneRule1: value => {
          const pattern = /^[0-9]{10,12}$/gm
          const phoneError = !pattern.test(value.split(' ').join(''))
          return !phoneError || 'Invalid phone number'
        },
        emailRule1: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          const emailError = !pattern.test(value)
          return !emailError || 'Invalid e-mail'
        }
      }
    }
  },
  computed: {
    // ...mapState('auth', ['user', 'authLoading'])
  },
  methods: {
    compare () {
      return Object.keys(this.RSP).some(key => this.RSP[key] !== this.user[key])
    },
    confirmChanges () {
      if (this.$refs['form-profile'].validate()) {
        if (this.compare()) {
          this.$store.dispatch('auth/EDIT_USER', this.RSP)
          this.$emit('update:dialog', false)
        } else {
          this.text = 'nothing to change'
          this.color = 'red'
          this.snackbar = true
        }
      }
    },
    closeDialog () {
      if (this.compare()) {
        this.text = 'please, save data or cancel'
        this.color = 'red'
        this.snackbar = true
      } else {
        this.$emit('update:dialog', false)
      }
    },
    cancelChanges () {
      if (!this.compare()) return
      this.fillProfile()
      this.text = 'changes canceled'
      this.color = 'green'
      this.snackbar = true
      this.$refs['form-profile'].validate()
    },
    fillProfile () {
      if (this.user) {
        Object.keys(this.RSP).forEach(key => {
          this.RSP[key] = this.user[key]
        })
      }
    }
  },
  created () {
    this.fillProfile()
  }
}
</script>
