<template>
  <div class="container">
    <AdminSidebar />
    <section class="admin-tweets">
      <h2 class="headbar">
        <div class="main-title">推文清單</div>
      </h2>
      <div class="admin-tweets-wrap">
        <AdminTweetsList />
      </div>
    </section>
  </div>
</template>

<script>
import AdminSidebar from './../components/AdminSidebar.vue'
import AdminTweetsList from './../components/AdminTweetsList.vue'

export default {
  components: {
    AdminSidebar,
    AdminTweetsList
  }
}
</script>

<style scoped>
  .container {
    display: grid;
    grid-template-columns: 20% auto;
    max-width: 1500px;
    margin: 0 auto;
    padding: 0 0 0 20px;
  }
  .admin-tweets {
    position: relative;
    margin-top: 50px;
    border-width: 0 1px;
    border-style: solid;
    border-color: #E6ECF0;
  }
  .admin-tweets-wrap {
    overflow-y: scroll;
    max-height: calc( 100vh - 50px );
  }
  .headbar {
  position: absolute;
  top: -50px;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 15px 20px;
  font-size: 18px;
  text-align: left;
  border-width: 0 1px 1px 1px;
  border-style: solid;
  border-color: #E6ECF0;
  background: #fff;
  transform: scale(1.002);
}
@media (max-width: 576px) {
  .container {
    grid-template-columns: 13% auto;
  }
}
</style>