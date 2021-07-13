<template>
  <div class="tweet-detail">
    <div class="user">
      <router-link class="avatar" :to="{ name: 'user', params: { id: tweet.Author.id } }">
        <img :src="tweet.Author.avatar" alt="">
      </router-link>
      <div class="info">
        <router-link class="name" :to="{ name: 'user', params: { id: tweet.Author.id } }">
          {{ tweet.Author.name }}
        </router-link>
        <span class="account">@{{ tweet.Author.account }}</span>
      </div>
    </div>
    <div class="tweet-content">
      {{ tweet.description }}
    </div>
    <div class="tweet-created-at">
      {{ tweet.createdAt | exactDate }}
    </div>
    <div class="tweet-response">
      <div class="tweet-replies">{{ tweet.replyNum }} 回覆</div>
      <div class="tweet-likes">{{ tweet.likeNum }} 喜歡次數</div>
    </div>
    <div class="tweet-response-action">
      <button type="button" class="tweet-reply-action" data-toggle="modal" data-target="#replyTweetModal">
        <img src="~@/assets/img/icon_comment.svg" alt="">
      </button>
      <!-- Button trigger modal -->
      <div class="modal fade" id="replyTweetModal" tabindex="-1" aria-labelledby="replyTweetModalLabel" aria-hidden="true">
        <ReplyTweetModal 
          :tweet="tweet"
        />
      </div>
      <button
        v-if="tweet.isLike"
        class="likes" 
        :class="{ 'is-like': tweet.isLike }"
        type="button" 
        :disabled="isProcessing"
        @click.stop.prevent="deleteLike(tweet.id)"
      >
        <img src="~@/assets/img/icon_like-fill.svg" alt="">
      </button>
      <button
        v-else
        class="likes" 
        type="button" 
        :disabled="isProcessing"
        @click.stop.prevent="addLike(tweet.id)"
      >
        <img src="~@/assets/img/icon_like.svg" alt="">
      </button>
    </div>
  </div>
</template>

<script>
import { exactDateFilter } from "./../utils/mixins"
import ReplyTweetModal from './../components/ReplyTweetModal.vue'
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'

export default {
  mixins: [exactDateFilter],
  props: {
    initialTweet: {
      type: Object,
      required: true
    }
  },
  components: {
    ReplyTweetModal
  },
  data () {
    return {
      tweet: this.initialTweet,
      isProcessing: false
    }
  },
  watch: {
    initialTweet (newValue) {
      this.tweet = {
        ...this.tweet,
        ...newValue
      }
    }
  },
  methods: {
    async addLike(tweetId) {
      try {
        this.isProcessing = true
        const { data } = await tweetsAPI.addLike({ tweetId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.tweet.isLike = true
        this.tweet.likeNum = this.tweet.likeNum + 1
        this.isProcessing = false
        Toast.fire({
          icon: "success",
          title: "操作成功！",
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法按讚，請稍後再試',
        })
        this.isProcessing = false
      }
    },
    async deleteLike(tweetId) {
      try {
        this.isProcessing = true
        const { data } = await tweetsAPI.deleteLike({ tweetId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.tweet.isLike = false
        this.tweet.likeNum = this.tweet.likeNum - 1
        this.isProcessing = false
        Toast.fire({
          icon: "success",
          title: "操作成功！",
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取消按讚，請稍後再試',
        })
        this.isProcessing = false
      }
    },
  }
}
</script>

<style scoped>
  .tweet-detail,
  .tweet-replied-list {
    text-align: left;
    border-width: 0 1px;
    border-style: solid;
    border-color: #E6ECF0;
  }
  .user {
    padding: 10px 20px;
  }
  .tweet-content {
    padding: 10px 20px;
    font-size: 23px;
  }
  .tweet-created-at {
    padding: 0 20px 20px ;
  }
  .tweet-response {
    display: flex;
    padding: 20px;
    border-width: 1px 0;
    border-style: solid;
    border-color: #E6ECF0;
  }
  .tweet-replies {
    margin-right: 30px;
  }
  .tweet-response-action {
    display: flex;
    padding: 10px 20px;
    border-bottom: 1px solid #E6ECF0;
  }
  .tweet-response-action > button {
    width: 20px;
  }
  .tweet-response-action img {
    width: 100%;
  }
  .tweet-reply-action {
    margin-right: 20%;
  }
</style>