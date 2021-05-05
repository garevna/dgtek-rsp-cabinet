const testString = date => date.slice(0, 10).split('-').length > 1
const testNumber = date => !!date * 1

const dateToNumber = date => new Date(...date.slice(0, 10).split('-').map((item, index) => index === 1 ? item - 1 : item)).valueOf()

const getDateNumber = date => testString(date) ? dateToNumber(date) : date * 1 ? date * 1 : Date.now()

const getDateString = arg => testNumber(arg) ? new Date(arg * 1).toISOString().slice(0, 10) : arg.slice(0, 10)

export {
  getDateString,
  getDateNumber
}
