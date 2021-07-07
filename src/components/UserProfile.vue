<template>
  <div class="user-profile">
    <div class="user-profile-head">
      <div class="user-cover">
        <img src="~@/assets/img/cover_photo.jpg" alt="">
      </div>
      <a class="user-avatar avatar">
        <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="">
      </a>
      <button type="button" class="user-edit btn">
        編輯個人資料
      </button>
    </div>
    <a href="" class="user-info">
      <span class="name">user1</span>
      <span class="account">@user1</span>
    </a>
    <div class="user-introduction">
      Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. 
    </div>
    <div class="user-followships">
      <div class="user-following">34 個跟隨中</div>
      <div class="user-follower">808 位跟隨者</div>
    </div>
    <div class="user-tab">
      <div class="user-tweet active">推文</div>
      <div class="user-reply">推文與回覆</div>
      <div class="user-likes">喜歡的內容</div>
    </div>
  </div>
</template>

<style scoped>
  .container {
    display: grid;
    grid-template-columns: 20% auto 30%;
    max-width: 1500px;
    margin: 0 auto;
    padding: 0 20px;
  }
  .user-profile {
    text-align: left;
  }
  .user-profile > div {
    display: flex;
    flex-wrap: wrap;
  }
  .user-profile-head {
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 15px;
  }
  .user-cover {
    width: 100%;
    margin-bottom: 10px;
  }
  .user-cover img {
    width: 100%;
  }
  .user-avatar {
    width: 140px;
    height: 140px;
    margin-top: -70px;
    margin-left: 20px;
  }
  .user-avatar img {
    border: 5px solid #fff;
  }
  .user-edit {
    margin-right: 20px;
  }
  .user-info {
    display: inline-block;
    padding: 0 20px;
  }
  .user-info span{
    display: block;
  }
  .name {
    font-size: 19px;
  }
  .user-introduction, 
  .user-followships {
    padding: 10px 20px;
  }
  .user-followships {
    font-size: 14px;
  }
  .user-following {
    margin-right: 20px;
  }
  .user-tab {
    border-bottom: 1px solid #E6ECF0;
  }
  .user-tab > div {
    width: 130px;
    padding: 15px 0;
    font-size: 15px;
    text-align: center;
    cursor: pointer;
  }
  .user-tab > div.active {
    border-bottom: 2px solid #FF6600;
  }
</style>