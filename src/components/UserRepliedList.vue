<template>
<ul class="tweets-list">
  <li 
    v-for="replied in replies"
    :key="replied.id"
    class="tweet"
  >
    <div class="tweet-wrap">
      <div class="replied-tweet">
        <a href="" class="avatar">
          <img :src="replied.RepliedTweet.Author.avatar" alt="">
        </a>
        <div class="tweet-info">
          <div class="user-info">
            <a class="name" href="">{{ replied.RepliedTweet.Author.name }}</a>
            <span class="account">@{{ replied.RepliedTweet.Author.account }}</span>
            <span class="tweet-update-at">・{{ replied.RepliedTweet.createdAt | fromNow }}</span>
          </div>
          <div class="tweet-content">
            {{ replied.RepliedTweet.description }} 
          </div>
          <div class="tweet-panel">
            <button class="comment" type="button">
              <img src="~@/assets/img/icon_comment.svg" alt="">{{ replied.RepliedTweet.replyNum }}
            </button>
            <button
              v-if="replied.RepliedTweet.isLike"
            class="likes" 
            :class="{ 'is-like': replied.RepliedTweet.isLike }"
            type="button" 
            @click.stop.prevent="toggleLike(replied.RepliedTweet)"
            >
              <img src="~@/assets/img/icon_like-fill.svg" alt="">
              <span>{{ replied.RepliedTweet.likeNum }}</span>
            </button>
            <button
              v-else
            class="likes" 
            type="button" 
            @click.stop.prevent="toggleLike(replied.RepliedTweet)"
            >
              <img src="~@/assets/img/icon_like.svg" alt="">
              <span>{{ replied.RepliedTweet.likeNum }}</span>
            </button>
          </div> 
        </div>
      </div>
      <form class="tweet-replied" action="">
        <a href="" class="avatar">
          <img :src="user.avatar" alt="">
        </a>
        <div class="tweet-info">
          <div class="user-info">
            <a class="name" href="">{{ user.name }}</a>
            <span class="account">@{{ user.account }}</span>
            <span class="tweet-update-at">・{{ replied.createdAt | fromNow }}</span>
          </div>
          <div class="tweet-content">
            {{ replied.comment }} 
          </div>
        </div>
        <!-- <div class="tweet-replied-wrap">
          <span class="avatar" href="">
            <img :src="user.avatar" alt="">
          </span>
          <div class="tweet-content">
            {{ replied.comment }} 
          </div>
        </div>  -->
      </form>
    </div>
          
    <!-- <router-link class="avatar" :to="{ name: 'user', params: { id: replied.RepliedTweet.Author.id } }">
      <img :src="replied.RepliedTweet.Author.avatar" alt="">
    </router-link>
    <div class="tweet-info">
      <div class="user-info">
        <router-link class="name" :to="{ name: 'user', params: { id: replied.RepliedTweet.Author.id } }">
          {{ replied.RepliedTweet.Author.name }}
        </router-link>
        <span class="account">@{{ replied.RepliedTweet.Author.account }}</span>
        <span class="tweet-update-at">・{{ replied.RepliedTweet.createdAt | fromNow }}</span>
      </div>
      <div class="tweet-content">
        {{ replied.RepliedTweet.description }}
      </div> -->
      <!-- <div class="tweet-panel">
        <button class="comment" type="button">
          <img src="~@/assets/img/icon_comment.svg" alt="">{{ replied.RepliedTweet.replyNum }}
        </button>
        <button
          v-if="replied.RepliedTweet.isLike"
         class="likes" 
         :class="{ 'is-like': replied.RepliedTweet.isLike }"
         type="button" 
         @click.stop.prevent="toggleLike(tweet)"
        >
          <img src="~@/assets/img/icon_like-fill.svg" alt="">
          <span>{{ replied.RepliedTweet.likeNum }}</span>
        </button>
        <button
          v-else
         class="likes" 
         type="button" 
         @click.stop.prevent="toggleLike(tweet)"
        >
          <img src="~@/assets/img/icon_like.svg" alt="">
          <span>{{ replied.RepliedTweet.likeNum }}</span>
        </button>
      </div> 
    </div> -->
  </li>
</ul>
</template>

<script>
import { fromNowFilter } from "./../utils/mixins"

export default {
  mixins: [fromNowFilter],
  props: {
    user: {
      type: Object,
      required: true
    },
    replies: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      replied: this.replies
    }
  },
  methods: {
    toggleLike (tweet) {
      if (tweet.isLike) {
        tweet.isLike = false
        tweet.likeNum -= 1
        console.log('Un Like', tweet)
        // 串接 API 更新推文資料
      } else {
        tweet.isLike = true
        tweet.likeNum += 1
        console.log('Is Like', tweet)
        // 串接 API 更新推文資料
      }
    }
  }
}
</script>
<style scoped>
  .tweets-list {
    flex-direction: column;
    display: flex;
    width: 100%;
  }
  .tweet {
    text-align: left;
    padding: 15px;
    border-bottom: 1px solid #e6ecf0;
  }
  .tweet-wrap {
    display: flex;
    flex-direction: column;
  }
  .replied-tweet {
    position: relative;
    display: flex;
  }
  .replied-tweet::before {
    content: '';
    border: 1px solid #CCD6DD;
    position: absolute;
    height: calc( 100% - 30px );
    top: 55px;
    bottom: 0;
    left: 4%;
    z-index: 0;
  }
  
  .tweet-info {
    width: calc(100% - 60px);
  }
  .tweet-reply-to {
    font-size: 13px;
    margin-top: 10px;
  }
  .tweet-reply-to span {
    margin-left: 5px;
    color: #FF6600;
  }
  .tweet-replied {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 30px;
  }
  .tweet-replied-wrap {
    display: flex;
    width: 100%;
    text-align: left;
  }
  .reply-textarea {
    width: calc( 100% - 60px);
    margin-top: 10px;
    font-size: 18px;
    color: #9197A3;
    border: none;
    outline: none;
    resize: none;
  }
  .avatar {
    position: relative;
    display: inline-block;
  }
  .name {
    margin-right: 10px;
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
