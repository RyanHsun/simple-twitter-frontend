<template>
  <section class="users-top">
    <div class="wrap">
      <h2 class="title">跟隨誰</h2>
      <ul class="users">
        <li v-for="user in users" :key="user.id" class="user">
          <router-link class="avatar" :to="{ name: 'user', params: { id: user.id } }">
            <img :src="user.avatar" alt="" />
          </router-link>
          <a class="info" href="">
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
        </li>
      </ul>
      <a class="show-more-user" href="#">顯示更多</a>
    </div>
  </section>
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
      this.users = [...dummyUsersTop.Users]
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
.users-top {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 10px 20px;
  text-align: left;
}
.wrap {
  width: 100%;
  border-radius: 14px;
  background-color: #f5f8fa;
}
.title {
  padding: 20px;
  font-size: 20px;
  text-align: left;
  border-bottom: 1px solid #e6ecf0;
}
.user {
  width: 100%;
  padding: 10px 20px;
  border-bottom: 1px solid #e6ecf0;
}
.is-following {
  color: #fff;
  background-color: #ff6600;
}
.show-more-user {
  display: block;
  padding: 20px;
  color: #ff6600;
}
</style>