<template>
  <div class="container">
    <Sidebar />
    <section class="user">
      <div class="user-wrap">
        <Headbar />
        <UserProfile />
        <TweetsList />
      </div>
    </section>
    <UsersTop />
  </div>
</template>

<script>
import Headbar from './../components/Headbar.vue'
import Sidebar from './../components/Sidebar.vue'
import UsersTop from './../components/UsersTop.vue'
import UserProfile from './../components/UserProfile.vue'
import TweetsList from './../components/TweetsList.vue'

export default {
  components: {
    Headbar,
    Sidebar,
    UsersTop,
    UserProfile,
    TweetsList
  }
}
</script>

<style scoped>
  .container {
    display: grid;
    grid-template-columns: 20% auto 30%;
    max-width: 1500px;
    margin: 0 auto;
    padding: 0 20px;
  }
  .user {
    position: relative;
    margin-top: 50px;
    border-width: 0 1px;
    border-style: solid;
    border-color: #E6ECF0;
    
  }
  .user-wrap {
    overflow-y: scroll;
    max-height: 100vh;
  }
</style>