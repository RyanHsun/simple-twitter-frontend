<template>
  <ul class="followships-list">
    <li v-for="user in users" :key="user.id" class="followships-item">
      <a class="followships-avatar avatar">
        <img :src="user.avatar" alt="" />
      </a>
      <div class="followships-content">
        <a class="followships-info" href="">
          <span class="name">{{ user.name }}</span>
          <span class="account">@{{ user.account }}</span>
        </a>
        <button
          v-if="user.isFollowing"
          @click.stop.prevent="deleteFollowing(user.id)"
          class="btn toggle-follow is-following"
        >
          正在跟隨
        </button>
        <button
          v-else
          @click.stop.prevent="addFollowing(user.id)"
          class="btn toggle-follow"
        >
          跟隨
        </button>
        <div class="followships-intro">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit.
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
const dummyUsersTop = {
  Users: [
    {
      id: 3,
      account: "user2",
      name: "User2",
      avatar: "https://randomuser.me/api/portraits/men/88.jpg",
      isFollowing: true,
    },
    {
      id: 2,
      account: "user1",
      name: "User1",
      avatar: "https://randomuser.me/api/portraits/men/78.jpg",
      isFollowing: false,
    },
    {
      id: 1,
      account: "user2",
      name: "User2",
      avatar: "https://randomuser.me/api/portraits/men/58.jpg",
      isFollowing: true,
    },
    {
      id: 4,
      account: "user1",
      name: "User1",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
      isFollowing: false,
    },
    {
      id: 5,
      account: "user2",
      name: "User2",
      avatar: "https://randomuser.me/api/portraits/men/68.jpg",
      isFollowing: true,
    },
    {
      id: 6,
      account: "user1",
      name: "User1",
      avatar: "https://randomuser.me/api/portraits/men/98.jpg",
      isFollowing: false,
    },
  ],
};

export default {
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchusers();
  },
  methods: {
    fetchusers() {
      this.users = [...dummyUsersTop.Users];
    },
    addFollowing(userId) {
      this.users = this.users.map((user) => {
        if (user.id !== userId) {
          return user;
        } else {
          return {
            ...user,
            isFollowing: true,
          };
        }
      });
    },
    deleteFollowing(userId) {
      this.users = this.users.map((user) => {
        if (user.id !== userId) {
          return user;
        } else {
          return {
            ...user,
            isFollowing: false,
          };
        }
      });
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