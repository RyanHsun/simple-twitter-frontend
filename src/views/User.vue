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

// const dummyData = {
//   "id": 3,
//   "account": "user3",
//   "name": "Glenna Kautzer DVM",
//   "email": "user3@example.com",
//   "introduction": "Minima eum distinctio debitis reiciendis.\nConsequatur ad inventore.\nVoluptas exercitationem laudantium molestias.\nSed dolorem necessitatibus et totam maiores.",
//   "avatar": "https://loremflickr.com/g/320/240/girl/all",
//   "cover": "https://loremflickr.com/800/600/dog",
//   "tweetNum": 10,
//   "likeNum": 0,
//   "followingNum": 0,
//   "followerNum": 0,
//   "lastLoginAt": "2021-07-08T04:20:22.000Z",
//   "isFollowing": true
// }

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
  }
  .user-wrap {
    overflow-y: scroll;
    max-height: 100vh;
  }
</style>