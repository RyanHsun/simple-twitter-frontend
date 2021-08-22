import { apiHelper } from './../utils/helpers'

export default {
  getCurrentUser () {
    return apiHelper.get('/users/current_user')
  },
  getUser ({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  updateUser ({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData)
  },
  getUserTweets ({ userId, offset, limit }) {
    const searchParams = new URLSearchParams({ offset, limit })
    return apiHelper.get(`/users/${userId}/tweets?${searchParams.toString()}`)
  },
  getUserRepliedTweets ({ userId, offset, limit }) {
    const searchParams = new URLSearchParams({ offset, limit })
    return apiHelper.get(`/users/${userId}/replied_tweets?${searchParams.toString()}`)
  },
  getUserLikes ({ userId, offset, limit }) {
    const searchParams = new URLSearchParams({ offset, limit })
    return apiHelper.get(`/users/${userId}/likes?${searchParams.toString()}`)
  },
  getFollowings ({ userId, offset, limit }) {
    const searchParams = new URLSearchParams({ offset, limit })
    return apiHelper.get(`/users/${userId}/followings?${searchParams.toString()}`)
  },
  getFollowers ({ userId, offset, limit }) {
    const searchParams = new URLSearchParams({ offset, limit })
    return apiHelper.get(`/users/${userId}/followers?${searchParams.toString()}`)
  },
  addFollowing ({ id }) {
    return apiHelper.post('/followships', { id })
  },
  deleteFollowing ({ userId }) {
    return apiHelper.delete(`/followships/${userId}`)
  },
  getTopUsers ({ offset, limit }) {
    const searchParams = new URLSearchParams({ offset, limit })
    return apiHelper.get(`/users?${searchParams.toString()}`)
  },
  toggleNotification ({ id }) {
    return apiHelper.post('/followships/subscription', { id })
  }
}
