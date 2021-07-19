<template>
  <div class="tweet-detail">
    <div class="user">
      <router-link class="avatar" :to="{ name: 'user', params: { id: tweet.Author.id } }">
        <img :src="tweet.Author.avatar | emptyImage" alt="">
      </router-link>
      <div class="info">
        <router-link class="name" :to="{ name: 'user', params: { id: tweet.Author.id } }">
          {{ tweet.Author.name }}
        </router-link>
        <span class="account">@{{ tweet.Author.account }}</span>
      </div>
    </div>
    <div class="tweet-content">
      {{ tweet.description }}
    </div>
    <div class="tweet-created-at">
      {{ tweet.createdAt | exactDate }}
    </div>
    <div class="tweet-response">
      <div class="tweet-replies">{{ tweet.replyNum }} 回覆</div>
      <div class="tweet-likes">{{ tweet.likeNum }} 喜歡次數</div>
    </div>
    <div class="tweet-response-action">
      <button 
        type="button" 
        class="tweet-reply-action" 
        data-toggle="modal" 
        data-target="#replyTweetModal"
      >
        <img src="~@/assets/img/icon_comment.svg" alt="">
      </button>
      <!-- Modal -->
      <div class="modal fade" id="replyTweetModal" tabindex="-1" aria-labelledby="replyTweetModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <img src="~@/assets/img/icon_close-og.svg" alt="">
              </button>
            </div>
            <div class="modal-body">
              <div class="tweet">
                <a href="" class="avatar">
                  <img :src="tweet.Author.avatar | emptyImage" alt="">
                </a>
                <div class="tweet-info">
                  <div class="user-info">
                    <a class="name" href="">{{ tweet.Author.name }}</a>
                    <span class="account">@{{ tweet.Author.account }}</span>
                    <span class="tweet-update-at">
                      <!-- ・{{ tweet.createdAt }} -->
                      ・{{ tweet.createdAt | exactDate }}
                      </span>
                  </div>
                  <div class="tweet-content">
                    {{ tweet.description}}
                  </div>
                  <div class="tweet-reply-to">回覆給<span>@{{ tweet.Author.account }}</span></div>
                </div>
              </div>
              <form class="reply-tweet" @submit.stop.prevent="handleSubmit">
                <div class="reply-tweet-wrap">
                  <span class="avatar" href="">
                    <img :src="currentUser.avatar" alt="">
                  </span>
                  <textarea 
                    v-model="comment"
                    class="reply-textarea" 
                    name="comment" 
                    id="" 
                    cols="30" 
                    rows="5" 
                    maxlength="140" 
                    placeholder="推你的回覆">
                  </textarea>
                </div>
                <button 
                  type="submit"
                  class="btn reply-button" 
                  :disabled="isProcessing"
                >
                  {{ isProcessing ? '回覆中...' : '回覆' }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- Button trigger modal -->
      <!-- <div class="modal fade" id="replyTweetModal" tabindex="-1" aria-labelledby="replyTweetModalLabel" aria-hidden="true">
        <ReplyTweetModal 
          :tweet="tweet"
        />
      </div> -->
      <button
        v-if="tweet.isLike"
        class="likes" 
        :class="{ 'is-like': tweet.isLike }"
        type="button" 
        :disabled="isProcessing"
        @click.stop.prevent="deleteLike(tweet.id)"
      >
        <img src="~@/assets/img/icon_like-fill.svg" alt="">
      </button>
      <button
        v-else
        class="likes" 
        type="button" 
        :disabled="isProcessing"
        @click.stop.prevent="addLike(tweet.id)"
      >
        <img src="~@/assets/img/icon_like.svg" alt="">
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { emptyImageFilter } from "../utils/mixins"
import { exactDateFilter } from "./../utils/mixins"
// import ReplyTweetModal from './../components/ReplyTweetModal.vue'
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'
import $ from 'jquery'

export default {
  mixins: [exactDateFilter,emptyImageFilter],
  props: {
    // isCurrentUser: {
    //   type: Boolean,
    //   required: true
    // },
    initialTweet: {
      type: Object,
      required: true
    },
    tweetId: {
      type: Number,
      required: true
    }
  },
  components: {
    // ReplyTweetModal
  },
  data () {
    return {
      tweet: this.initialTweet,
      comment: '',
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    initialTweet (newValue) {
      this.tweet = {
        ...this.tweet,
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
    async handleSubmit() {
      console.log(this.tweetId)
      console.log(this.comment)
      try {
        if (!this.comment.trim()) {
          Toast.fire({
            icon: "warning",
            title: "您的推文未填寫任何內容",
          })
          return
        }
        this.isProcessing = true

        console.log('要送去後端的的 Id:', this.tweetId)
        console.log('要送去後端的的 comment:', this.comment)
        const { data } = await tweetsAPI.createTweetReply({
          tweetId: this.tweetId,
          comment: this.comment
        })

        if (data.status === "error") {
          throw new Error(data.message)
        }

        this.$emit("after-create-comment", {
          commentId: data.tweetId,
          comment: this.comment 
        })

        $("#replyTweetModal").modal("hide")
        
        this.tweet.replyNum += 1

        Toast.fire({
          icon: "success",
          title: "回覆推文成功",
        });
        this.isProcessing = false;

        this.comment = ''

      } catch (error) {
        console.log(error)
        this.isProcessing = false
        Toast.fire({
          icon: "warning",
          title: "無法新增推文，請稍候在試",
        });
      }
    }
  }
}
</script>

<style scoped>
  .tweet-detail,
  .tweet-replied-list {
    text-align: left;
  }
  .user {
    padding: 10px 20px;
  }
  .tweet-content {
    padding: 10px 20px;
    font-size: 23px;
  }
  .tweet-created-at {
    padding: 0 20px 20px ;
  }
  .tweet-response {
    display: flex;
    padding: 20px;
    border-width: 1px 0;
    border-style: solid;
    border-color: #E6ECF0;
  }
  .tweet-replies {
    margin-right: 30px;
  }
  .tweet-response-action {
    display: flex;
    padding: 10px 20px;
    border-bottom: 1px solid #E6ECF0;
  }
  .tweet-response-action > button {
    width: 20px;
  }
  .tweet-response-action img {
    width: 100%;
  }
  .tweet-reply-action {
    margin-right: 20%;
  }
    .tweet-reply-to {
    font-size: 13px;
    margin-top: 10px;
  }
  .tweet-reply-to span {
    margin-left: 5px;
    color: #FF6600;
  }

  .modal-content {
    border-radius: 14px;
  }
  .modal-body .tweet-content {
    padding: 10px 0;
  }
  .modal-body .account {
    margin-left: 5px;
  }
  .close {
    margin: 0;
    padding: 0;
    opacity: 1;
  }
  .tweet {
    position: relative;
    display: flex;
    text-align: left;
  }
  .tweet::before {
    content: '';
    border: 1px solid #CCD6DD;
    position: absolute;
    height: calc( 100% - 30px );
    top: 55px;
    bottom: 0;
    left: 5%;
    z-index: 0;
  }
  .tweet-info {
    width: calc(100% - 60px);
  }
  .reply-tweet {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    height: 200px;
    margin-top: 30px;
  }
  .reply-tweet-wrap {
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
  .reply-button {
    align-self: flex-end;
    color: #fff;
    background-color: #FF6600;
  }
  .name:hover {
  color: #ff6600;
  text-decoration: none;
  }
</style>