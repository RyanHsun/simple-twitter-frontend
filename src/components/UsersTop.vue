<template>
  <section class="users-top">
    <div class="wrap">
      <h2 class="title">跟隨誰</h2>
      <ul class="users">
        <li class="user">
          <a class="avatar">
            <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="">
          </a>
          <a class="info" href="">
            <span class="name">user1</span>
            <span class="account">@user1</span>
          </a>
          <button class="btn toggle-follow is-following">正在跟隨</button>
        </li>
        <li class="user">
          <a class="avatar">
            <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="">
          </a>
          <a class="info" href="">
            <span class="name">user1</span>
            <span class="account">@user1</span>
          </a>
          <button class="btn toggle-follow">跟隨</button>
        </li>
        <li class="user">
          <a class="avatar">
            <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="">
          </a>
          <a class="info" href="">
            <span class="name">user1</span>
            <span class="account">@user1</span>
          </a>
          <button class="btn toggle-follow">跟隨</button>
        </li>
      </ul>
      <a class="show-more-user" href="#">顯示更多</a>
    </div>
  </section>
</template>

<style scoped>
  .users-top {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 10px 20px;
    text-align: left;
  }
  .wrap {
    width: 100%;
    border-radius: 14px;
    background-color: #F5F8FA;

  }
  .title{
    padding: 20px;
    font-size: 20px;
    text-align: left;
    border-bottom: 1px solid #E6ECF0;
  }
  .user {
    width: 100%; 
    padding: 10px 20px;
    border-bottom: 1px solid #E6ECF0;
  }
  .is-following {
    color: #fff;
    background-color: #FF6600;
  }
  .show-more-user {
    display: block;
    padding: 20px;
    color: #FF6600;
  }

</style>