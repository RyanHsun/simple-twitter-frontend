<template>
  <ul class="tweets-list">
    <li v-for="tweet in tweets"
      :key="tweet.id"
      class="tweet" 
    >
      <router-link class="avatar" :to="{ name: 'user', params: { id: tweet.Author.id } }">
        <img :src="tweet.Author.avatar" alt="">
      </router-link>
      <div class="tweet-info">
        <div class="user-info">
          <router-link class="name" :to="{ name: 'user', params: { id: tweet.Author.id } }">
            {{ tweet.Author.name }}
          </router-link>
          <span class="account">@{{ tweet.Author.account }}</span>
          <span class="tweet-update-at">・{{ tweet.createdAt | fromNow }}</span>
        </div>
        <div class="tweet-content">
          {{ tweet.description }}
        </div>
        <div class="tweet-panel">
          <button 
            type="button"
            class="tweet-reply-action" 
            data-toggle="modal" 
            :data-target="`#replyTweetModal-${tweet.id}`"
            @click="handleReplyTweetModal"
          >
            <img src="~@/assets/img/icon_comment.svg" alt="">
            <span>{{ tweet.replyNum }}</span>
          </button>
          <button
            v-if="tweet.isLike"
            class="likes" 
            :class="{ 'is-like': tweet.isLike }"
            type="button" 
            @click.stop.prevent="toggleLike(tweet)"
            >
            <img src="~@/assets/img/icon_like-fill.svg" alt="">
            <span>{{ tweet.likeNum }}</span>
          </button>
          <button
            v-else
            class="likes" 
            type="button" 
            @click.stop.prevent="toggleLike(tweet)"
            >
            <img src="~@/assets/img/icon_like.svg" alt="">
            <span>{{ tweet.likeNum }}</span>
          </button>
        </div>
      </div>
      <!-- Modal -->
      <div 
        v-if="isShowReplyModal"
        class="modal fade" 
        :id="`replyTweetModal-${tweet.id}`" 
        tabindex="-1" 
        aria-labelledby="replyTweetModalLabel" 
        aria-hidden="true"
      >
        <ReplyTweetModal
          :tweet="tweet"
        />
      </div>
    </li>
  </ul>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'
import ReplyTweetModal from './../components/ReplyTweetModal.vue'

export default {
  components: {
    ReplyTweetModal
  },
  mixins: [fromNowFilter],
  props: {
    tweets: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      tweet: this.tweets,
      isShowReplyModal: false
    }
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
    },
    handleReplyTweetModal () {
      this.isShowReplyModal = true
    }
  }
}
</script>
<style scoped>
.tweets-list {
  border-width: 0 1px;
  border-style: solid;
  border-color: #E6ECF0;
}
.tweet {
  border-bottom: 1px solid #e6ecf0;
  display: flex;
  padding: 10px 15px;
  width: 100%;
}
.tweet-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: calc( 100% - 60px);
  text-align: left;
}
.name {
  margin-right: 10px;
  font-weight: bold;
}
.tweet-content {
  margin: 10px 0;
}
.tweet-panel button {
  padding-right: 40px;
}
.tweet-panel img{
  margin-right: 20px;
}
.is-like {
  color: #E0245E;
}
</style>
