<template>
  <section>
    <div class="message-wrap">
      <ul class="message">
        <!-- <li class="other">ewendndo23</li>
        <li class="self">3kdkdk32l</li> -->
        <li 
          v-for="m in message" 
          :key="m.index"
          :class="{ 'self': isSelf }"
          >
          {{ m }}
        </li>
      </ul>
      <div class="d-flex justify-content-center align-items-center">
        <input 
          v-model="text"
          type="text">
        <button 
          class="btn"
          type="button"
          @click.stop.prevent="post_public_msg"
        >
          送出
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      text: '',
      message: [],
      socket: null,
      isSelf: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  sockets: {
    // connect: function () {
    //   // console.log('socket to notification channel connected')
    //   console.log('connected')
    // },
    message(data) {
      console.log('伺服器連接成功：', data)
    },
    get_public_msg(data) {
      this.message.push( data.msg )
      this.isSelf = false
      console.log('別人發的訊息：', data.msg)
    },
    // new_join(data) {
    //   console.log(`${data.name} 加入聊天室`)
    // }
  },
  mounted () {
    this.$socket.on('get_public_msg')
    this.$socket.on('new_join')
  },
  created () {
    const userId = this.currentUser.id
    // this.join_public_room(userId)
    this.$socket.emit('join_public_room', { userId })
    // this.get_public_msg(data)
    this.$socket.emit('get_public_history', {
      offset: 0,
      limit: 10
    }, data => console.log(data))
    // this.$socket.emit('join_public_room', { userId })
    // this.$socket.emit('get_public_history', {
    //   offset: 0,
    //   limit: 10
    // }, data => console.log(data))
  },
  methods: {
    post_public_msg () {
      const msg = this.text
      const userId = this.currentUser.id
      this.$socket.emit('post_public_msg', { msg, userId })
      console.log('當前使用者id：', userId)
      console.log('自己傳的訊息：', msg)
      console.log('當前使用者：', userId)
      this.isSelf = true
      this.message.push( this.text )
      this.text = ''
    },
    // join_public_room(userId) {
    //   this.$socket.emit('join_public_room', { userId })
    //   console.log('我要加入聊天室')
    // },
    // get_public_history(data) {
    //   this.$socket.emit('get_public_history', {
    //     offset: 0,
    //     limit: 10
    //   }, data => console.log(data))
    //   console.log('歷史訊息：', data)
    // }
  } 
}
</script>

<style scoped>
.message {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  width: 300px;
  height: 400px;
  margin: 0 auto;
  background-color: #cfc;
}
.message li {
  width: auto;
  padding: 10px;
  margin-bottom: 10px;
  background: #ff6600;
}
.message li.self {
  align-self: flex-end;
}
.other {
  align-self: flex-start;
}
.self {
  align-self: flex-end;
}
input {
  background: #F5F8FA;
  height: 50px;
  border: 1px solid #ff6600;
}
</style>