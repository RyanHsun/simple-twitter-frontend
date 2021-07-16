<template>
  <section class="sidebar">
    <div class="top">
      <h1 class="logo">
        <a href="#">
          <img src="~@/assets/img/logo.svg" alt="">
        </a>
      </h1>
      <nav class="navigation">
        <router-link class="nav-item" to="/admin/tweets">
          <div class="icon index">
            <img src="~@/assets/img/icon_index.svg" alt="">
          </div>
          <div>推文清單</div>
        </router-link>
        <router-link class="nav-item" to="/admin/users">
          <div class="icon user">
            <img src="~@/assets/img/icon_user.svg" alt="">
          </div>
          <div>使用者列表</div>
        </router-link>
      </nav>
    </div>
    <div class="bottom">
      <router-link class="logout" to="/admin/login">
        <div class="icon">
          <img src="~@/assets/img/icon_logout.svg" alt="">
        </div>
        <div @click="logout">登出</div>
      </router-link>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex"

export default {
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  methods: {
    logout () {
      this.$store.commit('revokeAuthentication')
      this.$router.push('/login')
    },
  }
}
</script>

<style scoped>
  .sidebar {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
  .sidebar > div {
    width: 100%;
    text-align: left;
  }
  .logo {
    margin-bottom: 40px;
  }
  .nav-item,
  .logout {
    text-decoration: none;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }
  .nav-item:hover,
  .logout:hover,
  .nav-item.active {
    color: #FF6600;
  }
  .nav-item.active .icon img,
  .nav-item:hover .icon {
    filter: invert(73%) sepia(100%) saturate(48) hue-rotate(364deg);
  }
  .icon {
    width: 30px;
    margin-right: 10px;
  }
  .new-tweet {
    width: 80%;
    color: #fff;
    background: #FF6600;
  }
</style>