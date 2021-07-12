<template>
  <ul class="tweets-list">
    <li
      v-for="tweet in tweets"
      :key="tweet.id"
      :to="{ name: 'tweet', params: { id: tweet.id } }"
      class="tweet"
    >
      <a href="" class="avatar">
        <img :src="tweet.Author.avatar" alt="" />
      </a>
      <div class="tweet-info">
        <div class="user-info">
          <a class="name" href="">{{ tweet.Author.name }}</a>
          <span class="account">@{{ tweet.Author.account }}</span>
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
  </ul>
</template>
<script>
import { fromNowFilter } from "./../utils/mixins";
import adminAPI from "../apis/admin";
import { Toast } from "./../utils/helpers";

export default {
  mixins: [fromNowFilter],
  data() {
    return {
      tweets: {},
    };
  },
  created() {
    this.fetchTweets();
  },
  methods: {
    async fetchTweets() {
      try {
        const response = await adminAPI.getAdminTweets();
        this.tweets = { ...response.data };
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法取得後台推文清單，請稍後再試",
        });
      }
    },
    async deleteTweet(id) {
      try {
        const { data } = await adminAPI.deleteAdminTweets({ id });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        console.log("handleDeleteButtonClick", id);

        Toast.fire({
          icon: "success",
          title: "移除推文成功",
        });
        //完成及時刪除的動作
        this.fetchTweets();
        // this.tweets = this.tweets.filter((tweet) => tweet.id !== id);
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法刪除後台推文清單，請稍後再試",
        });
      }
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
