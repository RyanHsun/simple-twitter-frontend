<template>
  <div class="container">
    <Sidebar />
    <section class="tweets">
      <div class="tweets-wrap">
        <h2 class="headbar">
          <div class="title">
            <div class="main-title">推文</div>
          </div>
        </h2>
        <form class="create-tweet" action="">
          <div class="create-tweet-wrap">
            <span class="avatar" href="">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="">
            </span>
            <textarea class="tweet-textarea" name="" id="" cols="30" rows="2" maxlength="140" placeholder="有什麼新鮮事？"></textarea>
          </div>
          <button class="btn tweet-button">推文</button>
        </form>
        
        <ul class="tweets-list">
          <TweetsList
            v-for="tweet in tweets"
            :key="tweet.id"
            :initial-tweet="tweet"
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
import TweetsList from './../components/TweetsList.vue'

const dummyData = {
  Tweets: [
    {
      id: 1,
      content: "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
      isLike: true,
      likeNum: 10,
      replyNum: 2,
      createdAt: "2021-06-27 15:47:52",
      User: {
        id: 8,
        account: "user1",
        name: "User1",
        avatar: "https://randomuser.me/api/portraits/men/58.jpg"
      }
    },
    {
      id: 2,
      content: "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
      isLike: true,
      likeNum: 136,
      replyNum: 5,
      createdAt: "2021-06-27 15:47:52",
      User: {
        id: 2,
        account: "user1",
        name: "User1",
        avatar: "https://randomuser.me/api/portraits/men/20.jpg"
      }
    },
    {
      id: 3,
      content: "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
      isLike: false,
      likeNum: 143,
      replyNum: 5,
      createdAt: "2021-06-27 15:47:52",
      User: {
        id: 1,
        account: "user1",
        name: "User1",
        avatar: "https://randomuser.me/api/portraits/men/28.jpg"
      }
    },
    {
      id: 4,
      content: "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
      isLike: true,
      likeNum: 13,
      replyNum: 5,
      createdAt: "2021-06-17 15:47:52",
      User: {
        id: 4,
        account: "user1",
        name: "User1",
        avatar: "https://randomuser.me/api/portraits/men/21.jpg"
      }
    },
    {
      id: 5,
      content: "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
      isLike: false,
      likeNum: 13,
      replyNum: 5,
      createdAt: "2021-06-27 15:47:52",
      User: {
        id: 3,
        account: "user1",
        name: "User1",
        avatar: "https://randomuser.me/api/portraits/men/18.jpg"
      }
    },
    {
      id: 6,
      content: "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
      isLike: false,
      likeNum: 13,
      replyNum: 5,
      createdAt: "2021-06-22 15:47:52",
      User: {
        id: 1,
        account: "user1",
        name: "User1",
        avatar: "https://randomuser.me/api/portraits/men/23.jpg"
      }
    }
  ]
}


export default {
  name: 'tweets',
  components: {
    Sidebar,
    TweetsList,
    UsersTop
  },
  data () {
    return {
      tweets: []
    }
  },
  created () {
    this.fetchTweets()
  },
  methods: {
    fetchTweets () {
      const { Tweets } = dummyData
      this.tweets = Tweets
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
  .tweets {
    position: relative;
    margin-top: 50px;
  }
  .tweets-wrap {
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
  .create-tweet {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    border-width: 0 1px;
    border-style: solid;
    border-color: #E6ECF0;
    border-bottom: 10px solid #E6ECF0;
  }
  .create-tweet-wrap {
    display: flex;
    width: 100%;
    text-align: left;
  }
  .tweet-textarea {
    width: calc( 100% - 60px);
    margin-top: 10px;
    font-size: 18px;
    color: #9197A3;
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
    background-color: #FF6600;
  }
  .tweets-list {
    border-width: 0 1px;
    border-style: solid;
    border-color: #E6ECF0;
  }
</style>