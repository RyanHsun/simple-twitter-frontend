<template>
  <div class="chat-wrap" ref="messages">
    <!-- <Spinner v-if="isLoading"/> -->
    <div class="chat messages" id="messages">
      <div v-for="msg in messages" :key="msg.id" class="" >
        <div 
          v-if="msg.isSelf"
          class="self msg" >
          <p>
            {{ msg.content }}
          </p>
          <span>{{ msg.createdAt | fromNow }}</span>
        </div>
        <div 
          v-else
          class="other msg">
          <router-link :to="`/users/${msg.UserId}`" class="avatar">
            <img :src="msg.avatar | emptyImage" alt="">
          </router-link>
          <div class="">
            <p>
              {{ msg.content }}
            </p>
            <span>{{ msg.createdAt | fromNow }}</span>
          </div>
        </div>
        <!-- <div class="use-join" v-if="msg.role === 'join'">
          某某某 上線了
        </div> -->
      </div>
    </div>
    <div class="d-flex justify-content-center divgn-items-center send-wrap">
      <input 
        v-model="text"
        placeholder="請輸入訊息 ..."
        type="text"
        maxlength="160"
      >
      <!-- @keydown.stop.prevent.enter="post_private_msg" -->
      <button 
        class="send-btn"
        type="button"
        @click.stop.prevent="post_private_msg"
      >
        <!-- 送出 -->
        <img src="~@/assets/img/icon_send.svg" alt="">
      </button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { Toast } from './../utils/helpers'
import { emptyImageFilter } from "../utils/mixins"
import { fromNowFilter } from './../utils/mixins'
// import Spinner from './../components/Spinner'

