<template>
  <div class="container">
    <Sidebar :tweets-id="tweets.id" @after-submit-tweet="afterSubmitTweet" />
    <section class="tweets">
      <div class="tweets-wrap">
        <h2 class="headbar">
          <div class="title">
            <div class="main-title">推文</div>
          </div>
        </h2>
        <form class="create-tweet" @submit.stop.prevent="handleSubmit">
          <div class="create-tweet-wrap">
            <span class="avatar" href="">
              <img
                :src="currentUser.avatar | emptyImage"
                alt=""
              />
            </span>
            <textarea
              v-model="newTweet"
              class="tweet-textarea"
              name=""
              id="index-tweet"
              cols="30"
              rows="2"
              maxlength="140"
              placeholder="有什麼新鮮事？"
            ></textarea>
          </div>
          <button 
            type="submit" 
            class="btn tweet-button"
            :disabled="isProcessing"
          >
            {{ isProcessing ? '推文中...' : '推文' }}
          </button>
        </form>
        <Spinner v-if="isLoading"/>
        <ul
          v-else 
          class="tweets-list">
          <TweetsList 
            v-for="tweet in tweets"
            :key="tweet.id"
            :initinalTweet="tweet" 
          />
        </ul>
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
import TweetsList from "./../components/TweetsList.vue"
import Spinner from './../components/Spinner'
import { v4 as uuidv4 } from "uuid"
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'
// import { component } from 'vue/types/umd'
import { emptyImageFilter } from '../utils/mixins'


export default {
  mixins: [emptyImageFilter],
  name: "Tweets",
  components: {
    Sidebar,
    TweetsList,
    UsersTop,
    Spinner
  },
  data() {
    return {
      user: {},
      tweets: [],
      newTweet: '',
      isProcessing: false,
      isLoading: true
    }
  }, 
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    const { offset = 0, limit = 100 } = this.$route.query
    this.fetchTweets({ queryOffset: offset, queryLimit: limit })
  },
  beforeRouteUpdate (to, from, next) {
    const { offset = '', limit = '' } = to.query
    this.fetchTweets({ queryOffset: offset, queryLimit: limit })
    next()
  },
  watch: {
    newTweet(newValue) {
      if (newValue.length === 140) {
        Toast.fire({
          icon: 'warning',
          title: '字數限制140字',
        })
      }
    },
  },
  methods: {
    async fetchTweets({ queryOffset, queryLimit }) {
      try {
        
        const response = await tweetsAPI.getTweets({
          offset: queryOffset,
          limit: queryLimit
        })

        this.tweets = [...response.data]
        
        this.isLoading = false

      } catch (error) {

        this.isLoading = false

        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法取得推文資料，請稍後再試'
        })
      }
    },
    async handleSubmit() {
      try {
        if (!this.newTweet) {
          Toast.fire({
            icon: 'warning',
            title: '您的推文未填寫任何內容'
          })
          return
        }
        this.isProcessing = true

        const { data } = await tweetsAPI.createTweet({ 
          description: this.newTweet
        })

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        Toast.fire({
          icon: 'success',
          title: '新增推文成功'
        })
        this.isProcessing = false
        this.newTweet = ''

        this.fetchTweets(0, 10)

      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'warning',
          title: '無法新增推文，請稍候在試'
        })
      }
    },
    afterSubmitTweet(payload) {
      const { description } = payload
      console.log("description", description)
      this.tweets.unshift({
        // id: commentId,
        id: uuidv4(),
        description: description,
        createdAt: new Date(),
        likeNum: 0,
        replyNum: 0,
        Author: {
          id: this.user.id,
          account: this.user.account,
          name: this.user.name,
          avatar: this.user.avatar,
        },
      })
      this.fetchTweets(0, 10)
    },
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
.tweets {
  position: relative;
  margin-top: 50px;
}
.tweets-wrap {
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
.tweets-list {
  border-width: 0 1px;
  border-style: solid;
  border-color: #e6ecf0;
}
</style>