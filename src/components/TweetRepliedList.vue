<template>
  <li class="tweet-replied">
    <router-link class="avatar" :to="{ name: 'user', params: { id: tweetReplied.User.id } }">
      <img :src="tweetReplied.User.avatar" alt="">
    </router-link>
    <div class="tweet-replied-detail">
      <div class="tweet-replied-user-info">
        <router-link class="name" :to="{ name: 'user', params: { id: tweetReplied.User.id } }">{{ tweetReplied.User.name }}</router-link>
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