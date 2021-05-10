const dayDuration = 24 * 60 * 60 * 1000
const weekDuration = 7 * 24 * 60 * 60 * 1000
const initialDate = Date.parse(new Date(2018, 0, 1))

const getWeekDay = date => date.getDay() ? date.getDay() : 7

const getWeekNumber = date => Math.floor((Date.parse(date) - initialDate) / weekDuration) + (getWeekDay(date) === 1 ? 1 : 0)

const getWeekStartDate = date => new Date(initialDate + getWeekNumber(date) * weekDuration + dayDuration)
  .toISOString().slice(0, 10)

const getWeekEndDate = date => new Date(Date.parse(getWeekStartDate(date)) + 6 * dayDuration).toISOString().slice(0, 10)

const getWeekObject = (date) => ({
  number: getWeekNumber(date),
  start: getWeekStartDate(date).toISOString().slice(0, 10),
  end: getWeekEndDate(date).toISOString().slice(0, 10)
})

const getNextWeekDate = date => new Date(Date.parse(date) + weekDuration)
const getPrevWeekDate = date => new Date(Date.parse(date) - weekDuration)

const getNextWeekObject = (date = new Date()) => getWeekObject(getNextWeekDate(date))
const getPrevWeekObject = (date = new Date()) => getWeekObject(getPrevWeekDate(date))

export {
  getWeekNumber,
  getWeekDay,
  getWeekStartDate,
  getWeekEndDate,
  getWeekObject,
  getNextWeekDate,
  getPrevWeekDate,
  getNextWeekObject,
  getPrevWeekObject
}
