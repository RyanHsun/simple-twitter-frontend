<template>
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
          <span class="account">@123</span>
          <span class="notice-update-at">・10分鐘前</span>
        </div>
        <!-- <div class="notice-content">
          asn;kfn;kasnfvk;anfvlkeajnv;kejsnv;kesnv;kfjnvksv
        </div> -->
      </div>
    </li>
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
