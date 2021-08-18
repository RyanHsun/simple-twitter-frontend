<template>
  <div class="followships-list">
    <li class="followships-item">
      <router-link 
        class="followships-avatar avatar"
        :to="{ name: 'user', params: { id: followerUser.followerId } }"
      >
        <img :src="followerUser.follower.avatar | emptyImage" alt="" />
      </router-link>
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
      <div 
        class="full-link"
        @click.stop.prevent="linkToUserProfile(followerUser.followerId)"
      >
      </div>
    </li>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { emptyImageFilter } from "../utils/mixins"
import usersAPI from "../apis/users"
import { Toast } from "./../utils/helpers"

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
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async deleteFollowing(userId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.deleteFollowing({ userId })

        if (data.status !== "success") {
          throw new Error(data.message)
        }
        this.followerUser.follower.isFollowing = false

        Toast.fire({
          icon: "success",
          title: "取消跟隨",
        })
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: "error",
          title: "無法取消跟隨，請稍後再試",
        })
        console.log("error", error)
      }
    },
    async addFollowing() {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.addFollowing({ id: this.followerUser.followerId })

        if (data.status !== "success") {
          throw new Error(data.message)
        }
        this.followerUser.follower.isFollowing = true

        this.postTimeline(this.followerUser.followerId, 4, this.currentUser.id)

        Toast.fire({
          icon: "success",
          title: "跟隨成功",
        })
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: "error",
          title: "無法跟隨，請稍後再試",
        })
      }
    },
    linkToUserProfile (userId) {
      this.$router.push(`/users/${userId}`)
    },
    postTimeline(ReceiverId, type, PostId) {
      this.$socket.emit('post_timeline', { ReceiverId, type, PostId })
    }
  },
}
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
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 20px;
  border-bottom: 1px solid #e6ecf0;
}
.followships-avatar {
  position: relative;
  z-index: 1;
  pointer-events: none;
}
.followships-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  width: calc(100% - 60px);
  pointer-events: none;
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
.toggle-follow {
  pointer-events: visiblefill;
}
.is-following {
  color: #fff;
  background-color: #ff6600;
}

.full-link {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.full-link:hover {
  background-color: #f5f8fa;
  cursor: pointer;
  transition: .2s ease-in-out;
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