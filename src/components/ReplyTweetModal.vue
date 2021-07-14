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
              <img :src="tweet.Author.avatar | emptyImage" alt="">
            </a>
            <div class="tweet-info">
              <div class="user-info">
                <a class="name" href="">{{ tweet.Author.name }}</a>
                <span class="account">@{{ tweet.Author.account }}</span>
                <span class="tweet-update-at">・{{ tweet.createdAt | fromNow }}</span>
              </div>
              <div class="tweet-content">
                {{ tweet.description}}
              </div>
              <div class="tweet-reply-to">回覆給<span>@{{ tweet.Author.account }}</span></div>
            </div>
          </div>
          <form class="reply-tweet" action="">
            <div class="reply-tweet-wrap">
              <span class="avatar" href="">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="">
              </span>
              <textarea class="reply-textarea" name="" id="" cols="30" rows="5" maxlength="140" placeholder="推你的回覆"></textarea>
            </div>
            <button class="btn reply-button">回覆</button>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
import { fromNowFilter } from './../utils/mixins'

export default {
  mixins: [fromNowFilter,emptyImageFilter],
  props: {
    tweet: {
      type: Object,
      required: true
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