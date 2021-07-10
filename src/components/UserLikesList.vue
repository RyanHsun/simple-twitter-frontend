<template>
<ul class="tweets-list">
  <li 
    v-for="like in likes"
    :key="like.id"
    class="tweet"
  >
    <router-link class="avatar" :to="{ name: 'user', params: { id: like.LikedTweet.Author.id } }">
      <img :src="like.LikedTweet.Author.avatar" alt="">
    </router-link>
    <div class="tweet-info">
      <div class="user-info">
        <router-link class="name" :to="{ name: 'user', params: { id: like.LikedTweet.Author.id } }">
          {{ like.LikedTweet.Author.name }}
        </router-link>
        <span class="account">@{{ like.LikedTweet.Author.account }}</span>
        <span class="tweet-update-at">・{{ like.LikedTweet.createdAt | fromNow }}</span>
      </div>
      <div class="tweet-content">
        {{ like.LikedTweet.description }}
      </div>
      <div class="tweet-panel">
        <button class="comment" type="button">
          <img src="~@/assets/img/icon_comment.svg" alt="">{{ like.LikedTweet.replyNum }}
        </button>
        <button
          v-if="like.LikedTweet.isLike"
         class="likes" 
         :class="{ 'is-like': like.LikedTweet.isLike }"
         type="button" 
         @click.stop.prevent="toggleLike(tweet)"
        >
          <img src="~@/assets/img/icon_like-fill.svg" alt="">
          <span>{{ like.LikedTweet.likeNum }}</span>
        </button>
        <button
          v-else
         class="likes" 
         type="button" 
         @click.stop.prevent="toggleLike(tweet)"
        >
          <img src="~@/assets/img/icon_like.svg" alt="">
          <span>{{ like.LikedTweet.likeNum }}</span>
        </button>
      </div>
    </div>
  </li>
</ul>
</template>

<script>
import { fromNowFilter } from "./../utils/mixins"

export default {
  mixins: [fromNowFilter],
  props: {
    likes: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      like: this.likes
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
