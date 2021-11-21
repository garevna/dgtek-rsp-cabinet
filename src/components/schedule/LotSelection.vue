<template>
  <v-container class="transparent" v-if="dialog">
    <v-row justify="end">
      <v-icon large @click="$emit('update:dialog', false)"> mdi-close </v-icon>
    </v-row>
    <v-row justify="center" class="mt-12" v-if="ready" style="width: 100%">
      <div>
        <v-date-picker
          v-model="dates"
          landscape
          no-title
          :title-date-format="titleDateFormat"
          color="#999"
          :allowed-dates="allowedDates"
          :events="functionEvents"
          class="mx-4"
          multiple
          @click:date="selectDate($event)"
        >
          <v-card flat class="transparent" v-if="dates.length > 0">
            <v-card-text>
              <span style="margin-right: 16px">Selected lots:</span>
              <span class="selected-lot"><b>{{ dates[0] }}</b></span>
              <span class="selected-lot" v-if="dates.length === 2"><b>{{ dates[1] }}</b></span>
            </v-card-text>
          </v-card>
        </v-date-picker>
      </div>
      <v-row justify="end" style="width: 100%" v-if="lotsReady">
        <v-btn dark color="buttons" @click="sendRequest">
          Submit scheduling request
        </v-btn>
      </v-row>
    </v-row>

    <v-dialog v-model="popup" min-width="360" max-width="420">
      <v-card class="pa-8">
        <v-row justify="end">
          <v-btn icon @click="popup = false">
            <v-icon large>mdi-close</v-icon>
          </v-btn>
        </v-row>
        <v-row justify="center">
          <p><b>{{ selectedSlot }}</b></p>
        </v-row>
        <v-row justify="center" class="mb-4">
          <p><small>AM - technician arrives between 9am and 12pm</small></p>
          <v-btn
            text
            outlined
            :color="period === 'am' ? '#900' : 'auto'"
            @click="selectPeriod('am')" :disabled="!available('am')"
          >
            Book installation for AM
          </v-btn>
        </v-row>

        <v-row justify="center" class="mb-4">
          <p><small>PM - technician arrives between 12pm and 5pm</small></p>
          <v-btn
            text
            outlined
            :color="period === 'pm' ? '#900' : 'auto'"
            @click="selectPeriod('pm')"
            :disabled="!available('pm')"
          >
            Book installation for PM
          </v-btn>
        </v-row>

        <v-row justify="center" class="mb-4">
          <p><small>Special request - Afterhours</small></p>
          <v-btn
            text
            outlined
            :color="period === 'afterhours' ? '#900' : 'auto'"
            @click="selectPeriod('afterhours')"
          >
            Book installation for Afterhours
          </v-btn>

          <v-card-text class="mt-8">
            <p><small>Additional instructions for the technician</small></p>
            <v-textarea outlined v-model="message" rows="3" />
          </v-card-text>
        </v-row>

        <v-row justify="end">
          <v-btn
            v-if="period"
            text
            dark
            class="primary mb-4 mr-4"
            @click="submit"
          >
            Confirm Booking for {{ period }}
          </v-btn>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>

import { serviceController } from '@/controllers'

