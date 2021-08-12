<template>
    <li class="notice">
      <!-- :class="{ 'new-user-room': user.newUserRoom }" -->
      <router-link
        class="avatar"
        :to="`/users/${user.roomMember.id}`"
      >
        <img :src="user.roomMember.avatar | emptyImage" alt="">
      </router-link>
      <div class="notice-info">
        <div class="user-info">
          <router-link
            class="name"
            :to="`/users/${user.roomMember.id}`"
          >
            {{ user.roomMember.name }}
          </router-link>
          <span class="account">@{{ user.roomMember.account }}</span>
        </div>
        <div class="user-msg" :class="{ 'await-msg': user.lastMsg.content === '立即開啟對話吧 ▸'}">
          <span class="last-msg">
            <small v-if="!user.lastMsg.fromRoomMember">你：</small>{{ user.lastMsg.content }}
          </span>
          <span class="last-time">{{ user.lastMsg.createdAt | fromNow }}</span>
          <span 
            v-if="user.unreadNum > 0" 
            class="unread-number">
            {{ user.unreadNum }}
          </span>
        </div>
      </div>
      <!-- :to="{ name: 'message-await', params: { id: user.id } }" -->
      <div 
        class="full-link"
        :class="{ linked: user.isLinked }"
        @click="handleClick"
      >
      </div>
    </li>
</template>
<script>
import { emptyImageFilter } from "../utils/mixins";
import { fromNowFilter } from '../utils/mixins'
import { mapState } from 'vuex'

// const dummyPrivateHistory = [
//   {
//     UserId: 101,
//     avatar: 'https://loremflickr.com/cache/resized/65535_50964525871_dbf9e75ce3_320_240_g.jpg',
//     content: 'Whatever is worth doing is worth doing well.',
//     createdAt: '2021-07-28T22:03:46.000Z',
//     isSelf: false
//   }
// ]`

export default {
  name: 'UserRooms',
  mixins: [fromNowFilter,emptyImageFilter],
  props: {
    initialUser: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      user: {}
    }
  },
  watch: {
    initialUser () {
      this.user = this.initialUser
    },
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created () {
    this.fetchUser()
  },
  methods: {
    handleClick() {
      this.user.unreadNum = 0
      this.$emit('after-click', this.user)
    },
    fetchUser() {
      this.user = this.initialUser
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
.await-msg .last-msg {
  color: #ff6600;
}
.await-msg .last-time {
  display: none;
}
.unread-number {
  position: absolute;
  bottom: 0;
  right: 0;
  display: block;
  min-width: 25px;
  height: 25px;
  line-height: 25px;
  border-radius: 25px;
  text-align: center;
  background: #ff6600;
  color: #fff;
}
.full-link {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  border-right: 2px solid #fff;
}
.full-link:hover,
.full-link.linked {
  background-color: #f5f8fa;
  cursor: pointer;
}
.full-link:hover {
  border-right: 2px solid #f5f8fa;
  transition: .2s ease-in-out;
}
.full-link.linked {
  border-right: 2px solid #ff6600;
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