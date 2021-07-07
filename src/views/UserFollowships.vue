<template>
  <div class="container">
    <Sidebar />
    <section class="user-followships">
      <div class="user-wrap">
        <div class="headbar-wrap">
          <Headbar />
          <div class="user-followships-tab">
            <div class="user-followships-followers active">跟隨者</div>
            <div class="user-followships-followings">正在跟隨</div>
          </div>
        </div>
        <FollowList />
      </div>
    </section>
    <UsersTop />
  </div>
</template>

<script>
import Headbar from '../components/Headbar.vue'
import Sidebar from '../components/Sidebar.vue'
import UsersTop from '../components/UsersTop.vue'
import FollowList from '../components/FollowList.vue'

export default {
  components: {
    Headbar,
    Sidebar,
    UsersTop,
    FollowList
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
  .user-followships {
    position: relative;
    margin-top: 102px;
  }
  .user-wrap {
    overflow-y: scroll;
    max-height: calc( 100vh - 102px);
  }
  .headbar-wrap {
    position: absolute;
    top: -102px;
    left: 0;
    z-index: 10;
    width: 100%;
    border-width: 0 1px 0 1px;
    border-style: solid;
    border-color: #E6ECF0;
    background: #fff;
    background-color: #fff;
  }
  .headbar {
    position: relative;
    top: 0;
    border: none;
  }
  .user-followships-tab {
    display: flex;
    flex-wrap: wrap;
  }
  .user-followships-tab {
    border-bottom: 1px solid #E6ECF0;
  }
  .user-followships-tab > div {
    width: 130px;
    padding: 15px 0;
    font-size: 15px;
    text-align: center;
    cursor: pointer;
  }
  .user-followships-tab > div.active {
    border-bottom: 2px solid #FF6600;
  }
</style>