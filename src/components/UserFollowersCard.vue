<template>
  <ul class="followships-list">
    <li v-for="user in users" :key="user.id" class="followships-item">
      <a class="followships-avatar avatar">
        <img :src="user.follower.avatar" alt="" />
      </a>
      <div class="followships-content">
        <a class="followships-info" href="">
          <span class="name">{{ user.follower.name }}</span>
          <span class="account">@{{ user.follower.account }}</span>
        </a>
        <button
          v-if="user.follower.isFollowing"
          @click.stop.prevent="toggleFollowing(user)"
          class="btn toggle-follow is-following"
        >
          正在跟隨
        </button>
        <button
          v-else
          @click.stop.prevent="toggleFollowing(user)"
          class="btn toggle-follow"
        >
          跟隨
        </button>
        <div class="followships-intro">
          {{ user.follower.introduction }}
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import usersAPI from "../apis/users";
import { Toast } from "./../utils/helpers";


export default {
  data() {
    return {
      users: [],
    }
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchusers(userId)
  },
  methods: {
    async fetchusers(userId) {
      try {
        const response = await usersAPI.getFollowers ({ userId })
        this.users = { ...response.data };
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法取得跟隨者清單，請稍後再試"
        })
      }
    },
    toggleFollowing(user) {
      console.log("原本的user.follower.isFollowing", user.follower.isFollowing)
      if (user.follower.isFollowing) {
        user.follower.isFollowing = false;
      } else {
        user.follower.isFollowing = true;
      }
    },
  },
};
</script>

<style scoped>
.followships-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  border-width: 0 1px;
  border-style: solid;
  border-color: #e6ecf0;
}
.followships-item {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 20px;
  border-bottom: 1px solid #e6ecf0;
}
.followships-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: calc(100% - 60px);
}
.followships-info {
  flex-grow: 1;
}
.followships-info span {
  display: block;
}
.followships-intro {
  width: 100%;
  margin-top: 10px;
}

.is-following {
  color: #fff;
  background-color: #ff6600;
}
</style>