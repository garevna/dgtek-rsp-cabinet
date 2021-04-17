<template>
  <v-container class="homefone">
    <v-stepper v-model="step" class="transparent" style="box-shadow: none;">
      <h4 class="d-block d-md-none ml-5 mt-4">
        {{ stepsNames[step - 1] }}
      </h4>
      <v-stepper-header
        elevation="0"
        class="transparent text-center mt-8 d-none d-md-block"
        style="box-shadow: none"
      >
          <v-btn
             class="mx-1"
             :class="{ active: first, tab: !first }"
             @click="step=1"
          >
            {{ stepsNames[0] }}
          </v-btn>

        <v-btn
          v-if="refreshed.rsp"
          class="mx-1"
          :class="{ active: second, tab: !second }"
          @click="step=2"
        >
            {{ stepsNames[1] }}
          </v-btn>

        <v-btn
          class="mx-1"
          :class="{ active: third, tab: !third }"
          @click="step=3"
        >
            {{ stepsNames[2] }}
          </v-btn>

          <v-btn
            v-if="refreshed.customers"
            class="mx-1"
            :class="{ active: fourth, tab: !fourth }"
            @click="step=4"
          >
              {{ stepsNames[3] }}
            </v-btn>

            <v-btn
              v-if="refreshed.services"
              class="mx-1"
              :class="{ active: fifth, tab: !fifth }"
              @click="step=5"
            >
                {{ stepsNames[4] }}
              </v-btn>

              <v-btn
                v-if="refreshed.tickets"
                class="mx-1"
                :class="{ active: six, tab: !six }"
                @click="step=6"
              >
                  {{ stepsNames[5] }}
                </v-btn>
      </v-stepper-header>

      <v-stepper-items flat class="transparent mt-1 mt-md-6 mb-12">
        <v-stepper-content step="1">
          <Dashboard v-if="step === 1" />
        </v-stepper-content>

        <v-stepper-content step="2">
          <CompanyDetails v-if="step === 2" />
        </v-stepper-content>

        <v-stepper-content step="3">
          <CheckAddress v-if="step === 3" />
        </v-stepper-content>

        <v-stepper-content step="4">
          <CustomersList v-if="step === 4" />
        </v-stepper-content>

        <v-stepper-content step="5">
          <Services v-if="step === 5" />
        </v-stepper-content>

        <v-stepper-content step="6">
          <Tickets v-if="step === 6" />
        </v-stepper-content>

      </v-stepper-items>
    </v-stepper>
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

import { stepsNames } from '@/configs'

export default {
  name: 'Home',
  components: {
    Dashboard,
    CompanyDetails,
    CheckAddress,
    CustomersList: () => import('@/components/customers/CustomersList.vue'),
    Services,
    Tickets
  },
  data: () => ({
    step: 1,
    stepsNames: stepsNames,
    refreshed: {
      rsp: false,
      services: false,
      tickets: false,
      customers: false
    }
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
  methods: {
    refreshCallback (event) {
      this.refreshed[event.route] = true
    }
    // callback (event) {
    //   console.log(event.data)
    //   this.__worker.removeEventListener('message', this.callback)
    // },
    // submit () {
    //   const result = {}
    //   for (const sectionName in this.data) {
    //     result[sectionName] = {}
    //     for (const propName in this.data[sectionName]) {
    //       result[sectionName][propName] = this.data[sectionName][propName].value
    //     }
    //   }
    //   // this.__registrate(result)
    //   // this.__worker.addEventListener('message', this.callback)
    //   // this.__worker.postMessage({ action: 'registrate', data: result })
    // }
  },
  mounted () {
    this.$root.$on('data-refreshed', this.refreshCallback)
  }
}
</script>

<style>
.tab {
  background: transparent!important;
  border: solid 1px #900;
}

.active {
  background: #900!important;
  color: #fff!important;
}
</style>
