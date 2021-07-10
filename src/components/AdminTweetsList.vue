<template>
  <ul class="tweets-list">
    <li v-for="tweet in tweets" :key="tweet.id" :to="{ name:'tweet', params: { id: tweet.id } }" class="tweet">
      <a href="" class="avatar">
        <img :src="tweet.User.avatar" alt="" />
      </a>
      <div class="tweet-info">
        <div class="user-info">
          <a class="name" href="">{{ tweet.User.name }}</a>
          <span class="account">@{{ tweet.User.account }}</span>
          <span class="tweet-update-at">・{{ tweet.createdAt | fromNow }}</span>
        </div>
        <div class="tweet-content">
          {{ tweet.description }}
        </div>
      </div>
      <button
        @click.stop.prevent="deleteTweet(tweet.id)"
        class="delete-tweet"
        type="button"
      >
        <img src="~@/assets/img/icon_close.svg" alt="" />
      </button>
    </li>
    <!-- <li class="tweet">
      <a href="" class="avatar">
        <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="" />
      </a>
      <div class="tweet-info">
        <div class="user-info">
          <a class="name" href="">user1</a>
          <span class="account">@user1</span>
          <span class="tweet-update-at">・3小時</span>
        </div>
        <div class="tweet-content">
          Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
          cillum dolor. Voluptate exercitation incididunt aliquip deserunt
          reprehenderit elit laborum.
        </div>
      </div>
      <button class="delete-tweet" type="button">
        <img src="~@/assets/img/icon_close.svg" alt="" />
      </button>
    </li>
    <li class="tweet">
      <a href="" class="avatar">
        <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="" />
      </a>
      <div class="tweet-info">
        <div class="user-info">
          <a class="name" href="">user1</a>
          <span class="account">@user1</span>
          <span class="tweet-update-at">・3小時</span>
        </div>
        <div class="tweet-content">
          Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
          cillum dolor. Voluptate exercitation incididunt aliquip deserunt
          reprehenderit elit laborum.
        </div>
      </div>
      <button class="delete-tweet" type="button">
        <img src="~@/assets/img/icon_close.svg" alt="" />
      </button>
    </li>
    <li class="tweet">
      <a href="" class="avatar">
        <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="" />
      </a>
      <div class="tweet-info">
        <div class="user-info">
          <a class="name" href="">user1</a>
          <span class="account">@user1</span>
          <span class="tweet-update-at">・3小時</span>
        </div>
        <div class="tweet-content">
          Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
          cillum dolor. Voluptate exercitation incididunt aliquip deserunt
          reprehenderit elit laborum.
        </div>
      </div>
      <button class="delete-tweet" type="button">
        <img src="~@/assets/img/icon_close.svg" alt="" />
      </button>
    </li>
    <li class="tweet">
      <a href="" class="avatar">
        <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="" />
      </a>
      <div class="tweet-info">
        <div class="user-info">
          <a class="name" href="">user1</a>
          <span class="account">@user1</span>
          <span class="tweet-update-at">・3小時</span>
        </div>
        <div class="tweet-content">
          Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
          cillum dolor. Voluptate exercitation incididunt aliquip deserunt
          reprehenderit elit laborum.
        </div>
      </div>
      <button class="delete-tweet" type="button">
        <img src="~@/assets/img/icon_close.svg" alt="" />
      </button>
    </li>
    <li class="tweet">
      <a href="" class="avatar">
        <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="" />
      </a>
      <div class="tweet-info">
        <div class="user-info">
          <a class="name" href="">user1</a>
          <span class="account">@user1</span>
          <span class="tweet-update-at">・3小時</span>
        </div>
        <div class="tweet-content">
          Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
          cillum dolor. Voluptate exercitation incididunt aliquip deserunt
          reprehenderit elit laborum.
        </div>
      </div>
      <button class="delete-tweet" type="button">
        <img src="~@/assets/img/icon_close.svg" alt="" />
      </button>
    </li>
    <li class="tweet">
      <a href="" class="avatar">
        <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="" />
      </a>
      <div class="tweet-info">
        <div class="user-info">
          <a class="name" href="">user1</a>
          <span class="account">@user1</span>
          <span class="tweet-update-at">・3小時</span>
        </div>
        <div class="tweet-content">
          Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
          cillum dolor. Voluptate exercitation incididunt aliquip deserunt
          reprehenderit elit laborum.
        </div>
      </div>
      <button class="delete-tweet" type="button">
        <img src="~@/assets/img/icon_close.svg" alt="" />
      </button>
    </li>
    <li class="tweet">
      <a href="" class="avatar">
        <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="" />
      </a>
      <div class="tweet-info">
        <div class="user-info">
          <a class="name" href="">user1</a>
          <span class="account">@user1</span>
          <span class="tweet-update-at">・3小時</span>
        </div>
        <div class="tweet-content">
          Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
          cillum dolor. Voluptate exercitation incididunt aliquip deserunt
          reprehenderit elit laborum.
        </div>
      </div>
      <button class="delete-tweet" type="button">
        <img src="~@/assets/img/icon_close.svg" alt="" />
      </button>
    </li>
    <li class="tweet">
      <a href="" class="avatar">
        <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="" />
      </a>
      <div class="tweet-info">
        <div class="user-info">
          <a class="name" href="">user1</a>
          <span class="account">@user1</span>
          <span class="tweet-update-at">・3小時</span>
        </div>
        <div class="tweet-content">
          Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
          cillum dolor. Voluptate exercitation incididunt aliquip deserunt
          reprehenderit elit laborum.
        </div>
      </div>
      <button class="delete-tweet" type="button">
        <img src="~@/assets/img/icon_close.svg" alt="" />
      </button>
    </li> -->
  </ul>
