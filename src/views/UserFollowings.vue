<template>
  <div class="container">
    <Sidebar />
    <section class="user-followships">
      <div class="user-wrap">
        <div class="headbar-wrap">
          <Headbar :initial-user="user" />
          <div class="user-followships-tab">
            <div class="user-followships-followers">
              <router-link
                class="nav-item"
                :to="{ name: 'user-followers', params: { id: user.id } }"
                >跟隨者</router-link
              >
            </div>
            <div class="user-followships-followings active">
              <router-link
                class="nav-item"
                :to="{ name: 'user-followings', params: { id: user.id } }"
                >正在跟隨</router-link
              >
            </div>
          </div>
        </div>
        <!-- <UserFollowingsCard :initial-user="user"/> -->
        
        <UserFollowingsCard
          v-for="followingUser in followingUsers"
          :key="followingUser.id"
          :initinalFollowingUser="followingUser"
        />
      </div>
    </section>
    <UsersTop />
  </div>
</template>

<script>
import Headbar from "../components/Headbar.vue";
import Sidebar from "../components/Sidebar.vue";
import UsersTop from "../components/UsersTop.vue";
import UserFollowingsCard from "../components/UserFollowingsCard.vue";
import usersAPI from "../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    Headbar,
    Sidebar,
    UsersTop,
    UserFollowingsCard,
  },
  data() {
    return {
      user: {
        id: -1,
        account: "",
        name: "",
        email: "",
        introduction: "",
        avatar: "",
        cover: "",
        tweetNum: -1,
        likeNum: -1,
        followingNum: -1,
        followerNum: -1,
        lastLoginAt: -1,
        isFollowing: false,
      },
      followingUsers: []
      
    };
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUser(userId)
    this.fetchFollowingusers(userId);
  },
    beforeRouteUpdate (to, from, next) {
    const { id: userId } = to.params
    this.fetchUser(userId)
    this.fetchFollowingusers(userId)
    next()
  },
  methods: {
    async fetchUser(userId) {
      try {
        const { data } = await usersAPI.getUser({ userId })
        const {
          id,
          account,
          name,
          email,
          introduction,
          avatar,
          cover,
          tweetNum,
          likeNum,
          followingNum,
          followerNum,
          lastLoginAt,
          isFollowing,
        } = data 

        this.user = {
          id,
          account,
          name,
          email,
          introduction,
          avatar,
          cover,
          tweetNum,
          likeNum,
          followingNum,
          followerNum,
          lastLoginAt,
          isFollowing,
        }

      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        });
      }
    },
    async fetchFollowingusers(userId) {
      try {
        const response = await usersAPI.getFollowings({ userId });
        this.followingUsers = { ...response.data };
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法取得正在跟隨清單，請稍後再試",
        });
      }
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
.user-followships {
  position: relative;
  margin-top: 102px;
}
.user-wrap {
  overflow-y: scroll;
  max-height: calc(100vh - 102px);
}
.headbar-wrap {
  position: absolute;
  top: -102px;
  left: 0;
  z-index: 10;
  width: 100%;
  border-width: 0 1px 0 1px;
  border-style: solid;
  border-color: #e6ecf0;
  background: #fff;
  background-color: #fff;
}
.headbar {
  position: relative;
  top: 0;
  border: none;
}
.user-followships-tab {
  display: flex;
  flex-wrap: wrap;
}
.user-followships-tab {
  border-bottom: 1px solid #e6ecf0;
}
.user-followships-tab > div {
  width: 130px;
  padding: 15px 0;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
}
.user-followships-tab > div.active {
  border-bottom: 2px solid #ff6600;
}
.nav-item:hover,
.nav-item.active {
  color: #ff6600;
}
</style>