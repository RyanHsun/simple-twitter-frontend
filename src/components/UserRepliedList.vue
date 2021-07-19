<template>
  <li class="tweet">
    <div class="tweet-wrap">
      <div class="replied-tweet">
        <router-link class="avatar" :to="{ name: 'user', params: { id: reply.RepliedTweet.Author.id } }">
          <img :src="reply.RepliedTweet.Author.avatar | emptyImage" alt="">
        </router-link>
        <div class="tweet-info">
          <div class="user-info">
            <router-link class="name" :to="{ name: 'user', params: { id: reply.RepliedTweet.Author.id } }">
              {{ reply.RepliedTweet.Author.name }}
            </router-link>
            <span class="account">@{{ reply.RepliedTweet.Author.account }}</span>
            <span class="tweet-update-at">・{{ reply.RepliedTweet.createdAt | fromNow }}</span>
          </div>
          <div class="tweet-content">
            {{ reply.RepliedTweet.description }} 
          </div>
          <div class="tweet-panel">
            <button 
              type="button"
              class="tweet-reply-action" 
              data-toggle="modal" 
              :data-target="`#replyTweetModal-${reply.id}`"
              @click="handleReplyTweetModal"
            >
              <img src="~@/assets/img/icon_comment.svg" alt="">
              <span>{{ reply.RepliedTweet.replyNum }}</span>
            </button>
            <button
              v-if="reply.RepliedTweet.isLike"
            class="likes" 
            :class="{ 'is-like': reply.RepliedTweet.isLike }"
            type="button" 
            @click.stop.prevent="deleteLike(reply.TweetId)"
            >
              <img src="~@/assets/img/icon_like-fill.svg" alt="">
              <span>{{ reply.RepliedTweet.likeNum }}</span>
            </button>
            <button
              v-else
            class="likes" 
            type="button" 
            @click.stop.prevent="addLike(reply.TweetId)"
            >
              <img src="~@/assets/img/icon_like.svg" alt="">
              <span>{{ reply.RepliedTweet.likeNum }}</span>
            </button>
          </div> 
        </div>
      </div>
      <div class="tweet-replied">
        <router-link class="avatar" :to="{ name: 'user', params: { id: user.id } }">
          <img :src="user.avatar | emptyImage" alt="">
        </router-link>
        <div class="tweet-info">
          <div class="user-info">
            <a class="name" href="">{{ user.name }}</a>
            <span class="account">@{{ user.account }}</span>
            <span class="tweet-update-at">・{{ reply.createdAt | fromNow }}</span>
          </div>
          <div class="tweet-content">
            {{ reply.comment }} 
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div 
      v-if="isShowReplyModal"
      class="modal fade" 
      :id="`replyTweetModal-${reply.id}`" 
      tabindex="-1" 
      aria-labelledby="replyTweetModalLabel" 
      aria-hidden="true"
    >
      <ReplyTweetModal2
        :reply="reply"
        @after-create-comment="afterCreateComment"
      />
    </div>
    <div 
        class="full-link"
        @click.stop.prevent="linkToTweetDetail(reply.TweetId)"
      >
    </div>
  </li>
</template>

<script>
import { mapState } from 'vuex'
import { emptyImageFilter } from "../utils/mixins";
import { fromNowFilter } from "./../utils/mixins"
import ReplyTweetModal2 from './../components/ReplyTweetModal2.vue'
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'

export default {
  mixins: [fromNowFilter,emptyImageFilter],
  components: {
    ReplyTweetModal2
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    initialReply: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      reply: this.initialReply,
      isShowReplyModal: false,
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    initialReply (newValue) {
      this.reply = {
        ...this.reply,
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
        this.reply.RepliedTweet.isLike = true
        this.reply.RepliedTweet.likeNum = this.tweet.likeNum + 1
        this.isProcessing = false
        Toast.fire({
          icon: "success",
          title: "加入喜歡！",
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法加入喜歡，請稍後再試',
        })
        this.isProcessing = false
      }
    },
    async deleteLike(tweetId) {
      console.log(tweetId)
      try {
        this.isProcessing = true
        const { data } = await tweetsAPI.deleteLike({ tweetId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.reply.RepliedTweet.isLike = false
        this.reply.RepliedTweet.likeNum = this.tweet.likeNum - 1
        
        this.isProcessing = false
        Toast.fire({
          icon: "success",
          title: "收回喜歡！",
        })
      } catch (error) {
        console.log(error)
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

      this.reply.RepliedTweet.replyNum += 1
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
.tweets-list {
  flex-direction: column;
  display: flex;
  width: 100%;
}
.tweet {
  position : relative;
  text-align: left;
  padding: 10px 15px;
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
  left: 22px;
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
  z-index: 1;
  display: inline-block;
}
.name {
  margin-right: 10px;
  pointer-events: visiblefill;
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
.avatar:hover ~ .full-link,
.tweet-info:hover + .full-link {
  background-color: #f5f8fa;
}
.name {
  margin-right: 10px;
  font-weight: bold;
  pointer-events: visiblefill;
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
