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
            <div
              v-show="currentRoom.name" 
              class="title">
              <div class="main-title">{{ currentRoom.name }}</div>
              <div class="sub-title">@{{ currentRoom.account }}</div>
            </div>
          </h2>
          <div
            class="private-chatroomCard">
            <PrivateChatroom 
              :initialCurrentRoom="currentRoom"
              :initialMessages="messages"
              @after-post-msg="afterPostMsg"
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
      privateRoomAwait: {},
      messages: [],
      unreadRooms: [],
      isLoading: true
    }
  }, 
  computed: {
    ...mapState(['currentUser'])
  },
  sockets: {
    get_private_rooms(Rooms) {
      // this.userRooms = Rooms
      // console.log('取得當前使用者所有私訊聊天室', Rooms)

      this.userRooms = Rooms.map( user => {
        const { id, lastMsg, roomMember } = user
        const isLinked = id === this.currentRoom.id ? true : false
        return { id, lastMsg, roomMember, isLinked }
      })
      // console.log('取得當前使用者所有私訊聊天室', this.userRooms)

      this.isLoading = false
    },
    join_private_room(data) {
      console.log('加入room的data',data)
      // this.privateRoom.push(data)
    },
    get_msg_notice_details({ unseenRooms, unreadRooms }) {
      console.log('未看聊天室數量：', unseenRooms.length)
      // console.log('聊天室未讀數量：', unreadRooms)
      this.unreadRooms = unreadRooms
    },
    get_private_msg(data) {
      // this.messages.push(data)
      // console.log('取得其他使用者傳來的訊息：', data)
      this.userRooms = this.userRooms.map((user) => {
        if(user.id === this.currentRoom.id) {
          user.lastMsg.fromRoomMember = true
          user.lastMsg.content = data.content
          user.lastMsg.createdAt = data.createdAt
        }
        return user
      })
    }
  },
  watch: {
    // userRooms () {
    //   this.afterClick()
    // }
    privateRoomAwait () {
      this.currentRoom = this.privateRoomAwait
      const User1Id = this.currentUser.id
      const User2Id = this.currentRoom.userId
      this.join_private_room({User1Id,User2Id})
      this.get_private_history(this.currentRoom.id)
    },
    unreadRooms () {
      for (let i = 0; i < this.unreadRooms.length; i++) {
        console.log('未讀的聊天室：', this.unreadRooms[i])
        this.userRooms = this.userRooms.map( user => {
          const { id, lastMsg, roomMember, isLinked } = user
          const unread = user.roomMember.id === this.unreadRooms[i].SenderId ? this.unreadRooms[i].unreadNum : 0
          console.log(`第${i}輪聊天室詳細資料：${this.userRooms}`)
          return { id, lastMsg, roomMember, isLinked, unread }
        })
      }
    }
  },
  created() {
    this.join_private_page(this.currentUser.id)
    this.$socket.on('get_private_rooms')
    this.catchRoomUserId()
    // this.fetchUserRooms()
  },
  updated() {
    this.$socket.on('join_private_room')
  },
  methods: {
    join_private_page(userId) { 
      this.$socket.emit('join_private_page', { userId })
      // console.log(`使用者：${userId} 進入到私人訊息頁面了`)
    },
    join_private_room({User1Id,User2Id}) { 

      this.$socket.emit('join_private_room', { User1Id,User2Id })

      // console.log(`使用者${User1Id}加入私訊頁面，開始與${User2Id}聊天`)
      // console.log('進入與誰的私訊：', User2Id)
      // console.log('私人房號',this.privateRoom)
    },
    addMsgUser () {
      console.log('跳窗顯示所有使用者')
    },
    afterClick (user) {
      this.currentRoom = {
        id: user.id,
        userId: user.roomMember.id,
        name: user.roomMember.name,
        account: user.roomMember.account
      }
      this.userRooms = this.userRooms.map((user) => {
        if(user.id === this.currentRoom.id) {
          user.isLinked = true
        } else {
          user.isLinked = false
        }
        return user
      })
      // console.log('所有房間', this.userRooms)
      // console.log(`開啟的聊天室房號：${this.currentRoom.id}`)
      // console.log(`開啟的聊天室對方使用者ID：${this.currentRoom.userId}`)
      this.get_private_history(this.currentRoom.id)

      // const User1Id = this.currentUser.id
      // const User2Id = this.currentRoom.userId
      // this.join_private_room({User1Id,User2Id})
      this.privateRoomAwait = this.currentRoom
      localStorage.setItem('privateRoomAwait', JSON.stringify(this.privateRoomAwait))
      this.$router.push({ name: 'message-await', params: { id: this.currentRoom.id } })
    },
    get_private_history(roomId) { 
      // console.log(roomId)
      this.$socket.emit('get_private_history', {
        offset: 0,
        limit: 5,
        RoomId: roomId,
      }, data => {
        this.messages = [
          ...data.reverse()
        ]
        this.messages = this.messages.map( msg => {
          const { UserId, avatar, content, createdAt } = msg
          const isSelf = UserId === this.currentUser.id ? true : false
          return { UserId, avatar, content, createdAt, isSelf }
        })
        this.isLoading = false
        // console.log('歷史訊息：', this.messages)  
        // console.log('歷史訊息：', data)  
        // this.messages.push( data )
      })
    },
    catchRoomUserId () {
      const roomUserId = this.$route.params.id
      if (!roomUserId) return
      // if (!localStorage.getItem('privateRoomAwait'))
      
      // console.log(`等待啟動聊天的房間號碼：${roomUserId}`)
      this.privateRoomAwait = JSON.parse(localStorage.getItem('privateRoomAwait'))
      // console.log('等待發送訊息的聊天室：', this.privateRoomAwait)
    },
    afterPostMsg (content) {
      // console.log('after post message: ', content)
      this.userRooms = this.userRooms.map((user) => {
        if(user.id === this.currentRoom.id) {
          user.lastMsg.fromRoomMember = false
          user.lastMsg.content = content
          user.lastMsg.createdAt = new Date()
        }
        return user
      })
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