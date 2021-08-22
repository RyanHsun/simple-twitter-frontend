<template>
  <div>
    <Spinner v-if="isLoading"/>
    <ul v-if="notificationNewest.length > 0" class="notification notification-newest">
      <li class="notice head">新通知</li>
      <li class="notice" v-for="noti of notificationNewest" :key="noti.id">
        <template v-if="noti.Subscribing">
          <router-link 
            class="avatar" 
            :to="{ name: 'user', params: { id: noti.Subscribing.User.id }}">
            <img :src="noti.Subscribing.User.avatar" alt="">
          </router-link>
          <div class="notice-info">
            <div class="user-info">
              <router-link 
              class="name" 
              :to="{ name: 'user', params: { id: noti.Subscribing.User.id }}">
                {{ noti.Subscribing.User.name }} 
              </router-link>
              有新的推文通知
            </div>
            <span class="notice-created-at">
              <img v-if="noti.isRead" :class="{ 'isread': noti.isRead }" src="~@/assets/img/icon_read.svg" width="12px" alt="" /> 
              {{ noti.Subscribing.Tweet.createdAt | fromNow }}
            </span>
            <div class="notice-content">
              {{ noti.Subscribing.Tweet.description }}
            </div>
          </div>
          <div class="full-link" @click="readNotification('tweet', noti.id, noti.Subscribing.Tweet.id)"></div>
        </template>
        <template v-else-if="noti.Like">
          <router-link 
            class="avatar" 
            :to="{ name: 'user', params: { id: noti.Like.User.id }}">
            <img :src="noti.Like.User.avatar" alt="">
          </router-link>
          <div class="notice-info">
            <div class="user-info">
              <router-link 
              class="name" 
              :to="{ name: 'user', params: { id: noti.Like.User.id }}">
                {{ noti.Like.User.name }} 
              </router-link>
              喜歡你的推文
            </div>
            <span class="notice-created-at">
              <img v-if="noti.isRead" :class="{ 'isread': noti.isRead }" src="~@/assets/img/icon_read.svg" width="12px" alt="" /> 
              {{ noti.Like.createdAt | fromNow }}
            </span>
          </div>
          <div class="full-link" @click="readNotification('tweet', noti.id, noti.Like.LikedTweet.id)"></div>
        </template>
        <template v-else-if="noti.Reply">
          <router-link 
            class="avatar" 
            :to="{ name: 'user', params: { id: noti.Reply.User.id }}">
            <img :src="noti.Reply.User.avatar" alt="">
          </router-link>
          <div class="notice-info">
            <div class="user-info">
              <router-link 
              class="name" 
              :to="{ name: 'user', params: { id: noti.Reply.User.id }}">
                {{ noti.Reply.User.name }} 
              </router-link>
              回覆你的推文
            </div>
            <span class="notice-created-at">
              <img v-if="noti.isRead" :class="{ 'isread': noti.isRead }" src="~@/assets/img/icon_read.svg" width="12px" alt="" /> 
              {{ noti.Reply.createdAt | fromNow }}
            </span>
            <div class="notice-content">
              {{ noti.Reply.comment }}
            </div>
          </div>
          <div class="full-link" @click="readNotification('tweet', noti.id, noti.Reply.RepliedTweet.id)"></div>
        </template> 
        <template v-else-if="noti.Follower">
          <router-link 
            class="avatar" 
            :to="{ name: 'user', params: { id: noti.Follower.id }}">
            <img :src="noti.Follower.avatar" alt="">
          </router-link>
          <div class="notice-info">
            <div class="user-info">
              <router-link 
              class="name" 
              :to="{ name: 'user', params: { id: noti.Follower.id }}">
                {{ noti.Follower.name }} 
              </router-link>
              開始跟隨你
            </div>
            <span class="notice-created-at">
              <img v-if="noti.isRead" :class="{ 'isread': noti.isRead }" src="~@/assets/img/icon_read.svg" width="12px" alt="" /> 
              {{ noti.createdAt | fromNow }}
            </span>
          </div>
          <div class="full-link" @click="readNotification('user', noti.id, noti.Follower.id)"></div>
        </template> 
      </li>
    </ul>
    <ul v-if="notificationList.length > 0" class="notification notification-list">
      <li class="notice head">過去的通知</li>
      <li class="notice" v-for="noti of notificationList" :key="noti.id">
        <template v-if="noti.Subscribing">
          <router-link 
            class="avatar" 
            :to="{ name: 'user', params: { id: noti.Subscribing.User.id }}">
            <img :src="noti.Subscribing.User.avatar" alt="">
          </router-link>
          <div class="notice-info">
            <div class="user-info">
              <router-link 
              class="name" 
              :to="{ name: 'user', params: { id: noti.Subscribing.User.id }}">
                {{ noti.Subscribing.User.name }} 
              </router-link>
              有新的推文通知
            </div>
            <span class="notice-created-at">
              <img v-if="noti.isRead" :class="{ 'isread': noti.isRead }" src="~@/assets/img/icon_read.svg" width="12px" alt="" /> 
              {{ noti.Subscribing.Tweet.createdAt | fromNow }}
            </span>
            <div class="notice-content">
              {{ noti.Subscribing.Tweet.description }}
            </div>
          </div>
          <div class="full-link" :class="{ 'unread': !(noti.isRead) }" @click="readNotification('tweet', noti.id, noti.Subscribing.Tweet.id)"></div>
        </template>
        <template v-else-if="noti.Like">
          <router-link 
            class="avatar" 
            :to="{ name: 'user', params: { id: noti.Like.User.id }}">
            <img :src="noti.Like.User.avatar" alt="">
          </router-link>
          <div class="notice-info">
            <div class="user-info">
              <router-link 
              class="name" 
              :to="{ name: 'user', params: { id: noti.Like.User.id }}">
                {{ noti.Like.User.name }} 
              </router-link>
              喜歡你的推文
            </div>
            <span class="notice-created-at">
              <img v-if="noti.isRead" :class="{ 'isread': noti.isRead }" src="~@/assets/img/icon_read.svg" width="12px" alt="" /> 
              {{ noti.Like.createdAt | fromNow }}
            </span>
          </div>
          <div class="full-link" :class="{ 'unread': !(noti.isRead) }" @click="readNotification('tweet', noti.id, noti.Like.LikedTweet.id)"></div>
        </template>
        <template v-else-if="noti.Reply">
          <router-link 
            class="avatar" 
            :to="{ name: 'user', params: { id: noti.Reply.User.id }}">
            <img :src="noti.Reply.User.avatar" alt="">
          </router-link>
          <div class="notice-info">
            <div class="user-info">
              <router-link 
              class="name" 
              :to="{ name: 'user', params: { id: noti.Reply.User.id }}">
                {{ noti.Reply.User.name }} 
              </router-link>
              回覆你的推文
            </div>
            <span class="notice-created-at">
              <img v-if="noti.isRead" :class="{ 'isread': noti.isRead }" src="~@/assets/img/icon_read.svg" width="12px" alt="" /> 
              {{ noti.Reply.createdAt | fromNow }}
            </span>
            <div class="notice-content">
              {{ noti.Reply.comment }}
            </div>
          </div>
          <div class="full-link" :class="{ 'unread': !(noti.isRead) }" @click="readNotification('tweet', noti.id, noti.Reply.RepliedTweet.id)"></div>
        </template> 
        <template v-else-if="noti.Follower">
          <router-link 
            class="avatar" 
            :to="{ name: 'user', params: { id: noti.Follower.id }}">
            <img :src="noti.Follower.avatar" alt="">
          </router-link>
          <div class="notice-info">
            <div class="user-info">
              <router-link 
              class="name" 
              :to="{ name: 'user', params: { id: noti.Follower.id }}">
                {{ noti.Follower.name }} 
              </router-link>
              開始跟隨你
            </div>
            <span class="notice-created-at">
              <img v-if="noti.isRead" :class="{ 'isread': noti.isRead }" src="~@/assets/img/icon_read.svg" width="12px" alt="" /> 
              {{ noti.createdAt | fromNow }}
            </span>
          </div>
          <div class="full-link" :class="{ 'unread': !(noti.isRead) }" @click="readNotification('user', noti.id, noti.Follower.id)"></div>
        </template> 
      </li>
    </ul>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins"
