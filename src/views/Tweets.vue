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
        <form class="create-tweet" action="">
          <div class="create-tweet-wrap">
            <span class="avatar" href="">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt=""
              />
            </span>
            <textarea
              v-model="newTweet"
              class="tweet-textarea"
              name=""
              id=""
              cols="30"
              rows="2"
              maxlength="140"
              placeholder="有什麼新鮮事？"
            ></textarea>
          </div>
          <button class="btn tweet-button" @click.stop.prevent="addTweet">
            推文
          </button>
        </form>

        <TweetsList :tweets="tweets" />
      </div>
    </section>
    <UsersTop />
  </div>
</template>

<script>
import Sidebar from "./../components/Sidebar.vue";
import UsersTop from "./../components/UsersTop.vue";
import TweetsList from "./../components/TweetsList.vue";
import { v4 as uuidv4 } from "uuid";

const dummyDataUser = {
  id: 1,
  account: "user3",
  name: "Glenna Kautzer DVM",
  email: "user3@example.com",
  introduction:
    "Minima eum distinctio debitis reiciendis.\nConsequatur ad inventore.\nVoluptas exercitationem laudantium molestias.\nSed dolorem necessitatibus et totam maiores.",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  cover: "https://loremflickr.com/800/600/dog",
  tweetNum: 10,
  likeNum: 0,
  followingNum: 37,
  followerNum: 100,
  lastLoginAt: "2021-07-08T04:20:22.000Z",
  isFollowing: true,
};
const dummyData = [
  {
    id: 13,
    isLike: false,
    description: "Pariatur neque exercitationem dignissimos odio har",
    likeNum: 0,
    replyNum: 3,
    createdAt: "2021-07-09T05:42:52.000Z",
    Author: {
      id: 3,
      account: "user3",
      name: "Rico Muller",
      avatar: "https://loremflickr.com/g/320/320/girl/?lock=3",
    },
  },
  {
    id: 31,
    isLike: false,
    description: "Sed odio velit magni facilis aspernatur pariatur e",
    likeNum: 0,
    replyNum: 3,
    createdAt: "2021-07-06T05:42:52.000Z",
    Author: {
      id: 5,
      account: "user1",
      name: "Mustafa Kunde",
      avatar: "https://loremflickr.com/g/320/320/girl/?lock=5",
    },
  },
  {
    id: 34,
    isLike: false,
    description: "Sed odio velit magni facilis aspernatur pariatur e",
    likeNum: 0,
    replyNum: 3,
    createdAt: "2021-07-04T05:42:52.000Z",
    Author: {
      id: 4,
      account: "user1",
      name: "Mustafa Kunde",
      avatar: "https://loremflickr.com/g/320/320/girl/?lock=34",
    },
  },
  {
    id: 2,
    isLike: false,
    description: "Sed odio velit magni facilis aspernatur pariatur e",
    likeNum: 0,
    replyNum: 3,
    createdAt: "2021-07-03T05:42:52.000Z",
    Author: {
      id: 1,
      account: "user1",
      name: "Mustafa Kunde",
      avatar: "https://loremflickr.com/g/320/320/girl/?lock=1",
    },
  },
  {
    id: 7,
    isLike: false,
    description: "Sed odio velit magni facilis aspernatur pariatur e",
    likeNum: 0,
    replyNum: 3,
    createdAt: "2021-07-01T05:42:52.000Z",
    Author: {
      id: 2,
      account: "user1",
      name: "Mustafa Kunde",
      avatar: "https://loremflickr.com/g/320/320/girl/?lock=2",
    },
  },
  {
    id: 9,
    isLike: false,
    description: "Sed odio velit magni facilis aspernatur pariatur e",
    likeNum: 0,
    replyNum: 3,
    createdAt: "2021-06-21T05:42:52.000Z",
    Author: {
      id: 4,
      account: "user1",
      name: "Mustafa Kunde",
      avatar: "https://loremflickr.com/g/320/320/girl/?lock=4",
    },
  },
];

export default {
  name: "tweets",
  components: {
    Sidebar,
    TweetsList,
    UsersTop,
  },
  data() {
    return {
      // user:[],
      tweets: [],
      newTweet: "",
      user: {},
    };
  },
  created() {
    this.fetchTweets();
  },
  methods: {
    fetchTweets() {
      this.tweets = [...dummyData];
      this.user = { ...dummyDataUser };
      // this.user = { ...dummyDataUser };
    },
    addTweet() {
      this.tweets.push({
        // TODO: 透過 API 向後端伺服器新增tweet
        //  id: uuid(),
        description: this.newTweet,
      });
      this.newTweet = "";
    },
    afterSubmitTweet(payload) {
      const { description } = payload;
      console.log("description", description);
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
      });
    },
  },
};
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