</template>
<script>
import { fromNowFilter } from "./../utils/mixins";

const dummyAdminTweersList = {
  Tweets: [
    {
      id: 1,
      description: "adslfuqafjds;ljilv;cvzldks;jareioj",
      isLike: true,
      likeNum: 10,
      replyNum: 2,
      createdAt: "2021-06-27 15:47:52",
      User: {
        id: 1,
        account: "user1",
        name: "User1",
        avatar: "https://randomuser.me/api/portraits/men/88.jpg",
      },
    },
    {
      id: 2,
      description: "iqulhafdsnkjlfjqoiwejfdlsa;knlsdf",
      isLike: false,
      likeNum: 13,
      replyNum: 5,
      createdAt: "2021-06-27 15:47:52",
      User: {
        id: 1,
        account: "user1",
        name: "User1",
        avatar: "https://randomuser.me/api/portraits/men/68.jpg",
      },
    },
    {
      id: 3,
      description: "iqulhafdsnkjlfjqoiwejfdlsa;knlsdf",
      isLike: false,
      likeNum: 13,
      replyNum: 5,
      createdAt: "2021-06-27 15:47:52",
      User: {
        id: 1,
        account: "user1",
        name: "User1",
        avatar: "https://randomuser.me/api/portraits/men/78.jpg",
      },
    },
    {
      id: 4,
      description: "iqulhafdsnkjlfjqoiwejfdlsa;knlsdf",
      isLike: false,
      likeNum: 13,
      replyNum: 5,
      createdAt: "2021-06-27 15:47:52",
      User: {
        id: 1,
        account: "user1",
        name: "User1",
        avatar: "https://randomuser.me/api/portraits/men/89.jpg",
      },
    },
  ],
};
export default {
  mixins: [fromNowFilter],
  data() {
    return {
      tweets: [],
    };
  },
  created() {
    this.fetchTweets();
  },
  methods: {
    fetchTweets() {
      this.tweets = [...dummyAdminTweersList.Tweets];
    },
    deleteTweet(tweetId) {
      this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId);
    },
  },
};
</script>

<style scoped>
.tweet {
  border-bottom: 1px solid #e6ecf0;
  display: flex;
  align-items: flex-start;
  padding: 10px 15px;
  width: 100%;
}
.tweet-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: calc(100% - 60px);
  text-align: left;
}
.name {
  margin-right: 10px;
  font-weight: bold;
}
.tweet-content {
  margin: 10px 0;
}
.tweet-panel span {
  padding-right: 40px;
}
.tweet-panel img {
  margin-right: 20px;
}
.delete-tweet {
  margin-top: 5px;
  border: none;
  background: none;
}
</style>
