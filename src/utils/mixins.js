import moment from 'moment'
export const fromNowFilter = {
  filters: {
    fromNow (datetime) {
      return datetime ? moment(datetime).fromNow() : '-'
    }
  }
}

export const exactDateFilter = {
  filters: {
    exactDate (dateTime) {
      moment.locale('zh-tw')
      if (!dateTime) return '-'
      // return moment(dateTime).format('a h:mm ⋅ YYYY MMMM Do');
      return moment(dateTime).format('a h:mm ⋅ YYYY年M月Do')
    }
  }
}
