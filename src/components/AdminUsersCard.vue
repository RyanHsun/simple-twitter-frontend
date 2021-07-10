<template>
  <ul class="admin-users-list">
    <li v-for="adminUser in adminUsers" :key="adminUser.id" :to="{ name:'user', params: { id: adminUser.id } }" class="admin-user">
      <div class="user-profile-head">
        <div class="user-cover">
          <img :src="adminUser.cover" alt="" />
        </div>
        <a class="user-avatar avatar">
          <img :src="adminUser.avatar" alt="" />
        </a>
      </div>
      <a href="" class="user-info">
        <span class="name">{{ adminUser.name }}</span>
        <span class="account">@{{ adminUser.account }}</span>
      </a>
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
        <div class="user-following">{{ adminUser.followingNum }} 個跟隨中</div>
        <div class="user-follower">{{ adminUser.followerNum }} 位跟隨者</div>
      </div>
    </li>
  </ul>
</template>
<script>
const dummyAdminUsers = {
  AdminUsers: [
    {
      id: 1,
      account: "user1",
      name: "User1",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
      cover: "https://loremflickr.com/320/240/restaurant,food/?random=35.43038308274238",
      isFollowing: true,
      tweetNum: 5,
      likeNum: 35,
      followingNum: 3,
      followerNum: 15,
      lastLoginAt: "2021-06-27 15:14:51",
    },
    {
      id: 2,
      account: "user2",
      name: "User2",
      avatar: "https://randomuser.me/api/portraits/men/81.jpg",
      cover: "https://loremflickr.com/320/240/restaurant,food/?random=35.43038308274238",
      isFollowing: false,
      tweetNum: 10,
      likeNum: 99,
      followingNum: 19,
      followerNum: 5,
      lastLoginAt: "2021-06-27 15:14:51",
    },
    {
      id: 3,
      account: "user3",
      name: "User3",
      avatar: "https://randomuser.me/api/portraits/men/81.jpg",
      cover: "https://loremflickr.com/320/240/restaurant,food/?random=35.43038308274238",
      isFollowing: false,
      tweetNum: 203,
      likeNum: 300,
      followingNum: 5,
      followerNum: 34,
      lastLoginAt: "2021-06-27 15:14:51",
    },
    {
      id: 4,
      account: "user4",
      name: "User4",
      avatar: "https://randomuser.me/api/portraits/women/15.jpg",
      cover: "https://loremflickr.com/320/240/restaurant,food/?random=35.43038308274238",
      isFollowing: false,
      tweetNum: 2,
      likeNum: 45,
      followingNum: 78,
      followerNum: 19,
      lastLoginAt: "2021-06-27 15:14:51",
    },
    {
      id: 5,
      account: "user5",
      name: "User5",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      cover: "https://loremflickr.com/320/240/restaurant,food/?random=35.43038308274238",
      isFollowing: false,
      tweetNum: 29,
      likeNum: 109,
      followingNum: 333,
      followerNum: 235,
      lastLoginAt: "2021-06-27 15:14:51",
    },
    {
      id: 6,
      account: "user6",
      name: "User6",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg",
      cover: "https://loremflickr.com/320/240/restaurant,food/?random=35.43038308274238",
      isFollowing: false,
      tweetNum: 33,
      likeNum: 29,
      followingNum: 11,
      followerNum: 11,
      lastLoginAt: "2021-06-27 15:14:51",
    },
    {
      id: 7,
      account: "user7",
      name: "User7",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      cover: "https://loremflickr.com/320/240/restaurant,food/?random=35.43038308274238",
      isFollowing: false,
      tweetNum: 1,
      likeNum: 0,
      followingNum: 100,
      followerNum: 109,
      lastLoginAt: "2021-06-27 15:14:51",
    },
  ],
};

export default {
  data() {
    return {
      adminUsers: [],
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      this.adminUsers = [...dummyAdminUsers.AdminUsers];
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
  max-width: 235px;
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
}
.user-info span {
  display: block;
}
.name {
  font-size: 19px;
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
