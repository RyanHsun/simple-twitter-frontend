<template>
  <div class="container">
    <Sidebar />
    <section class="tweet">
      <div class="tweet-wrap">
        <h2 class="headbar">
          <a class="back" href="">
            <img src="~@/assets/img/icon_back.svg" alt="">
          </a>
          <div class="title">
            <div class="main-title">推文</div>
          </div>
        </h2>
        <div class="tweet-detail">
          <div class="user">
            <a class="avatar">
              <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="">
            </a>
            <a href="" class="info">
              <span class="name">user1</span>
              <span class="account">@user1</span>
            </a>
          </div>
          <div class="tweet-content">
            Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. 
          </div>
          <div class="tweet-created-at">
            上午 10:05・2020年6月10日
          </div>
          <div class="tweet-response">
            <div class="tweet-replies">34 回覆</div>
            <div class="tweet-likes">808 喜歡次數</div>
          </div>
          <div class="tweet-response-action">
            <button type="button" class="tweet-reply-action" data-toggle="modal" data-target="#replyTweetModal">
              <img src="~@/assets/img/icon_comment.svg" alt="">
            </button>
            <!-- Button trigger modal -->
            <div class="modal fade" id="replyTweetModal" tabindex="-1" aria-labelledby="replyTweetModalLabel" aria-hidden="true">
              <ReplyTweetModal />
            </div>
            <button class="tweet-like-action" type="button">
              <img src="~@/assets/img/icon_like.svg" alt="">
            </button>
          </div>
        </div>
        <ul class="tweet-replied-list">
          <li class="tweet-replied">
            <a href="" class="avatar">
              <img src="https://randomuser.me/api/portraits/men/82.jpg" alt="">
            </a>
            <div class="tweet-replied-detail">
              <div class="tweet-replied-user-info">
                <a class="name" href="">user1</a>
                <span class="account">@user1</span>
                <span class="tweet-update-at">・3小時</span>
              </div>
              <div class="tweet-replied-to">
                回覆 @apple
              </div>
              <div class="tweet-replied-content">
                Good ~
              </div>
            </div>
          </li>
          <li class="tweet-replied">
            <a href="" class="avatar">
              <img src="https://randomuser.me/api/portraits/men/38.jpg" alt="">
            </a>
            <div class="tweet-replied-detail">
              <div class="tweet-replied-user-info">
                <a class="name" href="">user1</a>
                <span class="account">@user1</span>
                <span class="tweet-update-at">・3小時</span>
              </div>
              <div class="tweet-replied-to">
                回覆 @apple
              </div>
              <div class="tweet-replied-content">
                Good ~
              </div>
            </div>
          </li>
          <li class="tweet-replied">
            <a href="" class="avatar">
              <img src="https://randomuser.me/api/portraits/men/84.jpg" alt="">
            </a>
            <div class="tweet-replied-detail">
              <div class="tweet-replied-user-info">
                <a class="name" href="">user1</a>
                <span class="account">@user1</span>
                <span class="tweet-update-at">・3小時</span>
              </div>
              <div class="tweet-replied-to">
                回覆 @apple
              </div>
              <div class="tweet-replied-content">
                Good ~
              </div>
            </div>
          </li>
          <li class="tweet-replied">
            <a href="" class="avatar">
              <img src="https://randomuser.me/api/portraits/men/76.jpg" alt="">
            </a>
            <div class="tweet-replied-detail">
              <div class="tweet-replied-user-info">
                <a class="name" href="">user1</a>
                <span class="account">@user1</span>
                <span class="tweet-update-at">・3小時</span>
              </div>
              <div class="tweet-replied-to">
                回覆 @apple
              </div>
              <div class="tweet-replied-content">
                Good ~
              </div>
            </div>
          </li>
          <li class="tweet-replied">
            <a href="" class="avatar">
              <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="">
            </a>
            <div class="tweet-replied-detail">
              <div class="tweet-replied-user-info">
                <a class="name" href="">user1</a>
                <span class="account">@user1</span>
                <span class="tweet-update-at">・3小時</span>
              </div>
              <div class="tweet-replied-to">
                回覆 @apple
              </div>
              <div class="tweet-replied-content">
                Good ~
              </div>
            </div>
          </li>
          <li class="tweet-replied">
            <a href="" class="avatar">
              <img src="https://randomuser.me/api/portraits/men/54.jpg" alt="">
            </a>
            <div class="tweet-replied-detail">
              <div class="tweet-replied-user-info">
                <a class="name" href="">user1</a>
                <span class="account">@user1</span>
                <span class="tweet-update-at">・3小時</span>
              </div>
              <div class="tweet-replied-to">
                回覆 @apple
              </div>
              <div class="tweet-replied-content">
                Good ~
              </div>
            </div>
          </li>
          <li class="tweet-replied">
            <a href="" class="avatar">
              <img src="https://randomuser.me/api/portraits/men/33.jpg" alt="">
            </a>
            <div class="tweet-replied-detail">
              <div class="tweet-replied-user-info">
                <a class="name" href="">user1</a>
                <span class="account">@user1</span>
                <span class="tweet-update-at">・3小時</span>
              </div>
              <div class="tweet-replied-to">
                回覆 @apple
              </div>
              <div class="tweet-replied-content">
                Good ~
              </div>
            </div>
          </li>
          <li class="tweet-replied">
            <a href="" class="avatar">
              <img src="https://randomuser.me/api/portraits/men/18.jpg" alt="">
            </a>
            <div class="tweet-replied-detail">
              <div class="tweet-replied-user-info">
                <a class="name" href="">user1</a>
                <span class="account">@user1</span>
                <span class="tweet-update-at">・3小時</span>
              </div>
              <div class="tweet-replied-to">
                回覆 @apple
              </div>
              <div class="tweet-replied-content">
                Good ~
              </div>
            </div>
          </li>
          <li class="tweet-replied">
            <a href="" class="avatar">
              <img src="https://randomuser.me/api/portraits/men/5.jpg" alt="">
            </a>
            <div class="tweet-replied-detail">
              <div class="tweet-replied-user-info">
                <a class="name" href="">user1</a>
                <span class="account">@user1</span>
                <span class="tweet-update-at">・3小時</span>
              </div>
              <div class="tweet-replied-to">
                回覆 @apple
              </div>
              <div class="tweet-replied-content">
                Good ~
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <UsersTop />
  </div>