export default {
  name: 'PublicChatroom',
  mixins: [fromNowFilter,emptyImageFilter],
  components: {
    // Spinner
  },
  data () {
    return {
      text: '',
      memberNum: 0, 
      messages: {
        avatar: '',
        content: '',
        createdAt: ''
      },
      socket: null,
      isSelf: false,
      isLoading: true,
      privateRoom: [],
      // currentRoom: 3
      //需要用roomId來切換，需要接收roomId，在呈現出那個roomId的對話
    }
  },
  // props: {
  //   user: {
  //   type: Object,
  //   required: true
  //   }
  // },
  computed: {
    ...mapState(['currentUser'])
  },
  sockets: {
    connect: function() {
      console.log("連線成功")
    },
    disconnect(){
      console.log("斷開連線");
    },
    reconnect(){
      console.log("重新連線");
    },
    //私人訊息：這裡都放on
    get_private_rooms(Rooms) {
      console.log(`Rooms${Rooms}號私訊 `)
      console.log('Rooms',Rooms)
    },
    get_private_msg(data) {
      this.messages.push(data)
    },
    join_private_room(data) {
      console.log('加入room的data',data)
      this.privateRoom.push(data)
    }
  },
  //這裡放:進入私訊後，要emit
  created () {
    const User1Id = this.currentUser.id
    // const name = this.currentUser.name
    const User2Id = 1
    this.join_private_room({User1Id,User2Id}) //後面的參數要改
    this.get_private_history()
  },
  updated () {
    this.updateScroll()
    this.$socket.on('get_private_rooms')
    this.$socket.on('join_private_room')
  },
  mounted () {
  },
  methods: {
    // 1. 通知伺服器加入聊天室
    async join_private_room({User1Id,User2Id}) { 
      // this.$socket.emit('join_private_room', { User1Id,User2Id }, (data) => {
      //   console.log('加入room的data',data)
      //   this.privateRoom.push(data)
      // })

      this.$socket.emit('join_private_room', { User1Id,User2Id })

      console.log(`使用者${User1Id}加入私訊頁面，開始與${User2Id}聊天`)
      // console.log('進入與誰的私訊：', User2Id)
      // console.log('私人房號',this.privateRoom)
    },
    // 2. 抓取歷史訊息
    //缺RoomId
    get_private_history() { 
      this.$socket.emit('get_private_history', {
        offset: 0,
        limit: 50,
        // RoomId: this.privateRoom[0].roomId,
      }, data => {
        this.messages = [
          ...data.reverse()
          // {
          //   UserId: 101,
          //   avatar: 'https://loremflickr.com/cache/resized/65535_50964525871_dbf9e75ce3_320_240_g.jpg',
          //   content: 'Whatever is worth doing is worth doing well.',
          //   createdAt: '2021-07-28T22:03:46.000Z',
          //   isSelf: false
          // }
        ]
        this.messages = this.messages.map( msg => {
          const { UserId, avatar, content, createdAt } = msg
          const isSelf = UserId === this.currentUser.id ? true : false
          return { UserId, avatar, content, createdAt, isSelf }
        })
        this.isLoading = false
        // console.log('歷史訊息：', this.messages)  
        console.log('歷史訊息：', data)  
        // this.messages.push( data )
      })
    },
    // 3. 點擊按鈕送出自己的訊息
    post_private_msg () { 
      if (!this.text.length) {
        Toast.fire({
          icon: 'warning',
          title: '你還沒有填寫訊息'
        })
        return
      }
      this.$socket.emit('post_private_msg', { 
        SenderId: this.currentUser.id,
        ReceiverId: 1,
        RoomId: this.privateRoom[0],
        content: this.text,
      })
      
      const avatar = this.currentUser.avatar
      const content = this.text
      const createdAt = new Date()
      const data = {
        avatar,
        content,
        createdAt,
        isSelf: true
      }
      this.messages.push( data )
      this.text = ''
      // Toast.fire({
      //   icon: 'success',
      //   title: '訊息發送成功'
      // })
      console.log(data)
    },
    // 自動置頂
    updateScroll() {
      this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
    },
    // 4. 離開聊天室
    leave_private_page() {
      this.$socket.emit('leave_private_page')
    },
  },
  beforeDestroy () {
    this.leave_private_page()
  }
}
</script>
<style scoped>
.chat-wrap {
  height: calc( 100vh - 110px);
  overflow-y: scroll;
  box-sizing: border-box;
}
.chat::-webkit-scrollbar {
  display: none;
}
.messages {
  height: 100%;
}
.chat > div{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  /* height: 100%; */
  margin: 0 auto;
  padding: 15px;
}
.other {
  align-self: flex-start;
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
}
.self {
  text-align: right;
  align-self: flex-end;
  margin-bottom: 10px;
}
.other > div {
  text-align: left;
}
.msg p {
  width: auto;
  max-width: 400px;
  padding: 15px 20px;
  margin-bottom: 0;
  font-size: 20px;
}
.msg span {
  font-size: 13px;
  color: #6f767a;
}
.other a {
  margin-bottom: 23px;
}
.other p {
  background: #e6edf1;
  border-radius: 20px 20px 20px 0;
}
.self p {
  color: #fff;
  background: #ff6600;
  border-radius: 20px 20px 0 20px;
}
.user_join {
  background: #ccc;
  padding: 5px 15px;
  margin: 0;
  border-radius: 50px;
}
.send-wrap {
  position: absolute;
  bottom: 0;
  align-items: center;
  width: 100%;
  height: 100%;
  max-height: 60px;
  padding: 10px;
  box-sizing: border-box;
  border-width: 1px 0;
  border-style: solid;
  border-color: #e6ecf0;
  background: #fff;
}
input {
    width: 100%;
    height: 35px;
    padding-left: 20px;
    border: 1px solid #dde3e6;
    border-radius: 30px;
    background: #d5dee3;
    outline: none;
}
.send-btn {
      width: auto;
    margin: 0 20px;
}
.send-btn img {
  width: 20px;
  filter: invert(73%) sepia(100%) saturate(48) hue-rotate(364deg);
  transition: .3s ease-in-out;
}
.send-btn:hover img {
  transform: scale(1.2);
  transition: .3s ease-in-out;
}
@media (max-width: 576px) {
  .chat {
    margin-bottom: 10vh;
  }
  .msg p {
    max-width: 180px;
    font-size: 14px;
  }
}
</style>