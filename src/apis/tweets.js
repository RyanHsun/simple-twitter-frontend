import { apiHelper } from './../utils/helpers'

export default {
  getTweet ({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`)
  },
  getTweetReplies ({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}/replies`)
  },
  createTweetReply ({ tweetId, comment }) {
    return apiHelper.post(`/tweets/${tweetId}/replies`, { comment })
  },
  getTweets ({ offset, limit }) {
    const searchParams = new URLSearchParams({ offset, limit })

    return apiHelper.get(`/tweets?${searchParams.toString()}`)
  },
  createTweet ({ description }) {
    return apiHelper.post('/tweets', { description })
  },
  addLike ({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/like`, null)
  },
  deleteLike ({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/unlike`, null)
  }
}
