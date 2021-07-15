<template>
  <section class="users-top">
    <div class="wrap">
      <h2 class="title">跟隨誰</h2>
      <ul class="users">
        <Spinner v-if="isLoading"/>
        <li v-else v-for="user in users" :key="user.id" class="user">
          <router-link
            class="avatar"
            :to="{ name: 'user', params: { id: user.id } }"
          >
            <img :src="user.avatar | emptyImage" alt="" />
          </router-link>
          <router-link
            class="info"
            :to="{ name: 'user', params: { id: user.id } }"
          >
            <span class="name">{{ user.name }}</span>
            <span class="account">@{{ user.account }}</span>
          </router-link>
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
import { mapState } from 'vuex'
import { emptyImageFilter } from "../utils/mixins"
import Spinner from './../components/Spinner'
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'

export default {
  mixins: [emptyImageFilter],
  components: {
    Spinner
  },
  data() {
    return {
      users: [],
      isLoading: true,
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    this.fetchTopUsers()
  },
  methods: {
    async fetchTopUsers() {
      try {
        const { data } = await usersAPI.getTopUsers()

        this.users = [...data]

        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.isLoading = false

      } catch (error) {
        
        this.isLoading = false

        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法更新個人資料，請稍後再試'
        })
      }
    },
    async addFollowing (userId) {
      try {
        const { data } = await usersAPI.addFollowing({ id: userId })

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.users = this.users.map((user) => {
          if (user.id !== userId) {
            return user
          } else {
            return {
              ...user,
              isFollowing: true,
            }
          }
        })

        // 做傳送到User
        this.$emit('after-add-follow')

        Toast.fire({
          icon: 'success',
          title: '追隨成功'
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法新增追隨，請稍後再試',
        })
      }
    },
    async deleteFollowing (userId) {
      console.log(userId)
      try {
        const { data } = await usersAPI.deleteFollowing({ userId })
        
        if(data.status === 'error') {
          throw new Error(data.message)
        }

        this.users = this.users.map((user) => {
          if (user.id !== userId) {
            return user
          } else {
            return {
              ...user,
              isFollowing: false,
            }
          }
        })
        this.$emit('after-delete-follow')
        Toast.fire({
          icon: 'success',
          title: '取消追隨'
        })
      } catch (error) {
        console.error(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法取消跟隨，請稍後再試'
        })
      }
    }
  }
}
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
.info:hover {
  text-decoration: none;
}
.name:hover {
  color: #ff6600;
}
</style>