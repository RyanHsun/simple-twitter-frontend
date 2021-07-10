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
        <TweetRepliedList 
          :tweet="tweet"
          :initialTweetReplies="tweetReplies"
        />
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
  "id": 4,
  "isLike": false,
  "description": "Rerum molestiae quo doloribus sed earum vel ut omnis saepe. Quo aut ut ullam sit quia autem. Aperiam voluptas aliquid neque.",
  "likeNum": 60,
  "replyNum": 3,
  "createdAt": "2021-07-10T02:02:38.000Z",
  "updatedAt": "2021-06-18T10:02:28.000Z",
  "deletedAt": null,
  "AdminId": null,
  "Author": {
    "id": 4,
    "account": "user4",
    "name": "Yoshiko Kovacek",
    "avatar": "https://loremflickr.com/g/320/320/girl/all"
  }
}

const dummyTweetReplies = [
  {
    "id": 91,
    "comment": "Et distinctio quo ex aspernatur magnam et quaerat voluptas. Minus inventore dolore sapiente laboriosam ut eum ex voluptatem. Dolorum nobis tempora pariatur officia.",
    "createdAt": "2021-07-08T20:06:08.000Z",
    "User": {
      "id": 1,
      "account": "user1",
      "name": "Karianne Lang",
      "avatar": "https://loremflickr.com/g/320/320/boy/?lock=1"
    }
  },
  {
    "id": 92,
    "comment": "Sit atque enim dolores quia modi sed repellendus recusandae.",
    "createdAt": "2021-07-02T20:06:08.000Z",
    "User": {
      "id": 3,
      "account": "user3",
      "name": "Alvah Thompson II",
      "avatar": "https://loremflickr.com/g/320/320/boy/?lock=3"
    }
  },
  {
    "id": 93,
    "comment": "Pariatur dolores nam deserunt cumque exercitationem.",
    "createdAt": "2021-07-01T20:06:08.000Z",
    "User": {
      "id": 2,
      "account": "user2",
      "name": "Selmer Stanton",
      "avatar": "https://loremflickr.com/g/320/320/boy/?lock=2"
    }
  }
]

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
        Author: {}
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

      this.tweet = {...dummyTweet}
      // const { id, description, likeNum, replyNum, isLike, createdAt, Author } = this.tweet
      // this.tweet = {
      //   id,
      //   description,
      //   likeNum,
      //   replyNum,
      //   isLike,
      //   createdAt,
      //   Author
      // }
      
      this.tweetReplies = [...dummyTweetReplies]
      // this.tweetReplies = tweetReplies
      
      // this.tweetReplies = dummyTweetReplies.replies

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