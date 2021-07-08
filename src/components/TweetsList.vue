<template>
  <li class="tweet">
    <router-link to="/users/:id" class="avatar">
      <img :src="tweet.User.avatar" alt="">
    </router-link>
    <div class="tweet-info">
      <div class="user-info">
        <router-link class="name" to="/users/:id">{{ tweet.User.name }}</router-link>
        <span class="account">@{{ tweet.User.account }}</span>
        <span class="tweet-update-at">・{{ tweet.createdAt | fromNow }}</span>
      </div>
      <div class="tweet-content">
        {{ tweet.content }}
      </div>
      <div class="tweet-panel">
        <button class="comment" type="button">
          <img src="~@/assets/img/icon_comment.svg" alt="">{{ tweet.replyNum }}
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
  </li>
</template>

<script>
import { fromNowFilter } from "./../utils/mixins"

export default {
  mixins: [fromNowFilter],
  props: {
    initialTweet: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tweet: this.initialTweet
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
    }
  }
}
</script>
<style scoped>

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
