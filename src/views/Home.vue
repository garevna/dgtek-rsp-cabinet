<template>
  <v-container class="homefone">
    <v-stepper v-model="step" class="homefone" style="box-shadow: none;">
      <v-stepper-items flat class="page-content transparent mt-6 mb-12">
        <transition name="current-component">
          <component :is="currentComponent" />
        </transition>
      </v-stepper-items>
    </v-stepper>

    <v-row justify="center" class="homefone py-12 mx-0 px-0">
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
          v-if="refreshed.rsp"
          class="mx-1"
          :class="{ active: second, tab: !second }"
          @click="step = 2"
        >
            {{ stepsNames[1] }}
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
      </v-stepper-header>
    </v-row>

    <v-bottom-navigation fixed flat height="90" class="homefone pt-2">
      <v-container fluid class="mt-2">
        <v-row justify="center" class="mb-3" style="width: 100%">
            <v-btn
              v-if="step > 1"
              @click="step--"
              text
            >
              <v-icon color="buttons">$pagePrev</v-icon>
              Back
            </v-btn>
            <v-btn
              v-if="step < 6"
              @click="step++"
              text
            >
              <v-icon color="buttons">$pageNext</v-icon>
              Next
            </v-btn>
        </v-row>
        <v-row justify="center" class="mt-2 mx-0 px-0" style="width: 100%; background: #aaa;">
          <p class="text-center" style="color: #efefef;">
            <small>
              <sub>2021 &copy; Dgtek Pty. Ltd ABN 61 600 896 115</sub>
            </small>
          </p>
        </v-row>
      </v-container>
    </v-bottom-navigation>
  </v-container>
</template>

<script>

import {
  Dashboard,
  CompanyDetails,
  CheckAddress,
  Services,
  Tickets
} from '@/components/dashboard'

import CustomersList from '@/components/customers/CustomersList.vue'
import CustomerDetails from '@/components/customers/CustomerDetails.vue'

import { stepsNames } from '@/configs'

export default {
  name: 'Home',
  data: () => ({
    step: 1,
    stepsNames: stepsNames,
    refreshed: {
      rsp: false,
      services: false,
      tickets: false,
      customers: false
    },
    pages: [
      Dashboard,
      CompanyDetails,
      CheckAddress,
      CustomersList,
      Services,
      Tickets
    ],
    currentComponent: Dashboard
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
    goToServices () {
      this.step = 5
      this.currentComponent = Services
    },
    goToCustomer () {
      this.step = 4
      this.currentComponent = CustomerDetails
    },
    goToCustomersList () {
      this.step = 4
      this.currentComponent = CustomersList
    }
  },

  beforeDestroy () {
    this.$root.$off('data-refreshed', this.refreshCallback)
    this.$root.$off('go-to-services', this.goToServices)
    this.$root.$off('go-to-customer-details', this.goToCustomer)
    this.$root.$off('go-to-customers-list', this.goToCustomersList)
  },

  mounted () {
    this.$root.$on('data-refreshed', this.refreshCallback)
    this.$root.$on('go-to-services', this.goToServices)
    this.$root.$on('go-to-customer-details', this.goToCustomer)
    this.$root.$on('go-to-customers-list', this.goToCustomersList)
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