import { fromNowFilter } from './../utils/mixins'
import Spinner from './../components/Spinner'

export default {
  name: 'NotificationList',
  mixins: [fromNowFilter,emptyImageFilter],
  components: {
    Spinner
  },
  data() {
    return {
      notificationList: [],
      notificationNewest: [],
      isLoading: true
    }
  },
  created() {
    const timeStamp = new Date()
    this.join_timeline_page(timeStamp)
    this.get_timeline_notice_details()
  },
  sockets: {
    update_timeline_notice_detail(data) {
      // console.log('update_timeline_notice_detail', data)
      this.notificationNewest.unshift(data)
    }
  },
  methods: {
     join_timeline_page(timestamp) {
      this.$socket.emit('join_timeline_page', { timestamp })
      localStorage.removeItem('notiUnseenNum')
    },
    leave_timeline_page() {
      this.$socket.emit('leave_timeline_page')
    },
    get_timeline_notice_details() {
      this.$socket.emit('get_timeline_notice_details',
        { offset: 0, limit: 20 },
        data => {
          this.notificationList = data.Seen
          this.notificationNewest = data.Unseen
          this.isLoading = false
        }
      )
    },
    readNotification(type, timelineId, paramsId) {
      this.$socket.emit('read_timeline', { timelineId })
      this.$router.push({ name: type, params: { id: paramsId } })
    }
  },
  beforeDestroy() {
    this.leave_timeline_page()
  }

}
</script>
<style scoped>
.notification {
  margin-bottom: 0;
}
.notification-newest {
  border-bottom: 10px solid #dce2e6;
}
.notice {
  position: relative;
  border-bottom: 1px solid #e6ecf0;
  display: flex;
  flex-direction: column;
  padding: 10px 15px 20px 15px;
  width: 100%;
}
.notice.head {
  text-align: left;
  padding: 10px 15px;
  border-bottom: 1px solid #e6ecf0;
}
.avatar {
  position: relative; 
  z-index: 1;
  width: 35px;
  height: 35px;
}
.notice-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 5px;
  text-align: left;
  pointer-events: none;
}
.user-info,
.notice-created-at,
.notice-content {
  position: relative;
  z-index: 1;
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
  margin: 10px 0 0 0;
  color: #666;
  font-size: 14px;
}
.notice-created-at {
  position: absolute;
  top: 8px;
  right: 10px;
  font-size: 12px;
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
.isread {
  filter: invert(73%) sepia(100%) saturate(48) hue-rotate(364deg);
  margin: 0 5px 3px 0;
}
</style>
