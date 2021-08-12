<template>
  <div class="container private-message">
    <Sidebar /> 
    <div class="private-message-wrap">
      <section class="private-users">
        <div class="private-users-wrap" ref="userRoomsList" @scroll="userRoomsHandleScroll($event)">
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
          <ul
            class="private-users-list">
            <!-- <Spinner v-if="isLoading"/> -->
            <UserRooms
              v-for="user in userRooms"
              :key="user.id"
              :initialUser="user" 
              @after-click="afterClick"
            />
            <li v-if="userRoomsLimit === 'limited'" class="limited">
              已載入所有資料！
            </li>
          </ul>
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
              :initialMessageLoadMore="messageLoadMore"
              @after-post-msg="afterPostMsg"
              @after-scroll-top="afterScrollTop"
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
  data() {
    return {
      socket: null,
      userRooms: [],
      userRoomsLimit: 15,
      currentRoom: {},
      userRoomAwait: {},
      privateRoomAwait: {},
      messages: [],
      messageLoadMore: 0,
      unseenNum: 0,
      unreadRooms: [],
      isLoading: true
    }
  }, 
  computed: {
    ...mapState(['currentUser'])
  },
  sockets: {
    join_private_room(RoomId) {
      console.log('加入的聊天室 RoomId：', RoomId)
    },
    get_msg_notice_details({ unseenRooms, unreadRooms }) {
      console.log('聊天室未看未讀數量：', unseenRooms, unreadRooms)
      this.unreadRooms = unreadRooms
    },
    update_msg_notice_details(data) {
      this.messageNotice = data
      this.userRooms = this.userRooms.map( user => {
        if (user.id === this.messageNotice.id) {
          user.lastMsg.fromRoomMember = true
          user.lastMsg.content = this.messageNotice.lastMsg.content
          user.lastMsg.createdAt = this.messageNotice.lastMsg.createdAt
          user.unreadNum = this.messageNotice.unreadNum
        }
        return user
      })
      console.log('update_msg_notice_details', this.messageNotice)
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
    privateRoomAwait() {
      this.currentRoom = this.privateRoomAwait
      const User1Id = this.currentUser.id
      const User2Id = this.currentRoom.userId
      const RoomId = this.currentRoom.id

      this.join_private_room({ User1Id, User2Id, RoomId })
      this.get_private_history(RoomId, 20)
    },
    unreadRooms() {
      // console.log(this.unreadRooms.length)
      for (let i = 0; i < this.unreadRooms.length; i++) {
        // console.log('未讀的聊天室：', this.unreadRooms[i])
        this.userRooms = this.userRooms.map( user => {
          const { id, lastMsg, roomMember, isLinked } = user
          // console.log('user', user)
          const unreadNum = user.roomMember.id === this.unreadRooms[i].SenderId ? this.unreadRooms[i].unreadNum : user.unreadNum
          return { id, lastMsg, roomMember, isLinked, unreadNum }
        })
        // console.log(`第${i}輪聊天室詳細資料：`, this.userRooms)
      }
    }
  },
  created() {
    this.join_private_page(this.currentUser.id)
    this.catchRoomUserId()
    this.unseenNum = localStorage.getItem('unseenNum')  
  },
  updated() {
    this.$socket.on('join_private_room')
  },
  methods: {
    join_private_page(userId) { 
      this.$socket.emit('join_private_page', { userId })
      localStorage.removeItem('unseenNum')
      this.get_private_rooms(0, this.userRoomsLimit)
    },
    get_private_rooms(offset, limit) {
      this.$socket.emit('get_private_rooms', {
        offset,
        limit
        }, data => {
          // this.userRooms = data
          
          this.userRooms = data.map( user => {
            const { id, lastMsg, roomMember } = user
            const isLinked = id === this.currentRoom.id ? true : false
            return { id, lastMsg, roomMember, isLinked }
          })
          
          const roomUserId = Number(this.$route.params.id)
          const checkPastMsg = this.userRooms.every( user => {
            return user.id !== roomUserId
          })
          if (checkPastMsg && roomUserId) {
            // console.log('沒有對話過！')
            this.handleUserRoomAwait('立即開啟對話吧 ▸')
            this.userRooms.unshift(this.userRoomAwait)
          }

          if (this.unreadRooms.length > 0) {
            for (let i = 0; i < this.unreadRooms.length; i++) {
              this.userRooms = this.userRooms.map( user => {
                const { id, lastMsg, roomMember, isLinked } = user
                const unreadNum = user.roomMember.id === this.unreadRooms[i].SenderId ? this.unreadRooms[i].unreadNum : user.unreadNum
                return { id, lastMsg, roomMember, isLinked, unreadNum }
              })
            }
          }
          // console.log('新的使用者清單：', this.userRooms)
        }
      )
    },
    join_private_room({ User1Id, User2Id, RoomId }) { 
      this.$socket.emit('join_private_room', { User1Id, User2Id, RoomId })
    },
    addMsgUser() {
      console.log('跳窗顯示所有使用者')
    },
    afterClick(user) {
      this.userRoomAwait = {}

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
      this.messageLoadMore = 20

      this.privateRoomAwait = this.currentRoom
      localStorage.setItem('privateRoomAwait', JSON.stringify(this.privateRoomAwait))
      this.$router.push({ name: 'message-await', params: { id: this.currentRoom.id } })
    },
    get_private_history(roomId, limit) { 
      this.$socket.emit('get_private_history', {
        offset: 0,
        limit: limit,
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
      this.userRooms = this.userRooms.map((user) => {
        if(user.id === this.currentRoom.id) {
          user.lastMsg.fromRoomMember = false
          user.lastMsg.content = content
          user.lastMsg.createdAt = new Date()
        } 
        return user
      })
    },
    handleUserRoomAwait(data) {
      this.userRoomAwait = {
        awaitMsg: true,
        id: this.currentRoom.id,
        isLinked: true,
        lastMsg: {
          content: data,
          createdAt: '',
          fromRoomMember: true
        },
        roomMember: {
          account: this.currentRoom.account,
          avatar: this.currentRoom.avatar,
          id: this.currentRoom.userId,
          name: this.currentRoom.name
        }
      }
    },
    userRoomsHandleScroll(e) {
      if (e.srcElement.scrollTop + e.srcElement.offsetHeight >= e.srcElement.scrollHeight ) {
        this.loadMore()
      }
    },
    loadMore() {
      if (this.userRooms.length >= this.userRoomsLimit) {
        const offset = 0
        const limit = this.userRooms.length + 5
        this.get_private_rooms(offset, limit)
        this.userRoomsLimit = limit
      } else {
        this.userRoomsLimit = 'limited'
      }
    },
    afterScrollTop(limit) {
      this.get_private_history(this.currentRoom.id, limit)
      this.messageLoadMore = limit
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
.private-users-wrap {
  max-height: calc(100vh - 50px);
  /* max-height: 300px; */
}
.private-chatroom-wrap {
  /* overflow-y: auto; */
  max-height: calc(100vh - 50px);
}
.private-users-wrap {
  overflow-y: scroll;
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
.private-users-list li.limited {
  margin: 20px;
  color: #ccc;
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