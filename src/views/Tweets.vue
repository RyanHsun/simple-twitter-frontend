<template>
  <div class="container">
    <Sidebar />
    <section class="tweets">
      <div class="tweets-wrap">
        <h2 class="title">首頁</h2>
        <form class="create-tweet" action="">
          <div class="create-tweet-wrap">
            <span class="avatar" href="">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="">
            </span>
            <input class="tweet-input" type="text" placeholder="有什麼新鮮事？">
          </div>
          <button class="btn tweet-button">推文</button>
        </form>
        <TweetsList />
      </div>
    </section>
    <UsersTop />
  </div>
</template>

<script>
import Sidebar from './../components/Sidebar.vue'
import UsersTop from './../components/UsersTop.vue'
import TweetsList from './../components/TweetsList.vue'

export default {
  components: {
    Sidebar,
    TweetsList,
    UsersTop
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
  .tweets {
    position: relative;
    margin-top: 62px;
    border-width: 0 1px;
    border-style: solid;
    border-color: #E6ECF0;
    
  }
  .tweets-wrap {
    overflow-y: scroll;
    max-height: calc( 100vh - 62px );
  }
  .title {
    position: absolute;
    top: -62px;
    left: 0;
    z-index: 10;
    width: 100%;
    margin: 0;
    padding: 20px;
    font-size: 18px;
    text-align: left;
    border-width: 0 1px 1px 1px;
    border-style: solid;
    border-color: #E6ECF0;
    background: #fff;
  }
  .create-tweet {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    border-bottom: 10px solid #E6ECF0;
  }
  .create-tweet-wrap {
    width: 100%;
    text-align: left;
  }
  .tweet-input {
    font-size: 18px;
    color: #9197A3;
    border: none;
    outline: none;
    width: calc( 100% - 60px);
  }
  .avatar {
    display: inline-block;
  }
  .tweet-button {
    align-self: flex-end;
    color: #fff;
    background-color: #FF6600;
  }
  
</style>