import moment from 'moment'
export const fromNowFilter = {
  filters: {
    fromNow (dateTime) {
      moment.locale('zh-tw')
      const fromNowString = moment(dateTime).fromNow()
      const fnString = fromNowString.substring(fromNowString.length, 2)
      const fnNumber = parseInt(fromNowString)
      if (fnString === '天前' && fnNumber >= 2) {
        return dateTime ? moment(dateTime).format('YYYY年M月D日') : '-'
      } else {
        return dateTime ? moment(dateTime).fromNow() : '-'
      }
    }
  }
}

export const exactDateFilter = {
  filters: {
    exactDate (dateTime) {
      moment.locale('zh-tw')
      // return dateTime ? moment(dateTime).format('YYYY年M月D日') : '-'
      return dateTime ? moment(dateTime).format('a hh:mm ⋅ YYYY年M月D日') : '-'
    }
  }
}
export const emptyImageFilter = {
  filters: {
    emptyImage (src) {
      return src || 'https://via.placeholder.com/350x220/DFDFDF?text=No+Image'
    }
  }
}
