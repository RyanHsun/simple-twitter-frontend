<template>
  <section class="sidebar">
    <div class="top">
      <h1 class="logo">
        <router-link to="/">
          <img src="~@/assets/img/logo.svg" alt="" />
        </router-link>
      </h1>
      <nav class="navigation">
        <router-link class="nav-item" to="/">
          <div class="icon index">
            <img src="~@/assets/img/icon_index.svg" alt="" />
          </div>
          <div>首頁</div>
        </router-link>
        <router-link 
          class="nav-item" 
          :to="{ name: 'user', params: { id: currentUser.id } }"
        >
          <div class="icon user">
            <img src="~@/assets/img/icon_user.svg" alt="" />
          </div>
          <div>個人資料</div>
        </router-link>
        <router-link 
          class="nav-item" 
          :to="{ name: 'account-setting', params: { id: currentUser.id } }"
        >
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
        <!-- Modal -->
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <img src="~@/assets/img/icon_close-og.svg" alt="" />
              </button>
            </div>
            <div class="modal-body">
              <form class="create-tweet" action="">
                <div class="create-tweet-wrap">
                  <span class="avatar" href="">
                    <img
                      :src="currentUser.avatar"
                      alt=""
                    />
                  </span>
                  <textarea
                    v-model="newTweet"
                    class="tweet-textarea"
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    maxlength="140"
                    placeholder="有什麼新鮮事？"
                  ></textarea>
                </div>
                <button
                  class="btn tweet-button"
                  :disabled="isProcessing"
                  @click="addTweet"
                >
                  推文
                </button>
              </form>
            </div>
          </div>
        </div>
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
import { emptyImageFilter } from "../utils/mixins";
import { mapState } from "vuex";
import tweetsAPI from "./../apis/tweets";
import { Toast } from "./../utils/helpers";
import $ from "jquery";

export default {
  mixins: [emptyImageFilter],
  data() {
    return {
      newTweet: "",
      isShowModal: false,
      isProcessing: false
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  methods: {
    async addTweet() {
      try {
        if (!this.newTweet) {
          Toast.fire({
            icon: "warning",
            title: "您的推文未填寫任何內容",
          });
          return;
        }
        this.isProcessing = true;
        const { data } = await tweetsAPI.createTweet({
          description: this.newTweet,
        });
        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.$emit("after-submit-tweet", { description: this.newTweet
         });
        $("#newTweetModal").modal("hide");
        Toast.fire({
          icon: "success",
          title: "新增推文成功",
        });
        this.isProcessing = false;

        this.newTweet = "";
      } catch (error) {
        console.log(error.message);
        Toast.fire({
          icon: "warning",
          title: "無法新增推文，請稍候在試",
        });
      }
    },
    showModal() {
      this.isShowModal = true;
    },
    cancelModal() {
      this.isShowModal = false;
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
.close {
  margin: 0;
  padding: 0;
  opacity: 1;
}
.create-tweet {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 200px;
}
.create-tweet-wrap {
  display: flex;
  width: 100%;
  text-align: left;
}
.tweet-textarea {
  font-size: 18px;
  color: #9197a3;
  border: none;
  outline: none;
  width: calc(100% - 60px);
  resize: none;
}
.avatar {
  display: inline-block;
}
.tweet-button {
  align-self: flex-end;
  color: #fff;
  background-color: #ff6600;
}
</style>