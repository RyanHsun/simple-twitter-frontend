<template>
  <div class="chat-wrap">
    <!-- <h1>{{ memberNum }}</h1> -->
    <div class="chat" id="chat">
      <div v-for="msg in messages" :key="msg.id" class="" >
        <!-- <div class="other msg" v-if="m.role === 'other'"> -->
        <div 
          v-if="msg.isSelf"
          class="self msg" >
          <p>
            {{ msg.content }}
          </p>
          <span>{{ msg.createdAt | exactDate }}</span>
        </div>
        <div 
          v-else
          class="other msg">
          <router-link :to="`/users/${msg.UserId}`" class="avatar">
            <img :src="msg.avatar" alt="">
          </router-link>
          <div class="">
            <p>
              {{ msg.content }}
            </p>
            <span>{{ msg.createdAt | exactDate }}</span>
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
        type="text">
      <button 
        class="send-btn"
        type="button"
        @click.stop.prevent="post_public_msg"
      >
        <!-- 送出 -->
        <img src="https://image.flaticon.com/icons/png/512/876/876777.png" alt="">
      </button>
    </div>
  </div>
</template>

<!--script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.1.3/socket.io.min.js"></script>

<script>
  const socket = io('https://twitter-project-2021.herokuapp.com/api')
</script-->

<script>
import { mapState } from 'vuex'
import { Toast } from './../utils/helpers'
import { emptyImageFilter } from "../utils/mixins"
import { exactDateFilter } from "./../utils/mixins"

export default {
  mixins: [exactDateFilter,emptyImageFilter],
  data () {
    return {
      id: 0,
      name: '',
      text: '',
      chat: [],
      memberNum: 0, 
      messages: {
        avatar: '',
        content: '',
        createdAt: ''
      },
      lastMessages: [],
      socket: null,
      isSelf: false
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
    user_join(name) {
      console.log(`${name} 加入聊天室`)
    },
    online_users(data) {
      console.log('上線使用者：', data)
    },
    get_public_msg(data) {
      // console.log(`發的訊息：`, data)
      this.messages.push(data)
    },
  },
  mounted () {
    this.$socket.on('user_join')
  },
  created () {
    const userId = this.currentUser.id
    // const name = this.currentUser.name
    this.join_public_room(userId)
    this.get_public_history() 
    
  },
  methods: {
    // 1. 通知伺服器加入聊天室
    join_public_room(userId) { 
      this.$socket.emit('join_public_room', { userId })
      // console.log('加入聊天室：', userId)
    },
    // 2. 抓取歷史訊息
    get_public_history() { 
      this.$socket.emit('get_public_history', {
        offset: 0,
        limit: 20
      }, data => {
        this.messages = [
          ...data.reverse()
        ]
        this.messages = this.messages.map( msg => {
          const { UserId, avatar, content, createdAt } = msg
          const isSelf = UserId === this.currentUser.id ? true : false
          return { UserId, avatar, content, createdAt, isSelf }
        })
        // console.log('歷史訊息：', this.messages)  
        // this.messages.push( data )
      })
    },
    // 3. 點擊按鈕送出自己的訊息
    post_public_msg () { 
      if (!this.text.length) {
        Toast.fire({
          icon: 'warning',
          title: '你還沒有填寫訊息'
        })
        return
      }

      this.$socket.emit('post_public_msg', { 
        content: this.text,
        userId: this.currentUser.id
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
      console.log(data)

      this.$nextTick(() => {
        let msg = document.getElementById('chat') 
        msg.scrollTop = msg.scrollHeight 
      })
      
      this.text = ''
    },
    // 4. 離開聊天室
    leave_public_room(userId) {
      this.$socket.emit('leave_public_room', { userId })
      console.log(`使用者${userId} 離開聊天室`)
    },  
  },
  beforeDestroy () {
    const userId = this.currentUser.id
    this.leave_public_room(userId)
  }
}
</script>

<style scoped>
.chat-wrap {
/* height: calc( 100vh - 110px); */
  box-sizing: border-box;
}
.chat {
  margin-bottom: 50px;
}
.chat > div{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 15px;
  font-size: 16px;
  /* overflow-y: scroll; */
}
.other {
    display: flex;
    align-self: flex-start;
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
  padding: 10px;
  margin-bottom: 0;
}
.other p {
  background: #ddd;
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
  border-width: 1px 1px 1px 0;
  border-style: solid;
  border-color: #e6ecf0;
  background: #fff;
}
input {
    background: #dde3e6;
    width: 100%;
    height: 35px;
    padding-left: 20px;
    border: 1px solid #dde3e6;
    border-radius: 30px;
    outline: none;
}
.send-btn {
      width: auto;
    margin: 0 20px;
}
.send-btn img {
  width: 20px;
}
</style>