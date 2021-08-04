<template>
  <div class="chat-wrap" ref="messages">
    <!-- <Spinner v-if="isLoading"/> -->
    <div
      v-if="!initialCurrentRoom.name"
      class="privateroom-await">
      <p>你未選取訊息</p>
      <span>從你現有的訊息中選擇一則，或開始一則新訊息。</span>
      <button class="btn">新訊息</button>
    </div>
    <div 
      v-if="initialCurrentRoom.name"
      class="chat messages" id="messages">
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
    <div class="d-flex justify-content-center align-items-center send-wrap">
      <template v-if="initialCurrentRoom.name">
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
      </template>
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
  name: 'PrivateChatroom',
  mixins: [fromNowFilter,emptyImageFilter],
  components: {
    // Spinner
  },
  props: {
    initialCurrentRoom: {
      type: Object,
      required: true
    },
    initialMessages: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      text: '',
      memberNum: 0, 
      messages: [],
      socket: null,
      isSelf: false,
      isLoading: true,
      privateRoom: {}
    }
  },
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
    get_private_msg(data) {
      this.messages.push(data)
    }
  },
  //這裡放:進入私訊後，要emit
  created () {

  },
  updated () {
    this.updateScroll()
  },
  mounted () {
  },
  watch: {
    initialCurrentRoom () {
      this.privateRoom = this.initialCurrentRoom
    },
    initialMessages () {
      this.messages = this.initialMessages
    }
  },
  methods: {
    // 點擊按鈕送出自己的訊息
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
        ReceiverId: this.privateRoom.userId,
        RoomId: this.privateRoom.id,
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
      // console.log(data)
    },
    // 自動置頂
    updateScroll() {
      this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
    },
    // 離開聊天室
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc( 100vh - 110px);
  overflow-y: scroll;
  box-sizing: border-box;
}
.chat::-webkit-scrollbar {
  display: none;
}
.messages {
  width: 100%;
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
.privateroom-await p {
  margin-bottom: 5px;
  font-size: 24px;
  font-weight: bold;
}
.privateroom-await span {
  display: block;
  margin-bottom: 10px;
}
.privateroom-await .btn {
  color: #fff;
  background-color: #ff6600;
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