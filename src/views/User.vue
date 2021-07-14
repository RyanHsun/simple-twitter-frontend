<template>
  <div class="container">
    <Sidebar :tweets-id="tweets.id" @after-submit-tweet="afterSubmitTweet"/>
    <section class="user">
      <div class="user-wrap">
        <Headbar
          :initialUser="user"
        />
        <UserProfile 
          :initialUser="user"
          :is-current-user="currentUser.id === user.id"
          :initial-is-following="user.isFollowing" 
        />
        <!-- <UserProfile 
          :user="user"
          :is-current-user="currentUser.id === user.id"
          :initial-is-following="user.isFollowing" 
        />-->
        <div class="tweets-switch-tab">
          <button 
            v-for="tweetsSwitchTab in tweetsSwitchTabs"
            :key="tweetsSwitchTab.id"
            class="tab-item nav-item"
            :class="{ active: currentTab === tweetsSwitchTab.mode }"
            @click.stop.prevent="switchTweetTab(tweetsSwitchTab.mode)"
          >
            {{ tweetsSwitchTab.title }}
          </button>
        </div>


        <ul class="tweets-list" v-if="currentTab === 'tweets'">
          <TweetsList 
            v-for="tweet in tweets"
            :key="tweet.id"
            :initinalTweet="tweet" 
          />
        </ul>
        <template v-if="currentTab === 'replied_tweets'">
          <UserRepliedList :user="user" :replies="replies" />
        </template>
        <template v-if="currentTab === 'likes'">
          <UserLikesList :likes="likes" />
        </template>
      </div>
    </section>
    <UsersTop />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Headbar from "./../components/Headbar.vue";
import Sidebar from "./../components/Sidebar.vue";
import UsersTop from "./../components/UsersTop.vue";
import UserProfile from "./../components/UserProfile.vue";
import TweetsList from "./../components/TweetsList.vue";
import UserRepliedList from "./../components/UserRepliedList.vue";
import UserLikesList from "./../components/UserLikesList.vue";
import { v4 as uuidv4 } from "uuid"
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'

export default {
  components: {
    Headbar,
    Sidebar,
    UsersTop,
    UserProfile,
    TweetsList,
    UserRepliedList,
    UserLikesList,
  },
  data() {
    return {
      user: {
        id: -1,
        account: '',
        name: '',
        email: '',
        introduction: '',
        avatar: '',
        cover: '',
        tweetNum: -1,
        likeNum: -1,
        followingNum: -1,
        followerNum: -1,
        lastLoginAt: '',
        isFollowing: false
      },
      tweets: [],
      replies: [],
      likes: [],
      tweetsSwitchTabs: [
        {
          id: 1,
          mode: "tweets",
          title: "推文",
        },
        {
          id: 2,
          mode: "replied_tweets",
          title: "推文與回覆",
        },
        {
          id: 3,
          mode: "likes",
          title: "喜歡的內容",
        }
      ],
      currentTab: "tweets",
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    initialUser (newValue) {
      this.user = {
        ...this.user,
        ...newValue
      }
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchUser(id)
    this.fetchUserTweets(id)
    this.fetchUserRepliedTweets(id)
    this.fetchUserLikes(id)
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchUser(id)
    this.fetchUserTweets(id)
    this.fetchUserRepliedTweets(id)
    this.fetchUserLikes(id)
    next()
  },
  methods: {
    async fetchUser(userId) {
      try {
        const { data } = await usersAPI.get({ userId })

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        const {
          id,
          account,
          name,
          email,
          introduction,
          avatar,
          cover,
          tweetNum,
          likeNum,
          followingNum,
          followerNum,
          lastLoginAt,
          isFollowing
        } = data
        this.user = {
          id,
          account,
          name,
          email,
          introduction,
          avatar,
          cover,
          tweetNum,
          likeNum,
          followingNum,
          followerNum,
          lastLoginAt,
          isFollowing
        }
      } catch (error) {
        console.error(error.message)
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試'
        })
      }
    },
    async fetchUserTweets (userId) {
      try {
        const { data } = await usersAPI.getUserTweets({ userId })

        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.tweets = { ...data }

        // this.tweetsSwitchTabs = [...tweetsSwitchTabs]
        // this.tweets = [...dummyDataUserTweets]
      } catch (error) {
        console.error(error.message)
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試'
        })
      }
    },
    async fetchUserRepliedTweets (userId) {
      try {
        const { data } = await usersAPI.getUserRepliedTweets({ userId })

        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.replies = { ...data }

      } catch (error) {
        console.error(error.message)
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試'
        })
      }
    },
    async fetchUserLikes (userId) {
      try {
        const { data } = await usersAPI.getUserLikes({ userId })

        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.likes = { ...data }

      } catch (error) {
        console.error(error.message)
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試'
        })
      }
    },
    async switchTweetTab(currentTab) {
      try {
        switch (currentTab) {
          case "tweets":
            this.currentTab = currentTab
            this.$router.push({
              name: "user",
              params: { id: this.user.id }
            })
            console.log("tweets")
            break
          case "replied_tweets":
            this.currentTab = currentTab
            this.$router.push({
              name: "user-replied-tweets",
              params: { id: this.user.id }
            })
            console.log("replied")
            break
          case "likes":
            this.currentTab = currentTab
            this.$router.push({
              name: "user-likes-tweets",
              params: { id: this.user.id }
            })
            console.log("likes")
            break
        }
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法更新個人資料，請稍後再試'
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
  .user {
    position: relative;
    margin-top: 50px;
  }
  .user-wrap {
    overflow-y: scroll;
    max-height: calc( 100vh - 50px );
  }
  .tweets-switch-tab {
    display: flex;
    border-width: 0 1px;
    border-style: solid;
    border-color: #E6ECF0;
    border-bottom: 1px solid #E6ECF0;
  }
  .tweets-switch-tab .tab-item {
    width: 130px;
    padding: 15px 0;
    font-size: 15px;
    text-align: center;
    cursor: pointer;
  }
  .tweets-switch-tab .tab-item.active {
    border-bottom: 2px solid #FF6600;
  }
  .nav-item:hover,
  .nav-item.active {
    color: #ff6600;
  }
  .tweets-list {
    border-width: 0 1px;
    border-style: solid;
    border-color: #E6ECF0;
  }
  
</style>