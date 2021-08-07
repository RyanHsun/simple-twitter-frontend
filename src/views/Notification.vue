<template>
  <div class="container">
    <Sidebar />
    <section class="notification">
      <div class="notification-wrap">
        <h2 class="headbar">
          <div class="title">
            <div class="main-title">通知</div>
          </div>
        </h2>
        <!-- 下面的內容做好，Spinner再打開 -->

        <!-- <Spinner v-if="isLoading"/>
        <ul
          v-else 
          class="notification-list">
          <NotificationList 
          /> -->
        <ul
          class="notification-list">
          <NotificationList 
          />
        </ul>
        <!-- 上面的是暫時的，內容做好再換掉 -->
      </div>
    </section>
    <UsersTop />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { emptyImageFilter } from "../utils/mixins";
import Sidebar from "./../components/Sidebar.vue"
import UsersTop from "./../components/UsersTop.vue"
import NotificationList from "./../components/NotificationList.vue"
// import Spinner from './../components/Spinner'
// import tweetsAPI from './../apis/tweets'
// import { Toast } from './../utils/helpers'
// import { component } from 'vue/types/umd'

export default {
  mixins: [emptyImageFilter],
  name: "Notification",
  components: {
    Sidebar,
    NotificationList,
    UsersTop,
    // Spinner
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
  grid-template-columns: 20% auto 30%;
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 20px;
}
.notification {
  position: relative;
  margin-top: 50px;
  border: 1px solid #e6ecf0;
}
.notification-wrap {
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
  transform: scale(1.002);
}
.back {
  margin-right: 40px;
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
.create-tweet {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  border-width: 0 1px;
  border-style: solid;
  border-color: #e6ecf0;
  border-bottom: 10px solid #e6ecf0;
}
.create-tweet-wrap {
  display: flex;
  width: 100%;
  text-align: left;
}
.tweet-textarea {
  width: calc(100% - 60px);
  margin-top: 10px;
  font-size: 18px;
  color: #9197a3;
  border: none;
  outline: none;
  resize: none;
}
.avatar {
  display: inline-block;
}
.tweet-button {
  align-self: flex-end;
  color: #fff;
  background-color: #ff6600;
}
.notification-list {
  border-width: 0 1px;
  border-style: solid;
  border-color: #e6ecf0;
}
</style>