export default {
  name: 'LotSelection',

  // props: ['address', 'service', 'customerId', 'serviceData', 'dialog'],

  props: ['dialog'],

  data: () => ({
    ready: false,
    popup: false,
    scheduleCalendarSettings: [],
    lots: null,
    selectedSlot: null,
    period: null,
    arrayEvents: null,
    availableDates: [],
    dates: [],
    result: [],
    message: ''
  }),

  computed: {
    opened: {
      get () {
        return this.dialog
      },
      set (val) {
        this.$emit('update:dialog', val)
      }
    },
    lotsReady () {
      return this.result.length === 2
    }
  },

  watch: {
    dates: {
      deep: true,
      handler (val) {
        if (val.length > 2) val.shift()
      }
    }
  },

  methods: {
    sendRequest () {
      if (!this.result) return
      this.result.forEach((lot, index) => {
        this.result[index].weekNumber = this.getWeekNumber(lot.date)
        this.result[index].weekDay = this.getWeekDay(new Date(lot.date))
      })

      const service = serviceController.getCurrentService()
      console.log(service)

      const modified = Date.now()

      serviceController.updateCurrentService({
        modified,
        lots: this.result,
        status: 'Awaiting for confirmation',
        log: Object.assign(service.log, { [modified]: 'Awaiting for confirmation' })
      })

      console.log('CURRENT SERVICE UPDATED:\n', serviceController.getCurrentService())

      const requestDetails = {
        customerId: serviceController.getCustomerId(),
        serviceId: serviceController.getCurrentService().id,
        status: 'Awaiting for confirmation', /* rudiments */
        weekNumber: this.getWeekNumber(new Date()), /* rudiments */
        request: 'scheduling', /* rudiments */
        lots: this.result /* rudiments */
      }

      this.__sendSchedulingRequest(requestDetails, this.showResponse)

      this.popup = false
      this.$emit('update:dialog', false)
    },

    submit () {
      if (this.result.length === 2) this.result.shift()
      this.result.push({
        date: this.selectedSlot,
        period: this.period,
        message: this.message
      })
      this.message = ''
      this.close()
    },

    close () {
      this.period = null
      this.popup = false
    },

    getDay (date) {
      let [,, day] = date.split('-')
      day = day[0] === '0' ? day[1] : day
      return day
    },

    available (lot = 'am') {
      console.log(this.selectedSlot)
      if (!this.selectedSlot) return false
      return this.availableDates[this.selectedSlot][lot]
    },

    selectDate (value) {
      this.selectedSlot = value
      if (!this.dates.includes(value)) {
        if (this.result[0] && this.result[0].date === value) this.result.shift()
        if (this.result[1] && this.result[1].date === value) this.result.pop()
        return
      }
      this.popup = true
    },

    selectPeriod (period) {
      this.period = period
    },

    titleDateFormat (date) {
      const dates = [
        this.result && this.result[0] ? new Date(this.result[0].date).toDateString() : '',
        this.result && this.result[1] ? new Date(this.result[1].date).toDateString() : ''
      ]
      const periods = [
        this.result && this.result[0] && this.result[0].period ? ` <span style="color: #ccc">(${this.result[0].period.toUpperCase()})</span>` : '',
        this.result && this.result[1] && this.result[1].period ? ` <span style="color: #ccc">(${this.result[1].period.toUpperCase()})</span>` : ''
      ]
      return `<br><p>${dates[0]}${periods[0]}</p><p>${dates[1]}${periods[1]}</p><br><hr><br><p><small>${this.message}</small></p>`
    },

    allowedDates (date) {
      return this.availableDates[date]
    },

    functionEvents (date) {
      const current = new Date().toISOString().slice(0, 10)

      const test = current < date && Object.keys(this.lots).includes(date)

      return [
        !test ? '#ddd' : this.availableDates[date].am ? '#900' : '#aaa',
        !test ? '#ddd' : this.availableDates[date].pm ? '#900' : '#aaa'
      ]
    },

    getAvailableDates () {
      this.availableDates = {}

      const date = new Date()
      const current = date.toISOString().slice(0, 10)

      const weekNumber = this.getWeekNumber(date)

      for (const week of [weekNumber, weekNumber + 1, weekNumber + 2, weekNumber + 3]) {
        const weekdates = this.getWeekDatesByWeekNumber(week)
        weekdates.forEach((d, index) => {
          if (d > current) {
            if (this.lots[d]) {
              console.log(this.lots[d].am.length, this.lots[d].pm.length)
              const am = this.lots[d].am.length < this.scheduleCalendarSettings[index]
              const pm = this.lots[d].pm.length < this.scheduleCalendarSettings[index]
              if (am || pm) this.availableDates[d] = { am, pm }
            } else this.availableDates[d] = { am: true, pm: true }
          }
        })
      }

      console.log(this.availableDates)
    },

    getScheduleCalendarSettings (data) {
      this.scheduleCalendarSettings = data

      if (this.lots) this.getAvailableDates()
    },

    getLots (data) {
      this.lots = data
      if (this.scheduleCalendarSettings) this.getAvailableDates()
      this.ready = true
    },
    showResponse (response) {
      this.$emit('update:dialog', false)
    }
  },

  mounted () {
    console.log(serviceController.getCustomerId(), serviceController.getCurrentService().id)

    this.__getScheduleCalendarSettings(this.getScheduleCalendarSettings)
    this.__getFreeLotsOfSchedule(this.getLots)
  }
}
</script>

<style>

.v-picker .v-card .v-picker--date .v-picker--landscape .theme--light,
.v-picker {
  background-color: #fbfbfb !important;
}

.v-picker__body {
  min-width: 360px !important;
}

.theme--light.v-picker__body {
  background: transparent;
}

.v-picker--landscape .v-picker__title {
  width: 220px !important;
  border-radius: 4px;
}

.v-application--is-ltr .v-picker--landscape .v-picker__actions:not(.v-picker__actions--no-title),
.v-application--is-ltr .v-picker--landscape .v-picker__body:not(.v-picker__body--no-title) {
  margin-left: 220px !important;
  margin-top: -48px;
  margin-bottom: 36px;
}

.v-date-picker-title__year {
  display: none;
}

.v-date-picker-title__date > div {
  font-size: 16px !important;
  line-height: 150%;
}

.v-date-picker-title__date > div > p {
  font-size: 16px;
  color: #fff !important;
}

.v-date-picker-table {
  padding: 0 4px !important;
  height: 500px !important;
  width: 360px !important;
}

.v-date-picker-table--date td {
  width: 48px !important;
  border: solid 1px #ddd !important;
  padding-top: 4px;
  padding-bottom: 32px !important;
  padding-right: 6px !important;
}

.v-date-picker-table--date .v-btn {
  border-radius: 4px;
}

.v-date-picker-table .v-btn.v-btn--active {
  color: #900;
  background-color: transparent !important;
  border: solid 1px #999;
}

.v-date-picker-table .v-btn {
  font-size: 14px !important;
}

.v-date-picker-table--date .v-date-picker-table__events {
  bottom: -16px !important;
}

.v-date-picker-table__events > div {
  border-radius: 4px;
  height: 16px !important;
  width: 16px !important;
}

.selected-lot {
  border: solid 1px #900;
  border-radius: 4px;
  padding: 8px 8px;
  margin-right: 4px;
}
</style>
