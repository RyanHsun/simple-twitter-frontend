import { apiHelper } from '../utils/helpers'

export default {
  // 帶入需要的參數
  adminLogin ({ email, password }) {
    // 這裡 return 的會是一個 Promise
    return apiHelper.post('/admin/login', {
      email,
      password
    })
  },
  getAdminTweets ({ limit, offset }) {
    const searchParams = new URLSearchParams({ limit, offset })
    return apiHelper.get(`/admin/tweets?${searchParams.toString()}`)
  },
  deleteAdminTweets ({ id }) {
    return apiHelper.delete(`/admin/tweets/${id}`)
  },
  getAdminUsers ({ limit, offset }) {
    const searchParams = new URLSearchParams({ limit, offset })
    return apiHelper.get(`/admin/users?${searchParams.toString()}`)
  }
}
