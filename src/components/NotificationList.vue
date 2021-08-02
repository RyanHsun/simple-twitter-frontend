<template>
<ul>
  <!-- 這裡放私訊回覆 -->
  <li class="notice">
      <router-link 
        class="avatar" 
        to="/"
      >
        <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="">
      </router-link>
      <div class="notice-info">
        <div class="user-info">
          <router-link 
            class="name" 
            to="/"
          >
            Lisa
          </router-link>
          有新的回覆
          <span class="notice-update-at">・10分鐘前</span>
        </div>
        <div class="notice-content">
          嗨！很高興認識你，方便加Line嗎？
        </div>
      </div>
    </li>
    <!-- 這裡放追蹤 -->
      <li class="notice">
      <router-link 
        class="avatar" 
        to="/"
      >
        <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="">
      </router-link>
      <div class="notice-info">
        <div class="user-info">
          <router-link 
            class="name" 
            to="/"
          >
            Melody
          </router-link>
          開始追蹤你
          <span class="notice-update-at">・10分鐘前</span>
        </div>
      </div>
    </li>
    <!-- 這裡放愛心 -->
      <li class="notice">
      <router-link 
        class="avatar" 
        to="/"
      >
        <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="">
      </router-link>
      <div class="notice-info">
        <div class="user-info">
          <router-link 
            class="name" 
            to="/"
          >
            Melody
          </router-link>
          給你一顆愛心
          <span class="notice-update-at">・10分鐘前</span>
        </div>
      </div>
    </li>
    <!-- 這裡放推文 -->
    <li class="notice">
      <router-link 
        class="avatar" 
        to="/"
      >
        <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="">
      </router-link>
      <div class="notice-info">
        <div class="user-info">
          <router-link 
            class="name" 
            to="/"
          >
            Peter
          </router-link>
          有新的推文
          <span class="notice-update-at">・10分鐘前</span>
        </div>
        <div class="notice-content">
          昨天的羽球金牌賽好緊張，好刺激，給戴資穎100分
        </div>
      </div>
    </li>
    <!-- 這裡放推文回覆 -->
    <li class="notice">
      <router-link 
        class="avatar" 
        to="/"
      >
        <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="">
      </router-link>
      <div class="notice-info">
        <div class="user-info">
          <router-link 
            class="name" 
            to="/"
          >
            Harry
          </router-link>
          回覆你的推文
          <span class="notice-update-at">・10分鐘前</span>
        </div>
        <div class="notice-content">
          對啊，小戴真的很棒！給推
        </div>
      </div>
    </li>


</ul>
    
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
import { fromNowFilter } from './../utils/mixins'

export default {
  name: 'NotificationList',
  mixins: [fromNowFilter,emptyImageFilter],

}
</script>
<style scoped>
.notice {
  position: relative;
  border-bottom: 1px solid #e6ecf0;
  display: flex;
  padding: 10px 15px;
  width: 100%;
}
.avatar {
  position: relative; 
  z-index: 1;
}
.notice-info {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: calc( 100% - 50px);
  text-align: left;
  pointer-events: none;
}
.avatar:hover ~ .full-link,
.notice-info:hover + .full-link {
  background-color: #f5f8fa;
}
.name {
  margin-right: 10px;
  font-weight: bold;
  pointer-events: visiblefill;
}
.notice-content {
  margin: 10px 0;
}

.full-link {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.full-link:hover {
  background-color: #f5f8fa;
  cursor: pointer;
  transition: .2s ease-in-out;
}
.name:hover {
  color: #ff6600;
  text-decoration: none;
}
</style>
