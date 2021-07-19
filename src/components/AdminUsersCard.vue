<template>
  <ul class="admin-users-list">
    <li v-for="adminUser in adminUsers" :key="adminUser.id"
    class="admin-user">
      <div class="user-profile-head">
        <div class="user-cover">
          <img :src="adminUser.cover | emptyImage" alt="" />
        </div>
        <a class="user-avatar avatar">
          <img :src="adminUser.avatar | emptyImage" alt="" />
        </a>
      </div>
      <p href="" class="user-info">
        <span class="name">{{ adminUser.name }}</span>
        <span class="account">@{{ adminUser.account }}</span>
      </p>
      <div class="user-panel">
        <span class="comment">
          <img src="~@/assets/img/icon_comment.svg" alt="" />{{
            adminUser.tweetNum
          }}
        </span>
        <span class="likes">
          <img src="~@/assets/img/icon_like.svg" alt="" />{{
            adminUser.likeNum
          }}
        </span>
      </div>
      <div class="user-followships">
        <div class="user-following" >{{ adminUser.followingNum }} 個跟隨中</div>
        <div class="user-follower">{{ adminUser.followerNum }} 位跟隨者</div>
      </div>
    </li>
  </ul>
</template>
<script>
import adminAPI from "../apis/admin";
import { Toast } from "./../utils/helpers";
import { emptyImageFilter } from "../utils/mixins";

export default {
  mixins: [emptyImageFilter],
  data() {
    return {
      adminUsers: {},
    };
  },
  created() {
    const { limit = 100, offset = 0 } = this.$route.query
    this.fetchUsers({ queryLimit: limit, queryOffset: offset })
  },
  beforeRouteUpdate(to, from, next) {
    const { limit = '', offset = '' } = to.query;
    this.fetchUsers({ queryLimit: limit, queryOffset: offset });
    next();
  },
  methods: {
    async fetchUsers({queryLimit, queryOffset}) {
      try{
        const response = await adminAPI.getAdminUsers ({
          limit: queryLimit,
          offset: queryOffset,
        })
        this.adminUsers = {...response.data}
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法取得使用者清單，請稍後再試",
        })
      }
    },
  },
};
</script>

<style scoped>
.admin-users-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 10px;
}
.admin-user {
  min-width: 235px;
  width: 280px;
  margin: 0 10px 10px 0;
  padding-bottom: 10px;
  text-align: center;
  border-radius: 10px;
  background-color: #f6f7f8;
  overflow: hidden;
}
.admin-user > div {
  display: flex;
  justify-content: center;
}
.user-profile-head {
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.user-cover {
  width: 100%;
  margin-bottom: 10px;
}
.user-cover img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}
.user-avatar {
  width: 100px;
  height: 100px;
  margin: -86px auto 0;
}
.user-avatar img {
  border: 5px solid #fff;
}
.user-edit {
  margin-right: 20px;
}
.user-info {
  display: inline-block;
  padding: 0 20px;
  text-decoration: none;
}
.user-info span {
  display: block;
}
.name {
  font-size: 19px;
  height: 45px;
  margin-top: 15px;
  line-height: 21px;
}
.admin-user .user-panel {
  width: 100px;
  margin: auto;
  justify-content: space-around;
}
.user-panel img {
  width: 15px;
  height: 15px;
  margin-right: 6px;
}
.user-followships {
  padding: 10px 20px;
}
.user-followships {
  font-size: 14px;
}
.user-following {
  margin-right: 20px;
}
</style>
