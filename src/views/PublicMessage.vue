<template>
  <div class="container">
    <Sidebar />
    <section class="publicUsers">
      <div class="publicUsers-wrap">
        <h2 class="headbar">
          <div class="title">
            <div class="main-title">上線使用者 ({{ onlineUsersNum }})</div>
          </div>
        </h2>
        <ul
          class="publicUsers-list">
          <Spinner v-if="isLoading"/>
          <OnlineUsers 
            v-else
            v-for="user in onlineUsers"
            :key="user.id"
            :user="user" 
          />
        </ul>
      </div>
    </section>
    <section class="publicChatroom">
      <div class="publicChatroom-wrap">
        <h2 class="headbar">
          <div class="title">
            <div class="main-title">公開聊天室</div>
          </div>
        </h2>
        <ul
          class="publicChatroomCard">
          <PublicChatroom 
          />
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { emptyImageFilter } from "../utils/mixins";
import Sidebar from "./../components/Sidebar.vue"
import OnlineUsers from "./../components/OnelineUsers.vue"
import PublicChatroom from "./../components/PublicChatroom.vue"
import Spinner from './../components/Spinner'

export default {
  mixins: [emptyImageFilter],
  components: {
    Sidebar,
    OnlineUsers,
    PublicChatroom,
    Spinner
  },
  data () {
    return {
      onlineUsers: [],
      socket: null,
      onlineUsersNum: 0,
      isLoading: true
    }
  }, 
  computed: {
    ...mapState(['currentUser'])
  },
  sockets: {
    online_users(data) {
      console.log('上線使用者資料', data)
      // this.fetchOnlineUsers(data.user);
      this.fetchOnlineUsers(data.users);
      this.onlineUsersNum = data.users.length
      this.isLoading = false
    }
  },
  mounted () {
    this.$socket.on('online_users')
  },
  created() {
    this.fetchOnlineUsers()
    },
  methods: {
    fetchOnlineUsers(data) {
      this.onlineUsers = data;
    },
  }
}
</script>
<style scoped>
.container {
  display: grid;
  grid-template-columns: 20% 25% auto;
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 0px;
}
.sidebar {
  padding: 0 20px;
}
.publicChatroom,
.publicUsers {
  position: relative;
  margin-top: 50px;
  border-left: 1px solid #e6ecf0;
}
.publicChatroom-wrap,
.publicUsers-wrap {
  /* overflow-y: auto; */
  max-height: calc(100vh - 50px);
}
.publicUsers-wrap {
  overflow-y: auto;
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
  border-width: 0 0 1px 1px;
  border-style: solid;
  border-color: #e6ecf0;
  background: #fff;
  transform: translateX(-1px);
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
.avatar {
  display: inline-block;
}
</style>