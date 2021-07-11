<template>
  <div class="container">
    <Sidebar @after-submit-tweet="afterSubmitTweet"/>
    <section class="user">
      <div class="user-wrap">
        <Headbar
          :user="user"
        />
        <UserProfile 
          :user="user"
          @after-submit="handleAfterSubmit"
        />
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

        <template v-if="currentTab === 'tweets'">
          <TweetsList :tweets="tweets" />
        </template>
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
import Headbar from "./../components/Headbar.vue";
import Sidebar from "./../components/Sidebar.vue";
import UsersTop from "./../components/UsersTop.vue";
import UserProfile from "./../components/UserProfile.vue";
import TweetsList from "./../components/TweetsList.vue";
import UserRepliedList from "./../components/UserRepliedList.vue";
import UserLikesList from "./../components/UserLikesList.vue";

const dummyDataUser = {
  id: 1,
  account: "user3",
  name: "Glenna Kautzer DVM",
  email: "user3@example.com",
  introduction:
    "Minima eum distinctio debitis reiciendis.\nConsequatur ad inventore.\nVoluptas exercitationem laudantium molestias.\nSed dolorem necessitatibus et totam maiores.",
  avatar: "https://loremflickr.com/g/320/320/girl/?lock=1",
  cover: "https://loremflickr.com/800/600/dog",
  tweetNum: 10,
  likeNum: 0,
  followingNum: 37,
  followerNum: 100,
  lastLoginAt: "2021-07-08T04:20:22.000Z",
  isFollowing: true,
};

const tweetsSwitchTabs = [
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
  },
];

const dummyDataUserTweets = [
  {
    id: 71,
    description: "Libero mollitia commodi nesciunt non ad.",
    likeNum: 50,
    replyNum: 3,
    createdAt: "2021-07-08T04:20:23.000Z",
    Author: {
      id: 1,
      account: "user1",
      name: "Kendall Schinner",
      avatar: "https://loremflickr.com/g/320/320/girl/?lock=1",
    },
    isLike: false,
  },
  {
    id: 40,
    description: "Veniam asperiores id.",
    likeNum: 23,
    replyNum: 5,
    createdAt: "2021-07-05T04:20:23.000Z",
    Author: {
      id: 1,
      account: "user1",
      name: "Kendall Schinner",
      avatar: "https://loremflickr.com/g/320/320/girl/?lock=1",
    },
    isLike: false,
  },
  {
    id: 21,
    description: "Praesentium commodi eos eligendi sunt. Fugiat aliq",
    likeNum: 10,
    replyNum: 7,
    createdAt: "2021-07-03T04:20:23.000Z",
    Author: {
      id: 1,
      account: "user1",
      name: "Kendall Schinner",
      avatar: "https://loremflickr.com/g/320/320/girl/?lock=1",
    },
    isLike: false,
  },
];

const dummyDataUserReplied = [
  {
    id: 4,
    UserId: 1,
    TweetId: 11,
    comment:
      "eligendi,Aut nisi sit laudantium. Debitis deserunt exceptur,Sed reprehenderit rerum animi ipsa repudiandae nem Sed reprehenderit rerum animi ipsa repudiandae nem,Sed reprehenderit rerum animi ipsa repudiandae nem.",
    createdAt: "2021-07-09T12:03:58.000Z",
    RepliedTweet: {
      id: 11,
      description: "Eos quas ea corporis quasi animi. Aut repellendus ",
      likeNum: 65,
      replyNum: 20,
      createdAt: "2021-07-08T12:03:58.000Z",
      Author: {
        id: 30,
        name: "Fredy Haag",
        account: "user30",
        avatar: "https://loremflickr.com/g/320/320/girl/?lock=30",
      },
      isLike: false,
    },
  },
  {
    id: 8,
    UserId: 1,
    TweetId: 21,
    comment: "Sed reprehenderit rerum animi ipsa repudiandae nem",
    createdAt: "2021-07-03T12:03:58.000Z",
    RepliedTweet: {
      id: 21,
      description: "Illum laboriosam est aut non.\nDoloremque ducimus p",
      likeNum: 10,
      replyNum: 6,
      createdAt: "2021-06-15T12:03:58.000Z",
      Author: {
        id: 10,
        name: "Fredy Haag",
        account: "user10",
        avatar: "https://loremflickr.com/g/320/320/girl/?lock=10",
      },
      isLike: false,
    },
  },
];

const dummyDataUserlikes = [
  {
    id: 1,
    UserId: 1,
    TweetId: 3,
    createdAt: "2021-07-09T12:13:19.000Z",
    LikedTweet: {
      id: 3,
      description: "Aut nisi sit laudantium. Debitis deserunt exceptur",
      likeNum: 50,
      replyNum: 2,
      createdAt: "2021-07-08T04:20:23.000Z",
      Author: {
        id: 5,
        name: "Dr. Elouise Hessel",
        account: "user5",
        avatar: "https://loremflickr.com/g/320/320/girl/?lock=5",
      },
      isLike: true,
    },
  },
  {
    id: 2,
    UserId: 1,
    TweetId: 3,
    createdAt: "2021-07-09T12:13:19.000Z",
    LikedTweet: {
      id: 3,
      description: "Praesentium commodi eos eligendi sunt. Fugiat aliq,Praesentium commodi eos eligendi sunt. Fugiat aliq",
      likeNum: 24,
      replyNum: 31,
      createdAt: "2021-07-01T04:20:23.000Z",
      Author: {
        id: 2,
        name: "James Town",
        account: "user2",
        avatar: "https://loremflickr.com/g/320/320/girl/?lock=2",
      },
      isLike: false,
    },
  },
];

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
      user: {},
      tweets: [],
      replies: [],
      likes: [],
      currentTab: "tweets",
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      this.user = { ...dummyDataUser };
      this.tweetsSwitchTabs = [...tweetsSwitchTabs];
      this.tweets = [...dummyDataUserTweets];
      // this.replies = [...dummyDataUserReplied]
      // this.likes = [...dummyDataUserlikes]
    },
    switchTweetTab(currentTab) {
      switch (currentTab) {
        case "tweets":
          this.currentTab = currentTab;
          this.$router.push({
            name: "user",
            params: { id: this.user.id },
          });
          this.tweets = [...dummyDataUserTweets];
          console.log("tweets");
          break;
        case "replied_tweets":
          this.currentTab = currentTab;
          this.$router.push({
            name: "user-replied-tweets",
            params: { id: this.user.id },
          });
          this.replies = [...dummyDataUserReplied];
          console.log("replied");
          break;
        case "likes":
          this.currentTab = currentTab;
          this.$router.push({
            name: "user-likes-tweets",
            params: { id: this.user.id },
          });
          this.likes = [...dummyDataUserlikes];
          console.log("likes");
          break;
      }
    },
    handleAfterSubmit (formData) {
      // 透過 API 將表單資料送到伺服器
      for (let [name, value] of formData.entries()) {
        console.log(name + ': ' + value)
      }
      
    },
    afterSubmitTweet(payload) {
      const { description } = payload
      console.log('description',description)
      this.tweets.push({
        // id: commentId,
        description: description,
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