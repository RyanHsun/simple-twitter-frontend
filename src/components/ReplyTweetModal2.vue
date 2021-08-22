<template>
  <!-- Modal -->
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
              <img :src="reply.RepliedTweet.Author.avatar | emptyImage" alt="">
            </a>
            <div class="tweet-info">
              <div class="user-info">
                <a class="name" href="">{{ reply.RepliedTweet.Author.name }}</a>
                <span class="account">@{{ reply.RepliedTweet.Author.account }}</span>
                <span class="tweet-update-at">・{{ reply.createdAt | fromNow }}</span>
              </div>
              <div class="tweet-content">
                {{ reply.RepliedTweet.description}}
              </div>
              <div class="tweet-reply-to">回覆給<span>@{{ reply.RepliedTweet.Author.account }}</span></div>
            </div>
          </div>
          <form class="reply-tweet" @submit.stop.prevent="handleSubmit(reply)">
            <div class="reply-tweet-wrap">
              <span class="avatar" href="">
                <img :src="currentUser.avatar | emptyImage" alt="">
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
</template>

<script>
import { mapState } from 'vuex'
import { emptyImageFilter } from "../utils/mixins"
import { fromNowFilter } from './../utils/mixins'
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'
import $ from 'jquery'

export default {
  mixins: [fromNowFilter,emptyImageFilter],
  props: {
    reply: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  data () {
    return {
      comment: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit(reply) {
      try {
        if (!this.comment.trim()) {
          Toast.fire({
            icon: "warning",
            title: "您的回覆未填寫任何內容",
          })
          return
        }
        this.isProcessing = true

        const { data } = await tweetsAPI.createTweetReply({
          tweetId: reply.TweetId,
          comment: this.comment
        })

        if (data.status === "error") {
          throw new Error(data.message)
        }

        this.$emit("after-create-comment", {
          tweetId: reply.TweetId,
          authorId: reply.UserId,
          replyId: data.Reply.id,
          replyNum: reply.RepliedTweet.replyNum
        })

        $(`#replyTweetModal-${reply.id}`).modal("hide")

        Toast.fire({
          icon: "success",
          title: "回覆推文成功",
        });
        this.isProcessing = false;

        this.comment = ''
        
      } catch (error) {
        console.error(error.response);
        Toast.fire({
          icon: "warning",
          title: "無法新增回覆，請稍候在試",
        });
      }
    }
  }
}
</script>

<style scoped> 
  .modal-content {
    border-radius: 14px;
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
  .tweet-reply-to {
    font-size: 13px;
    margin-top: 10px;
  }
  .tweet-reply-to span {
    margin-left: 5px;
    color: #FF6600;
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

</style>