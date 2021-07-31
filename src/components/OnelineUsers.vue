<template>
    <li class="notice">
      <router-link
        class="avatar"
        :to="`/users/${user.id}`"
      >
        <img :src="user.avatar | emptyImage" alt="">
      </router-link>
      <div class="notice-info">
        <div class="user-info">
          <router-link
            class="name"
            :to="`/users/${user.id}`"
          >
            {{ user.name }}
          </router-link>
          <span class="account">@{{ user.account }}</span>
        </div>
        <div 
          v-if="user.msg"
          class="user-msg">
          <span class="last-msg">{{ user.msg }}</span>
          <span class="last-time">{{ user.createdAt | fromNow }}</span>
        </div>
      </div>
      <div 
        v-if="user.msg"
        class="full-link"
        @click="userActive(user)"
      >
      </div>
    </li>
</template>
<script>
import { emptyImageFilter } from "../utils/mixins";
import { fromNowFilter } from '../utils/mixins'
import { mapState } from 'vuex'
export default {
  name: 'OnelineUsers',
  mixins: [fromNowFilter,emptyImageFilter],
  props: {
  user: {
    type: Object,
    required: true
  }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    userActive (user) {
      console.log(`切換到使用者：${user.name} 的訊息聊天室`)
    }
  }
}
</script>
<style scoped>
.notice {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  width: 100%;
  border-bottom: 1px solid #e6ecf0;
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
  background-color: #F5F8FA;
}
.name {
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
  background-color: #F5F8FA;
  cursor: pointer;
  transition: .2s ease-in-out;
}
.name:hover {
  color: #FF6600;
  text-decoration: none;
}
.account {
  font-size: 14px;
}
.last-msg {
  display: inline-block;
  max-width: 250px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space : nowrap;
}
.last-time {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 14px;
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
@media (max-width: 768px) {
  .PublicMessage .avatar {
    width: 40px;
    height: 40px;
  }
}
@media (max-width: 576px) {
  .PublicMessage .avatar {
    width: 30px;
    height: 30px;
  }
  .name,
  .account {
    font-size: 14px;
  }
  .notice-info .user-info {
    margin-bottom: 0;
  }
}
</style>