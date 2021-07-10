<template>
  <ul class="followships-list">
    <li v-for="user in users" :key="user.id" class="followships-item">
      <a class="followships-avatar avatar">
        <img :src="user.following.avatar" alt="" />
      </a>
      <div class="followships-content">
        <a class="followships-info" href="">
          <span class="name">{{ user.following.name }}</span>
          <span class="account">@{{ user.following.account }}</span>
        </a>
        <button
          v-if="user.following.isFollowing"
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
          {{ user.following.introduction }}
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
const dummyUsersTop = {
  Users: [
    {
      id: 5,
      followingId: 4,
      followerId: 3,
      following: {
        id: 4,
        account: "user4",
        name: "Jefferey Jacobi",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        introduction:
          "unde reiciendxxxxis asdfasdvacaszavadfvaedfv zdf zfvadfzavdzfv zsfv azdfv dz zsfdsint",
        likeNum: 0,
        tweetNum: 10,
        followingNum: 0,
        followerNum: 0,
        isFollowing: false,
      },
    },
    {
      id: 4,
      followingId: 2,
      followerId: 3,
      following: {
        id: 6,
        account: "user2",
        name: "Cesar Shanahan",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        introduction: "aut earum enim",
        likeNum: 0,
        tweetNum: 10,
        followingNum: 0,
        followerNum: 0,
        isFollowing: true,
      },
    },
    {
      id: 2,
      followingId: 2,
      followerId: 3,
      following: {
        id: 7,
        account: "user2",
        name: "Cesar Shanahan",
        avatar: "https://randomuser.me/api/portraits/women/58.jpg",
        introduction: "aut earum enim",
        likeNum: 0,
        tweetNum: 10,
        followingNum: 0,
        followerNum: 0,
        isFollowing: false,
      },
    },
    {
      id: 1,
      followingId: 2,
      followerId: 3,
      following: {
        id: 8,
        account: "user2",
        name: "Cesar Shanahan",
        avatar: "https://randomuser.me/api/portraits/women/8.jpg",
        introduction: "aut earum enim",
        likeNum: 0,
        tweetNum: 10,
        followingNum: 0,
        followerNum: 0,
        isFollowing: true,
      },
    },
    {
      id: 7,
      followingId: 2,
      followerId: 3,
      following: {
        id: 9,
        account: "user2",
        name: "Cesar Shanahan",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        introduction: "aut earum enim",
        likeNum: 0,
        tweetNum: 10,
        followingNum: 0,
        followerNum: 0,
        isFollowing: true,
      },
    },
  ],
};

export default {
  data() {
    return {
      users: [],
      // userFollowings: {},
      // userFollowing: false,
    };
  },
  created() {
    this.fetchusers();
  },
  methods: {
    fetchusers() {
      //原本的程式碼
      this.users = [...dummyUsersTop.Users];
      const {
        Users: [
          {
            following: { isFollowing },
          },
        ],
      } = dummyUsersTop;
      this.userFollowing = isFollowing;
    },

    toggleFollowing(user) {
      console.log('user.following.isFollowing',user.following.isFollowing)
      if (user.following.isFollowing) {
        user.following.isFollowing = false;
      } else {
        user.following.isFollowing = true;
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