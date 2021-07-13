<template>
  <ul class="followships-list">
    <li v-for="user in users" :key="user.id" class="followships-item">
      <a class="followships-avatar avatar">
        <img :src="user.follower.avatar" alt="" />
      </a>
      <div class="followships-content">
        <router-link
          class="followships-info"
          :to="{ name: 'user', params: { id: user.followingId } }"
        >
          <span class="name">{{ user.follower.name }}</span>
          <span class="account">@{{ user.follower.account }}</span>
        </router-link>
        <button
          v-if="user.follower.isFollowing"
          @click.stop.prevent="deleteFollowing(user.followerId)"
          class="btn toggle-follow is-following"
        >
          正在跟隨
        </button>
        <button
          v-else
          @click.stop.prevent="addFollowing(user.followerId)"
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
  props: {
    initialUser: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      users: [],
      pageUser: {...this.initialUser},
    };
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchusers(userId);
  },
  watch: {
    //監控父層傳過來的資料是否更新，如有更新，以新資料為準
    initialUser (newValue) {
      this.pageUser = {
        ...this.pageUser,
        ...newValue
      }
    }
  },  
  methods: {
    async fetchusers(userId) {
      try {
        const response = await usersAPI.getFollowers({ userId });
        this.users = { ...response.data };
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法取得跟隨者清單，請稍後再試",
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

    async addFollowing(userId) {
      try {
        const { data } = await usersAPI.addFollowing({ id: userId});
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.users.follower.isFollowed = true

      } catch (error) {
        // console.log('error', error)
        Toast.fire({
          icon: "error",
          title: "無法追蹤，請稍後再試",
        });
        console.log("error", error);
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
  text-decoration: none;
}
.followships-info span {
  display: block;
}
.name:hover {
  color: #ff6600;
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