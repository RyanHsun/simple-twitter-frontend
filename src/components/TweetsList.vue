<template>
  <li class="tweet">
    <a href="" class="avatar">
      <img :src="tweet.User.avatar" alt="">
    </a>
    <div class="tweet-info">
      <div class="user-info">
        <a class="name" href="">{{ tweet.User.name }}</a>
        <span class="account"></span>
        <span class="tweet-update-at">・{{ tweet.createdAt | fromNow }}</span>
      </div>
      <div class="tweet-content">
        {{ tweet.content }}
      </div>
      <div class="tweet-panel">
        <span class="comment">
          <img src="~@/assets/img/icon_comment.svg" alt="">{{ tweet.replyNum }}
        </span>
        <span class="likes">
          <img src="~@/assets/img/icon_like.svg" alt="">{{ tweet.likeNum }}
        </span>
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
.tweet-panel span {
  padding-right: 40px;
}
.tweet-panel img{
  margin-right: 20px;
}
</style>
