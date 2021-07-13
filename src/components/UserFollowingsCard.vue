<template>
  <ul class="followships-list">
    <li v-for="user in users" :key="user.id" class="followships-item">
      <a class="followships-avatar avatar">
        <img :src="user.following.avatar" alt="" />
      </a>
      <div class="followships-content">
        <router-link
          class="followships-info"
          :to="{ name: 'user', params: { id: user.followingId } }"
        >
          <span class="name">{{ user.following.name }}</span>
          <span class="account">@{{ user.following.account }}</span>
        </router-link>
        <button
          v-if="user.following.isFollowing"
          @click.stop.prevent="deleteFollowing(user.followingId)"
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
          {{ user.following.introduction }}
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import usersAPI from "../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  props: {
    initialUser: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      users: [],
      user: this.initialUser,
    };
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchusers(userId);
  },

  methods: {
    async fetchusers(userId) {
      try {
        const response = await usersAPI.getFollowings({ userId });
        this.users = { ...response.data };
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法取得正在跟隨清單，請稍後再試",
        });
      }
    },

    async deleteFollowing(userId) {
      try {
        const { data } = await usersAPI.deleteFollowing({ userId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        Toast.fire({
          icon: "success",
          title: "取消追蹤成功，請重新整理",
        });
        // 需要用一個方法，不用重新整理就可以更新清單

        // this.fetchusers(userId)


      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤，請稍後再試",
        });
        console.log("error", error);
      }
    },

    // toggleFollowing(user) {
    //   console.log("原本的user.following.isFollowing", user.following.isFollowing);
    //   if (user.following.isFollowing) {
    //     user.following.isFollowing = false;
    //   } else {
    //     user.following.isFollowing = true;
    //   }
    // },
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
  text-decoration: none;
  flex-grow: 1;
}
.followships-info span {
  display: block;
}
.followships-intro {
  width: 100%;
  margin-top: 10px;
}
.name:hover {
  color: #ff6600;
}
.is-following {
  color: #fff;
  background-color: #ff6600;
}
</style>