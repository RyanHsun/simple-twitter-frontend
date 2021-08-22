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
                data-toggle="modal"
                data-target="#newMessageModal"
                @click="showModal">
                <img src="~@/assets/img/icon_mail-add.svg" width="30px" alt="" />
              </div>
            </div>
          </h2>
          <ul
            class="private-users-list">
            <Spinner v-if="isLoading"/>
            <UserRooms
              v-for="user in userRooms"
              :key="user.id"
              :initialUser="user" 
              @after-click-user-room="afterClickUserRoom"
            />
            <li v-if="userRoomsLimit === 'limited'" class="limited">
              已載入所有聊天室！
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
              @after-show-user-list-modal="afterShowUserListModal"
            />
          </div>
        </div>
      </section>
    </div>
    <!-- Button trigger modal -->
    <div
      v-if="isShowModal"
      class="modal fade"
      id="newMessageModal"
      data-backdrop="static" 
      data-keyboard="false" 
      tabindex="-1"
      aria-labelledby="newMessageModalLabel"
      aria-hidden="true"
    >
      <!-- Modal -->
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="cancelModal"
            >
              <img src="~@/assets/img/icon_close-og.svg" alt="" />
            </button>
            <span>新訊息</span>
          </div>
          <div class="modal-body">
            <form class="create-tweet" action="">
              <ul class="message-users">
                <li v-if="msgUsersFollowing.length > 0" class="following">正在跟隨的使用者</li>
                <li 
                  v-for="user of msgUsersFollowing" 
                  :key="user.id" 
                  class="message-user"
                  @click="joinUserRoomAwait(user)">
                  <div class="avatar">
                    <img :src="user.avatar | emptyImage" alt="">
                  </div>
                  <div class="user-info">
                    <span ref="" class="name">{{ user.name }}</span>
                    <span class="account">@{{ user.account }}</span>
                  </div>
                  <button v-if="user.joinUserRoomAwait" class="btn" @click.prevent.stop="joinUserRoomConfirm(user)">開始聊天</button>
                </li>
                <li v-if="msgUsersUnFollowing.length > 0" class="un-following">其他未跟隨的使用者</li>
                <li 
                  v-for="user of msgUsersUnFollowing" 
                  :key="user.id" 
                  class="message-user"
                  @click="joinUserRoomAwait(user)">
                  <div class="avatar">
                    <img :src="user.avatar | emptyImage" alt="">
                  </div>
                  <div class="user-info">
                    <span ref="" class="name">{{ user.name }}</span>
                    <span class="account">@{{ user.account }}</span>
                  </div>
                  <button v-if="user.joinUserRoomAwait" class="btn" @click.prevent.stop="joinUserRoomConfirm(user)">開始聊天</button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { emptyImageFilter } from "../utils/mixins"
import { Toast } from "./../utils/helpers"
import usersAPI from "../apis/users"
import Sidebar from "./../components/Sidebar.vue"
import UserRooms from "./../components/UserRooms.vue"
import PrivateChatroom from "./../components/PrivateChatroom.vue"
import Spinner from './../components/Spinner'
import $ from 'jquery'

