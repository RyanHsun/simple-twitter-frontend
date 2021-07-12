import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getTweet ({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getTweetReplies ({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}/replies`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getTweets ({ offset, limit }) {
    const searchParams = new URLSearchParams({ offset, limit })

    return apiHelper.get(`/tweets?${searchParams.toString()}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  createTweet ({ description }) {
    return apiHelper.post('/tweets', { description }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
