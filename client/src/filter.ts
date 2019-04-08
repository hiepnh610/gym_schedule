import Vue from 'vue'
import moment from 'moment'

Vue.filter('revert_date', (val: any) => {
  if (!val) { val = new Date() }

  return moment(val).format('MMMM D, YYYY')
})

Vue.filter('revert_date_with_time', (val: any) => {
  if (!val) { val = new Date() }

  return moment(val).format('MMMM D, YYYY [at] h:m A')
})

Vue.filter('date_with_slash', (val: any) => {
  if (!val) { val = new Date() }

  return moment(val).format('DD/MM/YYYY')
})

Vue.filter('date_with_comma', (val: any) => {
  if (!val) { val = new Date() }

  return moment(val).format('DD, MMM, YYYY')
})

Vue.filter('time_ago', (val: any) => {
  if (!val) { val = new Date() }

  const currentDate = moment.now()
  const dateStart = moment(val)

  const result = moment(currentDate).diff(dateStart, 'days')

  if (result < 7) {
    return moment(val).fromNow()
  } else {
    return moment(currentDate).diff(dateStart, 'weeks') + 'w'
  }
})
