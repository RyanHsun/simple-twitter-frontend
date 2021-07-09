<template>
  <div class="container">
    <Sidebar />
    <section class="user">
      <div class="user-wrap">
        <Headbar />
        <UserProfile 
          :user="user"
        />
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
import Headbar from './../components/Headbar.vue'
import Sidebar from './../components/Sidebar.vue'
import UsersTop from './../components/UsersTop.vue'
import UserProfile from './../components/UserProfile.vue'
import TweetsList from './../components/TweetsList.vue'

const dummyDataUser = {
  "id": 3,
  "account": "user3",
  "name": "Glenna Kautzer DVM",
  "email": "user3@example.com",
  "introduction": "Minima eum distinctio debitis reiciendis.\nConsequatur ad inventore.\nVoluptas exercitationem laudantium molestias.\nSed dolorem necessitatibus et totam maiores.",
  "avatar": "https://loremflickr.com/g/320/320/girl/all",
  "cover": "https://loremflickr.com/800/600/dog",
  "tweetNum": 10,
  "likeNum": 0,
  "followingNum": 76,
  "followerNum": 450,
  "lastLoginAt": "2021-07-08T04:20:22.000Z",
  "isFollowing": true
}

const dummyDataUserTweet = [
  {
    "id": 71,
    "description": "Libero mollitia commodi nesciunt non ad.",
    "likeNum": 0,
    "replyNum": 3,
    "createdAt": "2021-07-08T04:20:23.000Z",
    "User": {
      "id": 3,
      "account": "user3",
      "name": "Glenna Kautzer DVM",
      "avatar": "https://loremflickr.com/g/320/320/girl/all"
    },
    "isLike": false
  },
  {
    "id": 3,
    "description": "Veniam asperiores id.",
    "likeNum": 0,
    "replyNum": 3,
    "createdAt": "2021-07-08T04:20:23.000Z",
    "User": {
      "id": 3,
      "account": "user3",
      "name": "Glenna Kautzer DVM",
      "avatar": "https://loremflickr.com/g/320/320/girl/all"
    },
    "isLike": false
  },
  {
    "id": 81,
    "description": "Praesentium commodi eos eligendi sunt. Fugiat aliq",
    "likeNum": 0,
    "replyNum": 3,
    "createdAt": "2021-07-08T04:20:23.000Z",
    "User": {
      "id": 3,
      "account": "user3",
      "name": "Glenna Kautzer DVM",
      "avatar": "https://loremflickr.com/g/320/320/girl/all"
    },
    "isLike": false
  }
]


export default {
  components: {
    Headbar,
    Sidebar,
    UsersTop,
    UserProfile,
    TweetsList
  },
  data () {
    return {
      user: {},
      tweets: []
    }
  },
  created () {
    this.fetchUser()
  },
  methods: {
    fetchUser () {
      this.user = {...dummyDataUser}
      this.tweets = [...dummyDataUserTweet]
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
  .user {
    position: relative;
    margin-top: 50px;
  }
  .user-wrap {
    overflow-y: scroll;
    max-height: 100vh;
  }
  .tweets-list {
    border-width: 0 1px;
    border-style: solid;
    border-color: #E6ECF0;
  }
</style>