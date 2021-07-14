<template>
    <li class="tweet">
      <router-link 
        class="avatar" 
        :to="{ name: 'user', params: { id: tweet.Author.id } }"
        @click.stop="linkToUserProfile"
      >
        <img :src="tweet.Author.avatar | emptyImage" alt="">
      </router-link>
      <div class="tweet-info">
        <div class="user-info">
          <router-link 
            class="name" 
            :to="{ name: 'user', params: { id: tweet.Author.id } }"
            @click.stop="linkToUserProfile"
          >
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
            :disabled="isProcessing"
            @click.stop.prevent="deleteLike(tweet.id)"
            >
            <img src="~@/assets/img/icon_like-fill.svg" alt="">
            <span>{{ tweet.likeNum }}</span>
          </button>
          <button
            v-else
            class="likes" 
            type="button" 
            :disabled="isProcessing"
            @click.stop.prevent="addLike(tweet.id)"
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
      <div 
        class="full-link"
        @click.stop.prevent="linkToTweetDetail(tweet.id)"
      >
      </div>
    </li>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
import { fromNowFilter } from './../utils/mixins'
import ReplyTweetModal from './../components/ReplyTweetModal.vue'
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'

export default {
  name: 'TweetsList',
  components: {
    ReplyTweetModal
  },
  mixins: [fromNowFilter,emptyImageFilter],
  props: {
    initinalTweet: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tweet: this.initinalTweet,
      isShowReplyModal: false,
      isProcessing: false
    }
  },
  // create () {
  //   this.tweets = this.initinalTweets
  // },
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
    handleReplyTweetModal () {
      this.isShowReplyModal = true
      console.log('回覆')
    },
    linkToTweetDetail (tweetId) {
      this.$router.push(`/tweets/${tweetId}`)
    }
  }
}
</script>
<style scoped>
.tweet {
  position: relative;
  border-bottom: 1px solid #e6ecf0;
  display: flex;
  padding: 10px 15px;
  width: 100%;
}
.avatar {
  position: relative; 
  z-index: 1;
}
.tweet-info {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: calc( 100% - 60px);
  text-align: left;
  pointer-events: none;
}
.avatar:hover ~ .full-link,
.tweet-info:hover + .full-link {
  background-color: #f5f8fa;
}
.name {
  margin-right: 10px;
  font-weight: bold;
  pointer-events: visiblefill;
}
.tweet-content {
  margin: 10px 0;
}
.tweet-panel {
  pointer-events: visiblefill;
}
.tweet-panel button {
  padding-right: 40px;
}
.tweet-reply-action:hover {
  color: #EE6600;
}
.tweet-panel .likes:hover {
  color: #E0245E;
}
.tweet-panel img{
  margin-right: 20px;
}
.is-like {
  color: #E0245E;
}
.full-link {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.full-link:hover {
  background-color: #f5f8fa;
  cursor: pointer;
  transition: .2s ease-in-out;
}
</style>
