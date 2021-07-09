<template>
  <li class="tweet-replied">
    <a href="" class="avatar">
      <img :src="tweetReplied.User.avatar" alt="">
    </a>
    <div class="tweet-replied-detail">
      <div class="tweet-replied-user-info">
        <a class="name" href="">{{ tweetReplied.User.name }}</a>
        <span class="account">@{{ tweetReplied.User.account }}</span>
        <span class="tweet-update-at">・{{ tweetReplied.createdAt | fromNow }}</span>
      </div>
      <div class="tweet-replied-to">
        回覆 @{{ tweet.User.name }}
      </div>
      <div class="tweet-replied-content">
       {{ tweetReplied.comment }}
      </div>
    </div>
  </li>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'
export default {
  mixins: [fromNowFilter],
  props: {
    tweet: {
      type: Object,
      required: true
    },
    initialTweetReplied: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tweetReplied: this.initialTweetReplied
    }
  },

}
</script>

<style scoped>
  .tweet-replied {
    border-bottom: 1px solid #e6ecf0;
    display: flex;
    padding: 10px 15px;
    width: 100%;
  }
  .tweet-replied-detail {
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
  .tweet-panel span {
    padding-right: 40px;
  }
  .tweet-panel img{
    margin-right: 20px;
  }
</style>