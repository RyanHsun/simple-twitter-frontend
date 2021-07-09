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
        <TweetDetail 
          :tweet="tweet"
        />
        <ul class="tweet-replied-list">
          <TweetRepliedList 
            :tweet="tweet"
            v-for="tweetReplied in tweetReplies"
            :key="tweetReplied.id"
            :initialTweetReplied="tweetReplied"
          />
        </ul>
      </div>
    </section>
    <UsersTop />
  </div>
</template>

<script>
import Sidebar from './../components/Sidebar.vue'
import UsersTop from './../components/UsersTop.vue'
import TweetDetail from './../components/TweetDetail.vue'
import TweetRepliedList from './../components/TweetRepliedList.vue'
// import ReplyTweetModal from './../components/ReplyTweetModal.vue'

const dummyTweet = {
  tweet: {
    "id": 1,
    "description": "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.",
    "likeNum": 10,
    "replyNum": 20,
    "isLike": true,
    "createdAt": "2021-06-27 15:47:52",
    "updatedAt": "2021-06-27 15:47:52",
    "deletedAt": null,
    "User": {
      "id": 1,
      "account": "root",
      "name": "Root",
      "avatar": "https://randomuser.me/api/portraits/men/57.jpg"
    },
    "AdminId": null
  }
}

const dummyTweetReplies = {
  "replies": [
    {
      "id": 1,
      "comment": "Quos asperiores in nostrum cupiditate excepturi aspernatur.",
      "createdAt": "2021-06-27 15:47:52",
      "User": {
        "id": 1,
        "account": "user1",
        "name": "User1",
        "avatar": "https://randomuser.me/api/portraits/men/33.jpg"
      }
    },
    {
      "id": 2,
      "comment": "Quos asperiores in nostrum cupiditate excepturi aspernatur.",
      "createdAt": "2021-06-27 15:47:52",
      "User": {
        "id": 1,
        "account": "user1",
        "name": "User1",
        "avatar": "https://randomuser.me/api/portraits/men/52.jpg"
      }
    },
    {
      "id": 3,
      "comment": "Quos asperiores in nostrum cupiditate excepturi aspernatur.",
      "createdAt": "2021-06-27 15:47:52",
      "User": {
        "id": 1,
        "account": "user1",
        "name": "User1",
        "avatar": "https://randomuser.me/api/portraits/men/5.jpg"
      }
    },
    {
      "id": 4,
      "comment": "Quos asperiores in nostrum cupiditate excepturi aspernatur.",
      "createdAt": "2021-06-27 15:47:52",
      "User": {
        "id": 1,
        "account": "user1",
        "name": "User1",
        "avatar": "https://randomuser.me/api/portraits/men/2.jpg"
      }
    }
  ]
}

export default {
  components: {
    Sidebar,
    UsersTop,
    TweetDetail,
    TweetRepliedList,
    // ReplyTweetModal
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
        User: {}
      },
      tweetReplies: []
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchTweet(id) 
  },
  methods: {
    fetchTweet (tweetId) {
      console.log('tweet Id', tweetId)

      const { tweet } = dummyTweet
      const { id, description, likeNum, replyNum, isLike, createdAt, User } = tweet
      this.tweet = {
        id,
        description,
        likeNum,
        replyNum,
        isLike,
        createdAt,
        User
      }
      
      const { tweetReplies } = dummyTweetReplies
      this.tweetReplies = tweetReplies
      
      this.tweetReplies = dummyTweetReplies.replies


      console.log(this.tweetReplies[1].User.id)
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
  }
  .tweet-wrap {
    overflow-y: scroll;
    max-height: 100vh;
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