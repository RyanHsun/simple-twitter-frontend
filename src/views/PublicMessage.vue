<template>
  <div class="container">
    <div class="sidebar">
      <Sidebar />
    </div>
    <section class="publicUsers">
      <div class="publicUsers-wrap">
        <h2 class="headbar">
          <div class="title">
            <div class="main-title">上線使用者</div>
          </div>
        </h2>
        <Spinner v-if="isLoading"/>
        <ul
          v-else 
          class="publicUsers-list">
          <NotificationList 
          />
        </ul>
      </div>
    </section>
    <section class="publicChatroom">
      <div class="publicChatroom-wrap">
        <h2 class="headbar">
          <div class="title">
            <div class="main-title">公開聊天室</div>
          </div>
        </h2>
        <Spinner v-if="isLoading"/>
        <ul
          v-else 
          class="publicChatroomCard">
          <PublicChatroom 
          />
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { emptyImageFilter } from "../utils/mixins";
import Sidebar from "./../components/Sidebar.vue"
import NotificationList from "./../components/NotificationList.vue"
import PublicChatroom from "./../components/PublicChatroom.vue"
import Spinner from './../components/Spinner'
// import tweetsAPI from './../apis/tweets'
// import { Toast } from './../utils/helpers'
// import { component } from 'vue/types/umd'

export default {
  mixins: [emptyImageFilter],
  name: "Notification",
  components: {
    Sidebar,
    NotificationList,
    PublicChatroom,
    Spinner
  },
  data() {
    return {
      user: {},
      tweets: [],
      // isProcessing: false,
      // isLoading: true
    }
  }, 
  computed: {
    ...mapState(['currentUser'])
  },
  // created() {
  //   const { offset = 0, limit = 100 } = this.$route.query
  //   this.fetchTweets({ queryOffset: offset, queryLimit: limit })
  // },
  // beforeRouteUpdate (to, from, next) {
  //   const { offset = '', limit = '' } = to.query
  //   this.fetchTweets({ queryOffset: offset, queryLimit: limit })
  //   next()
  // },
  methods: {
    //之後串接通知
    // async fetchTweets({ queryOffset, queryLimit }) {
    //   try {
        
    //     const response = await tweetsAPI.getTweets({
    //       offset: queryOffset,
    //       limit: queryLimit
    //     })

    //     this.tweets = [...response.data]
        
    //     this.isLoading = false

    //   } catch (error) {

    //     this.isLoading = false

    //     console.log('error', error)
    //     Toast.fire({
    //       icon: 'error',
    //       title: '無法取得推文資料，請稍後再試'
    //     })
    //   }
    // }
  }
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 20% 25% auto;
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 0px;
}
.sidebar {
  padding: 0 20px;
}
.publicChatroom,
.publicUsers {
  position: relative;
  margin-top: 50px;
}
.publicChatroom-wrap,
.publicUsers-wrap {
  overflow-y: scroll;
  max-height: calc(100vh - 50px);
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
  border-width: 0 1px 1px 1px;
  border-style: solid;
  border-color: #e6ecf0;
  background: #fff;
}
.title {
  display: inline-block;
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
.publicUsers-list {
  border-width: 0 1px;
  border-style: solid;
  border-color: #e6ecf0;
}
</style>