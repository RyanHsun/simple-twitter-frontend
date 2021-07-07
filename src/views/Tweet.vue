<template>
  <div class="container">
    <Sidebar />
    <section class="tweet">
      <div class="tweet-wrap">
        <h2 class="title">
          <img src="~@/assets/img/icon_back.svg" alt="">
          推文
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
            <div class="tweet-replys">34 回覆</div>
            <div class="tweet-likes">808 喜歡次數</div>
          </div>
          <div class="tweet-response-action">
            <div class="tweet-reply-action">
              <img src="~@/assets/img/icon_comment.svg" alt="">
            </div>
            <div class="tweet-like-action">
              <img src="~@/assets/img/icon_like.svg" alt="">
            </div>
          </div>
        </div>
        <ul class="tweet-replys">
          <li class="tweet-reply">
            <a href="" class="avatar">
              <img src="https://randomuser.me/api/portraits/men/82.jpg" alt="">
            </a>
            <div class="tweet-reply-detail">
              <div class="tweet-reply-user-info">
                <a class="name" href="">user1</a>
                <span class="account">@user1</span>
                <span class="tweet-update-at">・3小時</span>
              </div>
              <div class="tweet-reply-to">
                回覆 @apple
              </div>
              <div class="tweet-reply-content">
                Good ~
              </div>
            </div>
          </li>
          <li class="tweet-reply">
            <a href="" class="avatar">
              <img src="https://randomuser.me/api/portraits/men/38.jpg" alt="">
            </a>
            <div class="tweet-reply-detail">
              <div class="tweet-reply-user-info">
                <a class="name" href="">user1</a>
                <span class="account">@user1</span>
                <span class="tweet-update-at">・3小時</span>
              </div>
              <div class="tweet-reply-to">
                回覆 @apple
              </div>
              <div class="tweet-reply-content">
                Good ~
              </div>
            </div>
          </li>
          <li class="tweet-reply">
            <a href="" class="avatar">
              <img src="https://randomuser.me/api/portraits/men/84.jpg" alt="">
            </a>
            <div class="tweet-reply-detail">
              <div class="tweet-reply-user-info">
                <a class="name" href="">user1</a>
                <span class="account">@user1</span>
                <span class="tweet-update-at">・3小時</span>
              </div>
              <div class="tweet-reply-to">
                回覆 @apple
              </div>
              <div class="tweet-reply-content">
                Good ~
              </div>
            </div>
          </li>
          <li class="tweet-reply">
            <a href="" class="avatar">
              <img src="https://randomuser.me/api/portraits/men/76.jpg" alt="">
            </a>
            <div class="tweet-reply-detail">
              <div class="tweet-reply-user-info">
                <a class="name" href="">user1</a>
                <span class="account">@user1</span>
                <span class="tweet-update-at">・3小時</span>
              </div>
              <div class="tweet-reply-to">
                回覆 @apple
              </div>
              <div class="tweet-reply-content">
                Good ~
              </div>
            </div>
          </li>
          <li class="tweet-reply">
            <a href="" class="avatar">
              <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="">
            </a>
            <div class="tweet-reply-detail">
              <div class="tweet-reply-user-info">
                <a class="name" href="">user1</a>
                <span class="account">@user1</span>
                <span class="tweet-update-at">・3小時</span>
              </div>
              <div class="tweet-reply-to">
                回覆 @apple
              </div>
              <div class="tweet-reply-content">
                Good ~
              </div>
            </div>
          </li>
          <li class="tweet-reply">
            <a href="" class="avatar">
              <img src="https://randomuser.me/api/portraits/men/54.jpg" alt="">
            </a>
            <div class="tweet-reply-detail">
              <div class="tweet-reply-user-info">
                <a class="name" href="">user1</a>
                <span class="account">@user1</span>
                <span class="tweet-update-at">・3小時</span>
              </div>
              <div class="tweet-reply-to">
                回覆 @apple
              </div>
              <div class="tweet-reply-content">
                Good ~
              </div>
            </div>
          </li>
          <li class="tweet-reply">
            <a href="" class="avatar">
              <img src="https://randomuser.me/api/portraits/men/33.jpg" alt="">
            </a>
            <div class="tweet-reply-detail">
              <div class="tweet-reply-user-info">
                <a class="name" href="">user1</a>
                <span class="account">@user1</span>
                <span class="tweet-update-at">・3小時</span>
              </div>
              <div class="tweet-reply-to">
                回覆 @apple
              </div>
              <div class="tweet-reply-content">
                Good ~
              </div>
            </div>
          </li>
          <li class="tweet-reply">
            <a href="" class="avatar">
              <img src="https://randomuser.me/api/portraits/men/18.jpg" alt="">
            </a>
            <div class="tweet-reply-detail">
              <div class="tweet-reply-user-info">
                <a class="name" href="">user1</a>
                <span class="account">@user1</span>
                <span class="tweet-update-at">・3小時</span>
              </div>
              <div class="tweet-reply-to">
                回覆 @apple
              </div>
              <div class="tweet-reply-content">
                Good ~
              </div>
            </div>
          </li>
          <li class="tweet-reply">
            <a href="" class="avatar">
              <img src="https://randomuser.me/api/portraits/men/5.jpg" alt="">
            </a>
            <div class="tweet-reply-detail">
              <div class="tweet-reply-user-info">
                <a class="name" href="">user1</a>
                <span class="account">@user1</span>
                <span class="tweet-update-at">・3小時</span>
              </div>
              <div class="tweet-reply-to">
                回覆 @apple
              </div>
              <div class="tweet-reply-content">
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

export default {
  components: {
    Sidebar,
    UsersTop
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
    margin-top: 62px;
    border-width: 0 1px;
    border-style: solid;
    border-color: #E6ECF0;
  }
  .tweet-wrap {
    overflow-y: scroll;
    max-height: 100vh;
  }
  .title {
    display: flex;
  }
  .title img {
    margin-right: 30px;
  }
  .tweet-detail {
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
  .tweet-replys {
    margin-right: 30px;
  }
  .tweet-response-action {
    display: flex;
    padding: 10px 20px;
    border-bottom: 1px solid #E6ECF0;
  }
  .tweet-response-action > div {
    width: 20px;
  }
  .tweet-response-action img {
    width: 100%;
  }
  .tweet-reply-action {
    margin-right: 20%;
  }

  .tweet-reply {
    border-bottom: 1px solid #e6ecf0;
    display: flex;
    padding: 10px 15px;
    width: 100%;
  }
  .tweet-reply-detail {
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