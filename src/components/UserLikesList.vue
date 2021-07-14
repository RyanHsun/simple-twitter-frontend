<template>
<ul class="tweets-list">
  <li 
    v-for="like in likes"
    :key="like.id"
    class="tweet"
  >
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
          @click.stop.prevent="toggleLike(like.LikedTweet)"
        >
          <img src="~@/assets/img/icon_like-fill.svg" alt="">
          <span>{{ like.LikedTweet.likeNum }}</span>
        </button>
        <button
          v-else
          class="likes" 
          type="button" 
          @click.stop.prevent="toggleLike(like.LikedTweet)"
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
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <img src="~@/assets/img/icon_close-og.svg" alt="">
            </button>
          </div>
          <div class="modal-body">
            <div class="modal-tweet">
              <a href="" class="avatar">
                <img :src="like.LikedTweet.Author.avatar | emptyImage" alt="">
              </a>
              <div class="modal-tweet-info">
                <div class="user-info">
                  <a class="name" href="">{{ like.LikedTweet.Author.name }}</a>
                  <span class="account">@{{ like.LikedTweet.Author.account }}</span>
                  <span class="modal-tweet-update-at">・{{ like.LikedTweet.createdAt | fromNow }}</span>
                </div>
                <div class="modal-tweet-content">
                  {{ like.LikedTweet.description}}
                </div>
                <div class="modal-tweet-reply-to">回覆給<span>@{{ like.LikedTweet.Author.account }}</span></div>
              </div>
            </div>
            <form class="modal-reply-tweet" action="">
              <div class="modal-reply-tweet-wrap">
                <span class="avatar" href="">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="">
                </span>
                <textarea class="modal-reply-textarea" name="" id="" cols="30" rows="5" maxlength="140" placeholder="推你的回覆"></textarea>
              </div>
              <button class="btn modal-reply-button">回覆</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </li>
</ul>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
import { fromNowFilter } from "./../utils/mixins"
// import ReplyTweetModal from './../components/ReplyTweetModal.vue'

export default {
  components: {
    // ReplyTweetModal
  },
  mixins: [fromNowFilter,emptyImageFilter],
  props: {
    likes: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      like: this.likes,
      isShowReplyModal: false
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
    },
    handleReplyTweetModal () {
      this.isShowReplyModal = true
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

</style>
