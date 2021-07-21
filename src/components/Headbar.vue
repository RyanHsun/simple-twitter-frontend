<template>
  <h2 class="headbar">
    <button class="back" @click="$router.back()">
      <img src="~@/assets/img/icon_back.svg" alt="" />
    </button>
    <router-link 
      v-show="user.name"
      class="title" 
      :to="{ name: 'user', params: { id: user.id } }"
      >
      <div class="main-title">{{ user.name }}</div>
      <div class="sub-title">{{ user.tweetNum }} 推文</div>
    </router-link>
  </h2>
</template>


<script>
export default {
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: this.initialUser,
    };
  },
  watch: {
    //監控父層傳過來的資料是否更新，如有更新，以新資料為準
    initialUser(newValue) {
      this.user = {
        ...this.user,
        ...newValue,
      };
    },
  },
};
</script>

<style scoped>
.headbar {
  position: absolute;
  top: -50px;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  margin: 0;
  padding: 5px 20px;
  font-size: 18px;
  text-align: left;
  border-width: 0 1px 1px 1px;
  border-style: solid;
  border-color: #e6ecf0;
  background: #fff;
  transform: scale(1.002);
}
.back {
  margin-right: 40px;
}
.title {
  display: inline-block;
  text-decoration: none;
}
.title:hover {
  color: #ff6600;
}
.main-title {
  font-weight: 900;
}
.sub-title {
  font-size: 13px;
  color: #657786;
}
</style>