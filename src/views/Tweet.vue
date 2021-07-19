<template>
  <div class="container">
    <Sidebar />
    <section class="tweet">
      <div class="tweet-wrap">
        <h2 class="headbar">
          <button class="back" @click="$router.back()">
            <img src="~@/assets/img/icon_back.svg" alt="">
          </button>
          <div class="title">
            <div class="main-title">推文</div>
          </div>
        </h2>
        <Spinner v-if="isLoading"/>
        <template v-else>
          <TweetDetail 
            :tweetId="tweet.id"
            :initialTweet="tweet"
            @after-create-comment="afterCreateComment"
          />
          <TweetRepliedList 
            :tweet="tweet"
            :tweetReplies="tweetReplies"
          />
        </template>
      </div>
    </section>
    <UsersTop />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Sidebar from './../components/Sidebar.vue'
import UsersTop from './../components/UsersTop.vue'
import TweetDetail from './../components/TweetDetail.vue'
import TweetRepliedList from './../components/TweetRepliedList.vue'
import Spinner from './../components/Spinner'
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'

export default {
  name: 'tweet',
  components: {
    Sidebar,
    UsersTop,
    TweetDetail,
    TweetRepliedList,
    Spinner

  },
  data () {
    return {
      tweet: {
        id: -1,
        description: '',
        likeNum: 3,
        replyNum: 5,
        isLike: true,
        createdAt: '',
        Author: {}
      },
      tweetReplies: [],
      isLoading: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created () {
    const { id: tweetId } = this.$route.params
    this.fetchTweet(tweetId)
    this.fetchTweetReplies(tweetId)
  },
  beforeRouteUpdate (to, from, next) {
    const { id: tweetId } = to.params
    this.fetchTweet(tweetId)
    this.fetchTweetReplies(tweetId)
    next()
  },
  methods: {
    async fetchTweet (tweetId) {
      try {
        const { data } = await tweetsAPI.getTweet({ tweetId })
        const {
          id,
          description,
          likeNum,
          replyNum,
          isLike,
          createdAt,
          Author
        } = data

        this.tweet = {
          id,
          description,
          likeNum,
          replyNum,
          isLike,
          createdAt,
          Author
        }

      } catch (error) {
        console.error(error.response)
        // console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法取得推文資料，請稍後再試'
        })
      }
    },
    async fetchTweetReplies (tweetId) {
      try {
        const { data } = await tweetsAPI.getTweetReplies({ tweetId })
        this.tweetReplies = [...data]
        
        this.isLoading = false

      } catch (error) {

        this.isLoading = false

        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法取得推文回覆資料，請稍後再試'
        })
      }
    },
    afterCreateComment (payload) {
      const { commentId, comment } = payload

      this.tweetReplies.push({
        id: commentId,
        comment: comment,
        createdAt: new Date(),
        User: {
          id: this.currentUser.id,
          account: this.currentUser.account,
          name: this.currentUser.name,
          avatar: this.currentUser.avatar,
        },
      })
    }
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
  .tweet {
    position: relative;
    margin-top: 50px;
    border-width: 0 1px;
    border-style: solid;
    border-color: #e6ecf0;
  }
  .tweet-wrap {
    overflow-y: scroll;
    max-height: calc( 100vh - 50px );
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
    border-color: #E6ECF0;
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
</style>