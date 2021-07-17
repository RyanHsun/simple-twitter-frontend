<template>
  <section>
    <div class="message-wrap">
      <ul class="message">
        <!-- <li class="other">ewendndo23</li>
        <li class="self">3kdkdk32l</li> -->
        <li 
          v-for="m in message" 
          :key="m.index"
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
          @click.stop.prevent="send"
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
      message: [
        'fweafbewi',
        'qduqdi23',
        'fweafbewi',
        'qduqdi23',
      ],
      selfSend: false
    }
  },
  sockets: {
    connect: function () {
      // console.log('socket to notification channel connected')
      console.log('connected')
    },
    message: function (data) {
      console.log("data", data)
    }
  },
  create () {
    // this.sockets.on('connect', (socket) => {
    //   console.log(`connected with ID: ${socket.id}`)
    // })
    this.getMessage ()

  },
  methods: {
    getMessage () {
      this.$socket.on('getMessage', {
        text: ''
      })
    },
    send () {
      const sendText = this.text
      this.$socket.emit('sendMessage', { sendText })
      this.message.push( this.text )
      this.text = ''
      // console.log('OK')
      
    },
  }
}
</script>

<style scoped>
.message {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 300px;
  height: 400px;
  margin: 0 auto;
  background-color: #cfc;
}
.message li {
  background: #ff6600;
  padding: 10px;
  margin-bottom: 10px;
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