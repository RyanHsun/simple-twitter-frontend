<template>
  <li class="tweet">
    <router-link class="avatar" :to="{ name: 'user', params: { id: like.LikedTweet.Author.id } }">
      <img :src="like.LikedTweet.Author.avatar | emptyImage" alt="">
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
        <button 
          type="button"
          class="tweet-reply-action" 
          data-toggle="modal" 
          :data-target="`#replyTweetModal-${like.id}`"
          @click="handleReplyTweetModal"
        >
          <img src="~@/assets/img/icon_comment.svg" alt="">
          <span>{{ like.LikedTweet.replyNum }}</span>
        </button>
        <button
          v-if="like.LikedTweet.isLike"
          class="likes" 
          :class="{ 'is-like': like.LikedTweet.isLike }"
          type="button" 
          @click.stop.prevent="deleteLike(like.LikedTweet.id)"
        >
          <img src="~@/assets/img/icon_like-fill.svg" alt="">
          <span>{{ like.LikedTweet.likeNum }}</span>
        </button>
        <button
          v-else
          class="likes" 
          type="button" 
          @click.stop.prevent="addLike(like.LikedTweet.id)"
        >
          <img src="~@/assets/img/icon_like.svg" alt="">
          <span>{{ like.LikedTweet.likeNum }}</span>
        </button>
      </div>
    </div>
    <!-- Modal -->
    <div 
      v-if="isShowReplyModal"
      class="modal fade" 
      :id="`replyTweetModal-${like.id}`" 
      tabindex="-1" 
      aria-labelledby="replyTweetModalLabel" 
      aria-hidden="true"
    >
      <ReplyTweetModal3
        :like="like"
        @after-create-comment="afterCreateComment"
      />
    </div>
    <div 
        class="full-link"
        @click.stop.prevent="linkToTweetDetail(like.TweetId)"
      >
    </div>
  </li>
</template>

<script>
import { mapState } from 'vuex'
import { emptyImageFilter } from "../utils/mixins";
import { fromNowFilter } from "./../utils/mixins"
import ReplyTweetModal3 from './../components/ReplyTweetModal3.vue'
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'

export default {
  mixins: [fromNowFilter,emptyImageFilter],
  components: {
    ReplyTweetModal3
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    initialLike: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      like: this.initialLike,
      isShowReplyModal: false,
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    initialLike (newValue) {
      this.like = {
        ...this.like,
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
        this.like.LikedTweet.isLike = true
        this.like.LikedTweet.likeNum += 1
        this.isProcessing = false
        Toast.fire({
          icon: "success",
          title: "加入喜歡！",
        })
      } catch (error) {
        console.log(error.response)
        Toast.fire({
          icon: 'error',
          title: '無法加入喜歡，請稍後再試',
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
        this.like.LikedTweet.isLike = false
        this.like.LikedTweet.likeNum -= 1
        this.isProcessing = false
        Toast.fire({
          icon: "success",
          title: "收回喜歡！",
        })
      } catch (error) {
        console.log(error.response)
        Toast.fire({
          icon: 'error',
          title: '無法收回喜歡，請稍後再試',
        })
        this.isProcessing = false
      }
    },
    afterCreateComment (payload) {
      const { tweetId, replyNum } = payload
      console.log(tweetId, replyNum, payload)

      this.like.LikedTweet.replyNum += 1
    },
    handleReplyTweetModal () {
      this.isShowReplyModal = true
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
  width: calc( 100% - 50px);
  text-align: left;
  pointer-events: none;
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
.tweet-panel img{
  margin-right: 20px;
}
.is-like {
  color: #E0245E;
}

.modal-content {
  border-radius: 14px;
}
.close {
  margin: 0;
  padding: 0;
  opacity: 1;
}
.modal-tweet {
  position: relative;
  display: flex;
  text-align: left;
}
.modal-tweet::before {
  content: '';
  border: 1px solid #CCD6DD;
  position: absolute;
  height: calc( 100% - 30px );
  top: 55px;
  bottom: 0;
  left: 5%;
  z-index: 0;
}
.modal-tweet-info {
  width: calc(100% - 60px);
}
.modal-tweet-reply-to {
  font-size: 13px;
  margin-top: 10px;
}
.modal-tweet-reply-to span {
  margin-left: 5px;
  color: #FF6600;
}
.modal-reply-tweet {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 200px;
  margin-top: 30px;
}
.modal-reply-tweet-wrap {
  display: flex;
  width: 100%;
  text-align: left;
}
.modal-reply-textarea {
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
.modal-reply-button {
  align-self: flex-end;
  color: #fff;
  background-color: #FF6600;
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
.name:hover {
color: #ff6600;
text-decoration: none;
}
</style>
