<template>
  <div class="followships-list">
    <li class="followships-item">
      <a class="followships-avatar avatar">
        <img :src="followingUser.following.avatar | emptyImage" alt="" />
      </a>
      <div class="followships-content">
        <router-link
          class="followships-info"
          :to="{ name: 'user', params: { id: followingUser.followingId } }"
        >
          <span class="name">{{ followingUser.following.name }}</span>
          <span class="account">@{{ followingUser.following.account }}</span>
        </router-link>
        <button
          v-if="followingUser.following.isFollowing"
          @click.stop.prevent="deleteFollowing(followingUser.followingId)"
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
          {{ followingUser.following.introduction }}
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
    initinalFollowingUser: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      followingUser: this.initinalFollowingUser,
      isProcessing: false
    };
  },
  methods: {
    async deleteFollowing(userId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.deleteFollowing({ userId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        
        this.followingUser.following.isFollowing = false
        
        Toast.fire({
          icon: "success",
          title: "取消跟隨",
        });
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: "error",
          title: "無法取消跟隨，請稍後再試",
        });
        console.log("error", error);
      }
    },
    async addFollowing() {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.addFollowing({ id: this.followingUser.followingId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.followingUser.following.isFollowing = true
        Toast.fire({
        icon: "success",
        title: "跟隨成功",
        });
        this.isProcessing = false

      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: "error",
          title: "無法跟隨，請稍後再試",
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
  align-items: flex-start;
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

@media (max-width: 576px) {
  .toggle-follow {
    font-size: 14px;
    padding: 5px 0;
    min-width: 80px;
  }
  .followships-info {
    width: 60%;
  }
}
</style>