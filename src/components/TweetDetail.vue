<template>
  <div class="tweet-detail">
    <div class="user">
      <router-link class="avatar" :to="{ name: 'user', params: { id: tweet.User.id } }">
        <img :src="tweet.User.avatar" alt="">
      </router-link>
      <div class="info">
        <router-link class="name" :to="{ name: 'user', params: { id: tweet.User.id } }">
          {{ tweet.User.name }}
        </router-link>
        <span class="account">@{{ tweet.User.account }}</span>
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
        <ReplyTweetModal />
      </div>
      <button
        v-if="tweet.isLike"
        class="likes" 
        :class="{ 'is-like': tweet.isLike }"
        type="button" 
        @click.stop.prevent="toggleLike(tweet)"
      >
        <img src="~@/assets/img/icon_like-fill.svg" alt="">
      </button>
      <button
        v-else
        class="likes" 
        type="button" 
        @click.stop.prevent="toggleLike(tweet)"
      >
        <img src="~@/assets/img/icon_like.svg" alt="">
      </button>
    </div>
  </div>
</template>

<script>
import { exactDateFilter } from "./../utils/mixins"
import ReplyTweetModal from './../components/ReplyTweetModal.vue'

export default {
  mixins: [exactDateFilter],
  props: {
    tweet: {
      type: Object,
      required: true
    }
  },
  components: {
    ReplyTweetModal
  },
  methods: {
    toggleLike (tweet) {
      if (tweet.isLike) {
        tweet.isLike = false
        tweet.likeNum -= 1
        // 串接 API 更新推文資料
      } else {
        tweet.isLike = true
        tweet.likeNum += 1
        // 串接 API 更新推文資料
      }
    }
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