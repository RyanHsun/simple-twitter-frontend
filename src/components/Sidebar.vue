<template>
  <section class="sidebar">
    <div class="top">
      <h1 class="logo">
        <a href="#">
          <img src="~@/assets/img/logo.svg" alt="" />
        </a>
      </h1>
      <nav class="navigation">
        <router-link class="nav-item" to="/">
          <div class="icon index">
            <img src="~@/assets/img/icon_index.svg" alt="" />
          </div>
          <div>首頁</div>
        </router-link>
        <router-link class="nav-item" to="/users/:id">
          <div class="icon user">
            <img src="~@/assets/img/icon_user.svg" alt="" />
          </div>
          <div>個人資料</div>
        </router-link>
        <router-link class="nav-item" to="/users/:id/setting">
          <div class="icon cog">
            <img src="~@/assets/img/icon_cog.svg" alt="" />
          </div>
          <div>設定</div>
        </router-link>
      </nav>
      <button
        type="button"
        class="btn new-tweet"
        data-toggle="modal"
        data-target="#newTweetModal"
        @click="showModal"
      >
        推文
      </button>
      <!-- Button trigger modal -->
      <div
        v-if="isShowModal"
        class="modal fade"
        id="newTweetModal"
        tabindex="-1"
        aria-labelledby="newTweetModalLabel"
        aria-hidden="true"
      >
        <NewTweetModal @after-submit-tweet="afterSubmitTweet"/>
      </div>
    </div>
    <div class="bottom">
      <router-link class="logout" to="/login">
        <div class="icon">
          <img src="~@/assets/img/icon_logout.svg" alt="" />
        </div>
        <div>登出</div>
      </router-link>
    </div>
  </section>
</template>

<script>
import NewTweetModal from "./../components/NewTweetModal.vue";

export default {
  components: {
    NewTweetModal,
  },
  data() {
    return {
      isShowModal: false,
    };
  },
  methods: {
    showModal() {
      this.isShowModal = true
    },
    cancelModal() {
      this.isShowModal = false
    },
    afterSubmitTweet(payload) {
      // this.$emit('after-submit-tweet',this.newTweet)
      console.log('payload',payload)

      this.$emit('tweet-from-sidebar',payload)
      this.newTweet = ""
    },
  },
};
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
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
.nav-item:hover,
.logout:hover,
.nav-item.active {
  color: #ff6600;
}
.icon {
  margin-right: 20px;
}
.new-tweet {
  width: 80%;
  color: #fff;
  background: #ff6600;
}
</style>