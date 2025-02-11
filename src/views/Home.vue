<template>
  <v-container fluid class="homefone">
    <v-stepper v-model="step" class="homefone" style="box-shadow: none;">
      <v-stepper-items flat class="page-content transparent mt-6 mb-12">
        <transition name="current-component">
          <component :is="currentComponent" v-bind="currentProperties" />
        </transition>
      </v-stepper-items>
    </v-stepper>

    <v-row justify="center" class="homefone py-12 mx-0 px-0" v-if="showMainMenu">
      <v-stepper-header
        elevation="0"
        class="homefone text-center mx-auto d-none d-md-block"
        style="box-shadow: none; position: fixed; top: 100px; width: 100%; height: 48px; z-index: 12;"
      >
        <v-btn
          class="mx-1"
          :class="{ active: first, tab: !first }"
          @click="step = 1"
        >
          {{ stepsNames[0] }}
        </v-btn>

        <v-btn
          class="mx-1"
          :class="{ active: third, tab: !third }"
          @click="step = 3"
        >
          {{ stepsNames[2] }}
        </v-btn>

        <v-btn
          v-if="refreshed.customers"
          class="mx-1"
          :class="{ active: fourth, tab: !fourth }"
          @click="step = 4"
        >
          {{ stepsNames[3] }}
        </v-btn>

        <v-btn
          v-if="refreshed.services"
          class="mx-1"
          :class="{ active: fifth, tab: !fifth }"
          @click="step = 5"
        >
          {{ stepsNames[4] }}
        </v-btn>

        <v-btn
          v-if="refreshed.tickets"
          class="mx-1"
          :class="{ active: six, tab: !six }"
          @click="step = 6"
        >
          {{ stepsNames[5] }}
        </v-btn>

        <v-btn
          v-if="refreshed.documents"
          class="mx-1"
          :class="{ active: seven, tab: !seven }"
          @click="step = 7"
        >
          {{ stepsNames[6] }}
        </v-btn>

        <v-btn
          v-if="refreshed.rsp"
          class="mx-1"
          :class="{ active: second, tab: !second }"
          @click="step = 2"
        >
            {{ stepsNames[1] }}
          </v-btn>
      </v-stepper-header>
    </v-row>

    <v-bottom-navigation fixed flat height="24">
        <v-row justify="center" class="mx-0 px-0" style="width: 100%; background: #aaa;">
          <p class="text-center" style="color: #efefef;">
            <small>
              <sub>2021 &copy; Dgtek Pty. Ltd ABN 61 600 896 115</sub>
            </small>
          </p>
        </v-row>
    </v-bottom-navigation>
    <Calculator :drawer.sync="calculator" role="rsp" />
  </v-container>
</template>

<script>

import {
  Dashboard,
  CompanyDetails,
  CheckAddress,
  Services,
  Tickets,
  Documents
} from '@/components/dashboard'

import CustomersList from '@/components/customers/CustomersList.vue'
import CustomerDetails from '@/components/customers/CustomerDetails.vue'
import TicketDetails from '@/components/tickets/TicketDetails.vue'

import Calculator from '@/views/Calculator.vue'

import { stepsNames } from '@/configs'

const { refreshSettings } = require('@/controllers/actions').actions

export default {
  name: 'Home',

  components: {
    Calculator
  },

  data: () => ({
    calculator: false,
    step: 1,
    stepsNames: stepsNames,

    customerId: null,

    showMainMenu: true,

    refreshed: {
      rsp: false,
      services: false,
      tickets: false,
      customers: false,
      documents: true
    },

    pages: [
      Dashboard,
      CompanyDetails,
      CheckAddress,
      CustomersList,
      Services,
      Tickets,
      Documents,
      CustomerDetails
    ],

    currentComponent: Dashboard,
    transitions: null
  }),

  computed: {
    first () {
      return this.step === 1
    },
    second () {
      return this.step === 2
    },
    third () {
      return this.step === 3
    },
    fourth () {
      return this.step === 4
    },
    fifth () {
      return this.step === 5
    },
    six () {
      return this.step === 6
    },
    seven () {
      return this.step === 7
    },
    eight () {
      return this.step === 8
    },

    currentProperties () {
      return this.currentComponent.name === 'CustomerDetails' ? { dialog: true, sectionName: 'Customer details', customerId: this.customerId } : null
    }
  },

  watch: {
    step (value) {
      this.currentComponent = this.pages[value - 1]
    }
  },

  methods: {
    refreshCallback (event) {
      this.refreshed[event.route] = true
    },

    goToCompanyDetails () {
      this.step = 2
      this.currentComponent = CompanyDetails
    },
    goToCheckAddress () {
      this.step = 3
      this.currentComponent = CheckAddress
    },
    goToCustomersList () {
      this.step = 4
      this.currentComponent = CustomersList
    },
    goToServices () {
      this.step = 5
      this.currentComponent = Services
    },
    createNewTicket (data) {
      this.step = 6
      this.currentComponent = TicketDetails
    },
    goToDocuments () {
      this.step = 7
      this.currentComponent = Documents
    },

    goToCustomer (customerId) {
      this.customerId = customerId
      this.step = 8
      this.currentComponent = CustomerDetails
    },

    hideMainMenu () {
      this.showMainMenu = false
    },

    displayMainMenu () {
      this.showMainMenu = true
    },

    refreshSettings () {
      refreshSettings()
      setTimeout(this.refreshSettings, 10000)
    }
  },

  beforeDestroy () {
    for (const event in this.transitions) this.$root.$off(event, this.transitions[event])
  },

  beforeMount () {
    for (const event in this.transitions) this.$root.$on(event, this.transitions[event])
  },

  created () {
    this.transitions = {
      'data-refreshed': this.refreshCallback,
      'go-to-services': this.goToServices,
      'go-to-check-address': this.goToCheckAddress,
      'go-to-customer-details': this.goToCustomer,
      'go-to-customers-list': this.goToCustomersList,
      'go-to-company-details': this.goToCompanyDetails,
      'create-new-ticket': this.createNewTicket,
      'hide-main-menu': this.hideMainMenu,
      'show-main-menu': this.displayMainMenu
    }
  }
}
</script>

<style>

.tab {
  background: #fbfbfb!important;
  border: solid 1px #900;
}

.page-content {
  top:64px;
}

.active {
  background: #900!important;
  color: #fff!important;
}

.current-component-enter-active {
  animation: fade-component .4s .4s ease-in both;
}

.current-component-leave-active {
  animation: fade-component .4s reverse ease-out both;
}

@keyframes fade-component {
  0% {
    opacity: 0;
    transform: translate(-200px, 0);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}
</style>
