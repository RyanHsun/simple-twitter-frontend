<template>
  <div 
    class="chat-wrap" 
    :class="{ 'show-load-more': showLoadMore }"
    ref="messages" 
    @scroll="handleScroll($event)"
    >
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
      <div v-if="loadMoreLimit === 'limited'" class="load-text load-limited">
        沒有更多訊息了！
      </div>
      <div v-if="showLoadMore" class="load-text load-more">
        <span class="loading"></span><span>正在載入訊息...</span>
      </div>
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
          @keypress.enter="post_private_msg"
        >
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
    },
    initialMessageLoadMore: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      text: '',
      memberNum: 0, 
      messages: [],
      loadMoreLimit: 20,
      showLoadMore: false,
      socket: null,
      isSelf: false,
      isLoading: true,
      privateRoom: {},
      isPostMsg: false
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
    get_private_msg(data) {
      this.messages.push(data)
    }
  },
  created () {
    // this.updateScroll()
  },
  updated () {
    if (this.loadMoreLimit === 20) {
      this.updateScroll(this.$refs.messages.scrollHeight)
    }
  },
  watch: {
    initialCurrentRoom () {
      this.privateRoom = this.initialCurrentRoom
    },
    initialMessages () {
      this.messages = this.initialMessages
    },
    initialMessageLoadMore () {
      this.loadMoreLimit = this.initialMessageLoadMore
    },
    isPostMsg (value) {
      if (value) {
        setTimeout(() => { 
          this.text = ''
          console.log('setTimeout!')
        }, 500)
      }
    },
    text (value) {
      if (value === '' && this.isPostMsg) {
        this.updateScroll(this.$refs.messages.scrollHeight)
        console.log('發送訊息回到底部')
        this.isPostMsg = false
      }
    },
    loadMoreLimit (value) {
      if (value === 'limited') {
        setTimeout(() => { 
          this.loadMoreLimit = 'nomore'
        }, 3000)
      }
    },
    showLoadMore (value) {
      if (value) {
        setTimeout(() => { 
          this.showLoadMore = false
        }, 2000)
      }
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
      this.$emit('after-post-msg', this.text)
      this.isPostMsg = true
    },
    updateScroll(heightPoint) {
      this.$refs.messages.scrollTop = heightPoint
    },
    handleScroll(e) {
      if (e.srcElement.scrollTop === 0 ) {
        this.loadMore()
      }
    },
    loadMore() {
      if (this.messages.length >= this.loadMoreLimit) {
        // console.log('到頂部了！')
        this.showLoadMore = true

        // const offset = 0
        const limit = this.messages.length + 5
        setTimeout(() => { 
          this.$emit('after-scroll-top', limit)
          this.loadMoreLimit = limit
        }, 2000)
        
      } else if (this.loadMoreLimit - this.messages.length <= 5){
        console.log('this.messages.length', this.messages.length)
        console.log('this.loadMoreLimit', this.loadMoreLimit)
        this.loadMoreLimit = 'limited'
        // console.log('已載入所有資料！')
      }
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
  overscroll-behavior-y: contain;
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
.chat > .load-more {
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #fdaa72;
}
.loading {
  height: 15px;
  width: 15px;
  border-radius: 100%;
  margin: 6px;
  border: 2px solid #fdaa72;
  border-bottom-color: transparent;
  vertical-align: middle;
  -webkit-animation: rotate 0.75s linear infinite;
  animation: rotate 0.75s linear infinite;
}
.load-more span:last-child {
  padding-top: 5px;
}
.load-limited {
  color: #ccc;
}
.show-load-more {
  overflow-y: hidden;
}
@keyframes rotate {
  0% {
      -webkit-transform: rotate(0deg);
  }
  100% {
      -webkit-transform: rotate(360deg);
  }
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