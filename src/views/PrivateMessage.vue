<template>
  <div class="container private-message">
    <Sidebar />
    <div class="private-message-wrap">
      <section class="private-users">
        <div class="private-users-wrap">
          <h2 class="headbar">
            <div class="title">
              <div class="main-title">訊息</div>
              <div 
                class="add-msg-user"
                @click="addMsgUser()">
                <img src="~@/assets/img/icon_mail.svg" width="25px" alt="" />
              </div>
            </div>
          </h2>
          <div
            class="private-users-list">
            <!-- <Spinner v-if="isLoading"/> -->
            <UserRooms
              v-for="user in userRooms"
              :key="user.id"
              :initialUser="user" 
              @after-click="afterClick"
            />
          </div>
        </div>
      </section>
      <section class="private-chatroom">
        <div class="private-chatroom-wrap">
          <h2 class="headbar">
            <div class="title">
              <div class="main-title">{{ currentRoom.name }}</div>
              <div class="sub-title">@{{ currentRoom.account }}</div>
            </div>
          </h2>
          <div
            class="private-chatroomCard">
            <PrivateChatroom 
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { emptyImageFilter } from "../utils/mixins";
import Sidebar from "./../components/Sidebar.vue"
import UserRooms from "./../components/UserRooms.vue"
import PrivateChatroom from "./../components/PrivateChatroom.vue"
// import Spinner from './../components/Spinner'

const dummyData = [
  {
    id: 2,
    account: 'apple',
    name: 'Apple',
    avatar: 'https://loremflickr.com/cache/resized/65535_50964525871_dbf9e75ce3_320_240_g.jpg',
    lastMsg: 'Whatever is worth doing is worth doing well.',
    createdAt: '2021-07-28T22:03:46.000Z'
  },
  {
    id: 5,
    account: 'banna',
    name: 'Banna',
    avatar: 'https://loremflickr.com/cache/resized/65535_50888036831_e6cde803e7_320_240_g.jpg',
    lastMsg: 'Dinner Time ~~~',
    createdAt: '2021-07-18T22:03:46.000Z'
  }
]

export default {
  name: 'PrivateMessage',
  mixins: [emptyImageFilter],
  components: {
    Sidebar,
    UserRooms,
    PrivateChatroom,
    // Spinner
  },
  data () {
    return {
      socket: null,
      userRooms: [],
      currentRoom: {},
      isLoading: true
    }
  }, 
  computed: {
    ...mapState(['currentUser'])
  },
  sockets: {
    get_private_rooms(data) {
      console.log('取得當前使用者所有私訊聊天室', data.users)
      this.fetchUserRooms(data.users)
      // this.userRoomsNum = data.users.length
      this.isLoading = false
    }
  },
  mounted () {
    this.$socket.on('get_private_rooms')
  },
  created() {
    this.join_private_page(this.currentUser.id)
    this.fetchUserRooms()
  },
  methods: {
    join_private_page(userId) { 
      this.$socket.emit('join_private_page', { userId })
      console.log(`使用者：${userId} 進入到私人訊息頁面了`)
    },
    addMsgUser () {
      console.log('跳窗顯示所有使用者')
    },
    fetchUserRooms() {
      this.userRooms = dummyData.map( user => {
        const { id, account, name, avatar, lastMsg, createdAt } = user
        const isLinked = id === this.currentRoom.id ? true : false
        return { id, account, name, isLinked, avatar, lastMsg, createdAt }
      })
      console.log('取得當前使用者所有私訊聊天室', this.userRooms)
    },
    afterClick (user) {
      // console.log(user)
      this.currentRoom = {
        id: user.id,
        name: user.name,
        account: user.account
      }
      this.userRooms = this.userRooms.map((user) => {
        if(user.id === this.currentRoom.id) {
          user.isLinked = true
        } else {
          user.isLinked = false
        }
        return user
      })
      // console.log(`父層接收聊天室房號：${this.currentRoom}`)
    }
  }
}
</script>
<style scoped>
.container {
  display: grid;
  grid-template-columns: 20% auto;
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 20px;
}
.private-message-wrap {
  display: flex;
}
.private-users {
  width: 45%;
}
.private-chatroom {
  width: 55%;
}
.private-chatroom,
.private-users {
  position: relative;
  margin-top: 50px;
  border-left: 1px solid #e6ecf0;
}
.private-chatroom,
.private-chatroom .headbar {
  border-right: 1px solid #e6ecf0;
}
.private-chatroom-wrap,
.private-users-wrap {
  /* overflow-y: auto; */
  max-height: calc(100vh - 50px);
}
.private-users-wrap {
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
.private-chatroom .headbar {
  transform: scale(1, 1.004);
}
.private-users .title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
.add-msg-user {
  cursor: pointer;
}
.add-msg-user:hover img {
  filter: invert(73%) sepia(100%) saturate(48) hue-rotate(364deg);
  /* transition: .2s ease; */
}
@media (max-width: 992px) {
  .container {
    padding-right: 0;
  }
  .private-message-wrap {
    flex-direction: column;
  }
  .private-message-wrap section {
    width: 100%;
  }
  .private-users-wrap {
    height: 20vh;
  }
  .chat-wrap {
    height: calc( 100vh - 20vh - 99px );
  }
  .private-chatroom .headbar{
    border-top: 1px solid #e6ecf0;
    transform: translateX(-1px);
  }
  .new-tweet {
    display: none;
  }
}
@media (max-width: 576px) {
  .container {
    grid-template-columns: 13% auto;
  }
}
</style>