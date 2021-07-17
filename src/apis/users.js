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
  getUserTweets ({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`)
  },
  getUserRepliedTweets ({ userId }) {
    return apiHelper.get(`/users/${userId}/replied_tweets`)
  },
  getUserLikes ({ userId }) {
    return apiHelper.get(`/users/${userId}/likes`)
  },
  getFollowings ({ userId }) {
    return apiHelper.get(`/users/${userId}/followings`)
  },
  getFollowers ({ userId }) {
    return apiHelper.get(`/users/${userId}/followers`)
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
  }
}
