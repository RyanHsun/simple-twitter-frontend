import { apiHelper } from '../utils/helpers'
const getToken = () => window.localStorage.getItem('token')

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
    return apiHelper.get(`/admin/tweets?${searchParams.toString()}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteAdminTweets ({ id }) {
    return apiHelper.delete(`/admin/tweets/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getAdminUsers ({ limit, offset }) {
    const searchParams = new URLSearchParams({ limit, offset })
    return apiHelper.get(`/admin/users?${searchParams.toString()}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
