<template>
<ul class="tweets-list">
  <li 
    v-for="replied in replies"
    :key="replied.id"
    class="tweet"
  >
    <div class="tweet-wrap">
      <div class="replied-tweet">
        <router-link class="avatar" :to="{ name: 'user', params: { id: replied.RepliedTweet.Author.id } }">
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
          </div>
          <div class="tweet-panel">
            <button 
              type="button"
              class="tweet-reply-action" 
              data-toggle="modal" 
              :data-target="`#replyTweetModal-${replied.id}`"
              @click="handleReplyTweetModal"
            >
              <img src="~@/assets/img/icon_comment.svg" alt="">
              <span>{{ replied.RepliedTweet.replyNum }}</span>
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
      <div class="tweet-replied">
        <router-link class="avatar" :to="{ name: 'user', params: { id: user.id } }">
          <img :src="user.avatar" alt="">
        </router-link>
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
      </div>
    </div>
    <!-- Modal -->
    <div 
      v-if="isShowReplyModal"
      class="modal fade" 
      :id="`replyTweetModal-${replied.id}`" 
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
                <img :src="replied.RepliedTweet.Author.avatar" alt="">
              </a>
              <div class="modal-tweet-info">
                <div class="user-info">
                  <a class="name" href="">{{ replied.RepliedTweet.Author.name }}</a>
                  <span class="account">@{{ replied.RepliedTweet.Author.account }}</span>
                  <span class="modal-tweet-update-at">・{{ replied.RepliedTweet.createdAt | fromNow }}</span>
                </div>
                <div class="modal-tweet-content">
                  {{ replied.RepliedTweet.description}}
                </div>
                <div class="modal-tweet-reply-to">回覆給<span>@{{ replied.RepliedTweet.Author.account }}</span></div>
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
      replied: this.replies,
      isShowReplyModal: false
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
    },
    handleReplyTweetModal () {
      this.isShowReplyModal = true
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
