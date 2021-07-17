<template>
  <section>
    <div class="message-wrap">
      <ul class="message">
        <!-- <li class="other">ewendndo23</li>
        <li class="self">3kdkdk32l</li> -->
        <li 
          v-for="m in message" 
          :key="m.index"
          :class="{ 'self': this.isSelf }"
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
          @click.stop.prevent="sendMessage"
        >
          送出
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      text: '',
      message: [],
      socket: null,
      isSelf: false
    }
  },
  sockets: {
    // connect: function () {
    //   // console.log('socket to notification channel connected')
    //   console.log('connected')
    // },
    message(data) {
      console.log('伺服器連接成功：', data)
    },
    getMessage(data) {
      this.message.push( data )
      this.isSelf = false
      console.log('別人發的訊息：', data)
    }
  },
  mounted () {
    this.$socket.on('getMessage',  data => {
      console.log('資料：', data)
    })
  },
  watch: {
  },
  methods: {
    sendMessage () {
      const sendText = this.text
      this.$socket.emit('sendMessage', sendText, data => {
        data = this.currentUser.id
        console.log('當前使用者id：', data)
        console.log('自己傳的訊息：', sendText)
      })
      this.isSelf = true
      this.message.push( this.text )
      this.text = ''
    }
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
  width: 30px;
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