export default {
  name: 'PrivateMessage',
  mixins: [emptyImageFilter],
  components: {
    Sidebar,
    UserRooms,
    PrivateChatroom,
    Spinner
  },
  data() {
    return {
      socket: null,
      userRooms: [],
      userRoomsLimit: 100,
      currentRoom: {},
      userRoomAwait: {},
      privateRoomAwait: {},
      getPrivateRoomId: 0,
      messages: [],
      messageLoadMore: 0,
      msgUnseenNum: 0,
      msgUnseenRooms: [],
      msgUnreadRooms: [],
      msgUsersFollowing: [],
      msgUsersUnFollowing: [],
      isLoading: true,
      isShowModal: false
    }
  }, 
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    privateRoomAwait() {
      this.currentRoom = this.privateRoomAwait
      const User1Id = this.currentUser.id
      const User2Id = this.currentRoom.userId
      const RoomId = this.currentRoom.id

      this.joinPrivateRoom({ User1Id, User2Id, RoomId })
      this.getPrivateHistory(RoomId, 20)
    },
    msgUnreadRooms() {
      for (let i = 0; i < this.msgUnreadRooms.length; i++) {
        this.userRooms = this.userRooms.map( user => {
          const { id, lastMsg, roomMember, isLinked } = user
          const unreadNum = user.roomMember.id === this.msgUnreadRooms[i].SenderId ? this.msgUnreadRooms[i].unreadNum : user.unreadNum
          return { id, lastMsg, roomMember, isLinked, unreadNum }
        })
      }
    },
    getPrivateRoomId() {
      this.currentRoom.id = this.getPrivateRoomId
      this.privateRoomAwait = this.currentRoom
      localStorage.setItem('privateRoomAwait', JSON.stringify(this.privateRoomAwait))

      this.$router.push({ name: 'message-await', params: { id: this.getPrivateRoomId } })

      if (this.userRooms.length <= 0) return

      const userRoomId = Number(this.$route.params.id)
      const checkPastMsg = this.userRooms.every( user => {
        return user.id !== userRoomId
      })
      if (checkPastMsg && userRoomId) {
        this.handleUserRoomAwait('立即開啟對話吧 ▸')
        this.userRooms.unshift(this.userRoomAwait)
      }

      this.userRooms = this.userRooms.map((user) => {
        if(user.id === this.currentRoom.id) {
          user.isLinked = true
        } else {
          user.isLinked = false
        }
        return user
      })
    }
  },
  created() {
    this.joinPrivatePage(this.currentUser.id)
    this.catchUserRoomId()
    this.msgUnseenNum = localStorage.getItem('msgUnseenNum')
    this.fetchMsgUsers(this.currentUser.id) 
  },
  sockets: {
    join_private_room(RoomId) {
      this.getPrivateRoomId = RoomId
    },
    get_msg_notice_details({ unseenRooms, unreadRooms }) {
      this.msgUnseenRooms = unseenRooms
      this.msgUnreadRooms = unreadRooms
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
    },
    get_private_msg(data) {
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
  methods: {
    joinPrivatePage(userId) { 
      this.$socket.emit('join_private_page', { userId })
      localStorage.removeItem('msgUnseenNum')
      this.getPrivateRooms(0, this.userRoomsLimit)
    },
    getPrivateRooms(offset, limit) {
      this.$socket.emit('get_private_rooms', {
        offset,
        limit
        }, data => {
          this.userRooms = data.map( user => {
            const { id, lastMsg, roomMember } = user
            const isLinked = id === this.currentRoom.id ? true : false
            return { id, lastMsg, roomMember, isLinked }
          })
          
          const userRoomId = Number(this.$route.params.id)
          const checkPastMsg = this.userRooms.every( user => {
            return user.id !== userRoomId
          })
          if (checkPastMsg && userRoomId) {
            this.handleUserRoomAwait('立即開啟對話吧 ▸')
            this.userRooms.unshift(this.userRoomAwait)
          }

          if (this.msgUnreadRooms.length > 0) {
            for (let i = 0; i < this.msgUnreadRooms.length; i++) {
              this.userRooms = this.userRooms.map( user => {
                const { id, lastMsg, roomMember, isLinked } = user
                const unreadNum = user.roomMember.id === this.msgUnreadRooms[i].SenderId ? this.msgUnreadRooms[i].unreadNum : user.unreadNum
                return { id, lastMsg, roomMember, isLinked, unreadNum }
              })
            }
          }
          this.isLoading = false
        }
      )
    },
    joinPrivateRoom({ User1Id, User2Id, RoomId }) { 
      this.$socket.emit('join_private_room', { User1Id, User2Id, RoomId })
    },
    afterClickUserRoom(user) {
      this.userRoomAwait = {}

      this.currentRoom = {
        id: user.id,
        userId: user.roomMember.id,
        name: user.roomMember.name,
        account: user.roomMember.account,
        avatar: user.roomMember.avatar
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
    getPrivateHistory(roomId, limit) { 
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
    catchUserRoomId() {
      const userRoomId = this.$route.params.id
      if (!userRoomId) return
      this.privateRoomAwait = JSON.parse(localStorage.getItem('privateRoomAwait'))
    },
    afterPostMsg(content) {
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
        this.getPrivateRooms(offset, limit)
        this.userRoomsLimit = limit
      } else {
        this.userRoomsLimit = 'limited'
      }
    },
    afterScrollTop(limit) {
      this.getPrivateHistory(this.currentRoom.id, limit)
      this.messageLoadMore = limit
    },
    async fetchMsgUsers(userId) {
      try {
        const responseGetFollowingUsers = await usersAPI.getFollowings({ 
          userId,
          offset: 0,
          limit: 50
        })
        this.msgUsersFollowing = [ ...responseGetFollowingUsers.data ].map( user => {
          const { following } = user
          const msgUser = {
            id: following.id,
            account: following.account,
            name: following.name,
            avatar: following.avatar,
            joinUserRoomAwait: false
          }
          return msgUser
        })

        const responseGetOtherUsers = await usersAPI.getTopUsers({
          offset: 0,
          limit: 50
        })
        this.msgUsersUnFollowing = [...responseGetOtherUsers.data]

      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法取得使用者清單，請稍後再試",
        })
      }
    },
    joinUserRoomAwait(msgUser) {
      this.msgUsersFollowing = this.msgUsersFollowing.map( user => {
        if(user.id === msgUser.id) {
          user.joinUserRoomAwait = true
        } else {
          user.joinUserRoomAwait = false
        }
        return user
      })
      this.msgUsersUnFollowing = this.msgUsersUnFollowing.map( user => {
        if(user.id === msgUser.id) {
          user.joinUserRoomAwait = true
        } else {
          user.joinUserRoomAwait = false
        }
        return user
      })
    },
    joinUserRoomConfirm(user) {
      this.userRoomAwait = {}
      this.currentRoom = {
        id: null,
        userId: user.id,
        name: user.name,
        account: user.account,
        avatar: user.avatar
      }
      
      const User1Id = this.currentUser.id
      const User2Id = user.id
      const RoomId = null

      this.$socket.emit('join_private_room', { User1Id, User2Id, RoomId })

      this.joinUserRoomAwaitToFalse()
      $(`#newMessageModal`).modal("hide")
    },
    joinUserRoomAwaitToFalse() {
      this.msgUsersFollowing = this.msgUsersFollowing.map( user => {
        const { id, account, name, avatar } = user
        const joinUserRoomAwait = false
        return { id, account, name, avatar, joinUserRoomAwait }
      })
      this.msgUsersUnFollowing = this.msgUsersUnFollowing.map( user => {
        const { id, account, name, avatar } = user
        const joinUserRoomAwait = false
        return { id, account, name, avatar, joinUserRoomAwait }
      })
    },
    afterShowUserListModal() {
      this.showModal()
    },
    showModal() {
      this.isShowModal = true
    },
    cancelModal() {
      this.joinUserRoomAwaitToFalse()
      this.isShowModal = false
    },
    leavePrivatePage() {
      this.$socket.emit('leave_private_page')
    },
  },
  beforeDestroy () {
    this.leavePrivatePage()
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
.modal-content {
  overflow: hidden;
}
.modal-header {
  justify-content: flex-start;
  font-size: 18px;
  font-weight: bold;
}
.modal-header span {
  margin-left: 20px;
}
.close {
  margin: 0;
  padding: 0;
  opacity: 1;
}
.modal-body {
  padding: 0;
}
.message-users {
  overflow-y: scroll;
  height: 80vh;
  max-height: 800px;
  margin-bottom: 0;
}
.message-users li {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  width: 100%;
  border-bottom: 1px solid #e6ecf0;
}
.message-users li:last-child {
  border-bottom: none;
}
.message-user:hover {
  background-color: #f5f8fa;
  cursor: pointer;
}
.message-users li .user-info * {
  display: block;
  text-align: left;
}
.message-users .btn {
  position: absolute;
  right: 15px;
  color: #fff;
  background-color: #ff6600;
}
.message-users .following,
.message-users .un-following {
  font-weight: bold;
}
.message-users .un-following  {
  border-top: 9px solid #dce2e6;
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