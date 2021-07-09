<template>
  <div class="user-profile">
    <div class="user-profile-head">
      <div class="user-cover">
        <img :src="user.cover" alt="">
      </div>
      <p class="user-avatar avatar">
        <img :src="user.avatar" alt="">
      </p>
      <button type="button" class="btn user-edit" data-toggle="modal" data-target="#editProfileModal">
        編輯個人資料
      </button>
      <!-- Button trigger modal -->
      <div class="modal fade" id="editProfileModal" tabindex="-1" aria-labelledby="editProfileModalLabel" aria-hidden="true">
        <EditProfileModal />
      </div>
      
    </div>
    <p  class="user-info">
      <span class="name">{{ user.name }}</span>
      <span class="account">@{{ user.account }}</span>
    </p>
    <div class="user-introduction">
      {{ user.introduction }}
    </div>
    <div class="user-followships">
      <div class="user-following">{{ user.followingNum }} 個跟隨中</div>
      <div class="user-follower">{{ user.followerNum }} 位跟隨者</div>
    </div>
    <div class="user-tab">
      <div class="user-tweet active">推文</div>
      <div class="user-reply">推文與回覆</div>
      <div class="user-likes">喜歡的內容</div>
    </div>
  </div>
</template>

<script>
import EditProfileModal from './../components/EditProfileModal.vue'

export default {
  components: {
    EditProfileModal
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>

<style>
  .container {
    display: grid;
    grid-template-columns: 20% auto 30%;
    max-width: 1500px;
    margin: 0 auto;
    padding: 0 20px;
  }
  .user-profile {
    text-align: left;
    border-width: 0 1px;
    border-style: solid;
    border-color: #E6ECF0;
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
    height: 200px;
    margin-bottom: 10px;
    overflow: hidden;
  }
  .user-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
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

<style scoped>
  .user-info {
    display: inline-block;
    padding: 0 20px;
  }
  .user-info span{
    display: block;
  }
</style>