</template>

<script>
import Sidebar from './../components/Sidebar.vue'
import UsersTop from './../components/UsersTop.vue'
import ReplyTweetModal from './../components/ReplyTweetModal.vue'

export default {
  components: {
    Sidebar,
    UsersTop,
    ReplyTweetModal
  }
}
</script>

<style scoped>

  .container {
    display: grid;
    grid-template-columns: 20% auto 30%;
    max-width: 1500px;
    margin: 0 auto;
    padding: 0 20px;
  }
  .tweet {
    position: relative;
    margin-top: 50px;
  }
  .tweet-wrap {
    overflow-y: scroll;
    max-height: 100vh;
  }
  .headbar {
    position: absolute;
    top: -50px;
    left: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    margin: 0;
    padding: 5px 20px;
    font-size: 18px;
    text-align: left;
    border-width: 0 1px 1px 1px;
    border-style: solid;
    border-color: #E6ECF0;
    background: #fff;
  }
  .back {
    margin-right: 40px;
  }
  .title {
    display: inline-block;
  }
  .main-title {
    font-weight: 900;
  }
  .sub-title {
    font-size: 13px;
    color: #657786;
  }
  .tweet-detail,
  .tweet-replied-list {
    text-align: left;
    border-width: 0 1px;
    border-style: solid;
    border-color: #E6ECF0;
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