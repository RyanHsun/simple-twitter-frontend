<template>
  <div class="followships-list">
    <li class="followships-item">
      <a class="followships-avatar avatar">
        <img :src="followerUser.follower.avatar | emptyImage" alt="" />
      </a>
      <div class="followships-content">
        <router-link
          class="followships-info"
          :to="{ name: 'user', params: { id: followerUser.followerId } }"
        >
          <span class="name">{{ followerUser.follower.name }}</span>
          <span class="account">@{{ followerUser.follower.account }}</span>
        </router-link>
        <button
          v-if="followerUser.follower.isFollowing"
          @click.stop.prevent="deleteFollowing(followerUser.followerId)"
          class="btn toggle-follow is-following"
          :disabled="isProcessing"
        >
          正在跟隨
        </button>
          <button
          v-else
          @click.stop.prevent="addFollowing"
          class="btn toggle-follow"
          :disabled="isProcessing"
        >
          跟隨
        </button>
        <div class="followships-intro">
          {{ followerUser.follower.introduction }}
        </div>
      </div>
    </li>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
import usersAPI from "../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  mixins: [emptyImageFilter],
  props: {
    initinalFollowerUser: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      followerUser: this.initinalFollowerUser,
      isProcessing: false
    };
  }, 
  methods: {
    async deleteFollowing(userId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.deleteFollowing({ userId });
        console.log('data',data.response)

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        
        this.followerUser.follower.isFollowing = false
        console.log('data',data.response)
        Toast.fire({
          icon: "success",
          title: "取消追蹤成功",
        });
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤，請稍後再試",
        });
        console.log("error", error);
      }
    },

    async addFollowing() {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.addFollowing({ id: this.followerUser.followerId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.followerUser.follower.isFollowing = true
        Toast.fire({
          icon: "success",
          title: "追蹤成功",
        });
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: "error",
          title: "無法追蹤，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped>
.followships-list {
  /* display: flex; */
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