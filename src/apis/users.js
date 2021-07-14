import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getCurrentUser () {
    return apiHelper.get('/users/current_user', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUser ({ userId }) {
    return apiHelper.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  updateUser ({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserTweets ({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserRepliedTweets ({ userId }) {
    return apiHelper.get(`/users/${userId}/replied_tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserLikes ({ userId }) {
    return apiHelper.get(`/users/${userId}/likes`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getFollowings ({ userId }) {
    return apiHelper.get(`/users/${userId}/followings`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getFollowers ({ userId }) {
    return apiHelper.get(`/users/${userId}/followers`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  addFollowing ({ id }) {
    return apiHelper.post('/followships', { id }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteFollowing ({ userId }) {
    return apiHelper.delete(`/followships/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getTopUsers () {
    return apiHelper.get('/users', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
