<template>
  <section class="sidebar">
    <div class="top">
      <h1 class="logo">
        <router-link to="/tweets">
          <img src="~@/assets/img/logo.svg" alt="" />
        </router-link>
      </h1>
      <nav class="navigation">
        <router-link class="nav-item index" to="/tweets">
          <div class="icon index">
            <img src="~@/assets/img/icon_index.svg" alt="" />
          </div>
          <div>首頁</div>
        </router-link>
        <router-link 
          class="nav-item notification" 
          to='/notification'
        >
          <div class="icon">
            <img src="~@/assets/img/icon_ring.svg" width="25px" alt="" />
            <span v-if="notiUnseenNum > 0" class="notice">{{ notiUnseenNum }}</span>
          </div>
          <div>通知</div>
        </router-link>
        <router-link 
          class="nav-item public-chat" 
          to='/room'
        >
          <div class="icon">
            <img src="~@/assets/img/icon_mail.svg" width="25px" alt="" />
          </div>
          <div>公開聊天室</div>
        </router-link>
        <router-link 
          class="nav-item private-chat" 
          to='/message'
        >
          <div class="icon">
            <img src="~@/assets/img/icon_mail.svg" width="25px" alt="" />
            <span v-if="msgUnseenNum > 0" class="notice">{{ msgUnseenNum }}</span>
          </div>
          <div>私人訊息</div>
        </router-link>
        <router-link 
          class="nav-item user-profile" 
          :to="{ name: 'user', params: { id: currentUser.id } }"
        >
          <div class="icon">
            <img src="~@/assets/img/icon_user.svg" alt="" />
          </div>
          <div>個人資料</div>
        </router-link>
        <router-link 
          class="nav-item account-setting" 
          :to="{ name: 'account-setting', params: { id: currentUser.id } }"
        >
          <div class="icon">
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
                      :src="currentUser.avatar | emptyImage"
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
                  @click="addTweet"
                  :disabled="isProcessing"
                >
                  {{ isProcessing ? '推文中...' : '推文' }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <button class="logout" @click="logout">
        <div class="icon">
          <img src="~@/assets/img/icon_logout.svg" alt="">
        </div>
        <div class="btn-logout">登出</div>
      </button>
    </div>
  </section>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins"
import { mapState } from "vuex"
import tweetsAPI from "./../apis/tweets"
import { Toast } from "./../utils/helpers"
import $ from "jquery"

export default {
  mixins: [emptyImageFilter],
  data() {
    return {
      newTweet: '',
      msgUnseenNum: 0,
      notiUnseenNum: 0,
      isShowModal: false,
      isProcessing: false,
      timelineNotice: {}
    }
  },
  watch: {
    newTweet(newValue) {
      if (newValue.length === 140) {
        Toast.fire({
          icon: 'warning',
          title: '字數限制140字',
        })
      }
    },
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  created () {
    this.notiUnseenNum = localStorage.getItem('notiUnseenNum')
    this.msgUnseenNum = localStorage.getItem('msgUnseenNum')
  },
  sockets: {
    get_msg_notice (unseenNum) {
      this.msgUnseenNum = unseenNum
      localStorage.setItem('msgUnseenNum', unseenNum)
    },
    get_timeline_notice (unseenNum) {
      this.notiUnseenNum = unseenNum
      localStorage.setItem('notiUnseenNum', unseenNum)
    },
    update_timeline_notice (data) {
      this.timelineNotice = data
      const currentNotiNum = localStorage.getItem('notiUnseenNum')
      this.notiUnseenNum = Number(currentNotiNum) + 1
      localStorage.setItem('notiUnseenNum', this.notiUnseenNum)
    }
  },
  methods: {
    logout () {
      this.$store.commit('revokeAuthentication')
      this.$router.push('/login')
    },
    async addTweet() {
      try {
        if (!this.newTweet) {
          Toast.fire({
            icon: "warning",
            title: "您的推文未填寫任何內容",
          })
          return
        }
        this.isProcessing = true

        const { data } = await tweetsAPI.createTweet({
          description: this.newTweet,
        })
        if (data.status === "error") {
          throw new Error(data.message)
        }

        this.$emit("after-submit-tweet", { description: this.newTweet })

        $("#newTweetModal").modal("hide")

        this.postTimeline(data.Tweet.id)

        Toast.fire({
          icon: "success",
          title: "新增推文成功",
        })
        this.isProcessing = false

        this.newTweet = ''

      } catch (error) {
        console.log(error.message)
        Toast.fire({
          icon: "warning",
          title: "無法新增推文，請稍候在試"
        })
      }
    },
    showModal() {
      this.isShowModal = true
    },
    cancelModal() {
      this.isShowModal = false
    },
    postTimeline(PostId) {
      const ReceiverId = null
      const type = 1
      this.$socket.emit('post_timeline', { ReceiverId, type, PostId })
    }
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
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
.nav-item:hover,
.logout:hover,
.nav-item.active,
.private-chat.router-link-active {
  color: #ff6600;
  text-decoration: none;
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
.nav-item.active .icon img,
.nav-item:hover .icon img,
.private-chat.router-link-active .icon img,
.logout:hover img {
  filter: invert(73%) sepia(100%) saturate(48) hue-rotate(364deg);
}
.icon {
  width: 30px;
  margin-right: 10px;
}
.nav-item .icon {
  position: relative;
}
.notice {
  position: absolute;
  top: -6px;
  right: -6px;
  width: auto;
  height: 20px;
  padding: 0 5px;
  font-size: 13px;
  line-height: 20px;
  border-radius: 20px;
  text-align: center;
  color: #fff;
  background: #ff6600;
  border: 1px solid #fff;
}
.logout:hover .btn-logout{
  color: #ff6600;
}

@media (max-width: 576px) {
  .nav-item div:last-child,
  .btn-logout {
    display: none;
  }
  .new-tweet {
    position: fixed;
    bottom: 3%;
    right: 3%;
    z-index: 10;
    width: auto;
    min-width: auto;
  }
  .private-chat {
    display: none;
  }
  .PublicMessage .new-tweet {
    display: none;
  }
}
</style>