<template>
  <div class="user-profile">
    <div class="user-profile-head">
      <div class="user-cover">
        <img :src="user.cover | emptyImage" alt="" />
      </div>
      <p class="user-avatar avatar">
        <img :src="user.avatar | emptyImage" alt="" />
      </p>
      <!-- <template v-if="isCurrentUser">
        <EditProfileModal
          :user="user"
        /> 
      </template> -->
      <template v-if="isCurrentUser">
        <EditProfileModal
          :initial-user="user"
          :is-processing="isProcessing"
          @after-submit="handleAfterSubmit"
        />
      </template>
      <div v-else>
          <!-- :to="{ name: 'message-await', params: { id: user.id } }" -->
        <button  
          @click="join_private_room"
          class="private-message"
        >
          <img src="~@/assets/img/icon_message.svg">
        </button >
        <button
          v-if="this.user.isFollowing"
          type="submit" 
          class="btn btn-follow" 
          :class="{ 'is-following': this.user.isFollowing }" 
          @click.prevent.stop="deleteFollowing"
        >
          正在跟隨
        </button>
        <button
          v-else
          type="click"
          class="btn btn-follow" 
          @click.prevent.stop="addFollowing"
        > 
          跟隨
        </button>
      </div>
    </div>
    <p class="user-info">
      <span class="name">{{ user.name }}</span>
      <span class="account">@{{ user.account }}</span>
    </p>
    <div class="user-introduction">
      {{ user.introduction }}
    </div>
    <div class="user-followships">
      <router-link class="nav-item " :to="{ name: 'user-followings', params: { id: user.id } }"
        ><div class="user-following">
          {{ user.followingNum }} 個跟隨中
        </div></router-link
      >
      <router-link class="nav-item" :to="{ name: 'user-followers', params: { id: user.id } }"
        ><div class="user-follower">
          {{ user.followerNum }} 位跟隨者
        </div></router-link
      >
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import EditProfileModal from './EditProfileModal.vue'
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'
import { emptyImageFilter } from '../utils/mixins'
import $ from 'jquery'

export default {
  mixins: [emptyImageFilter],
  props: {
    isCurrentUser: {
      type: Boolean,
      required: true
    },
    initialUser: {
      type: Object,
      required: true
    }
  },
  components: {
    EditProfileModal
  },
  data () {
    return {
      user: {
        id: -1,
        account: '',
        name: '',
        email: '',
        introduction: '',
        avatar: '',
        cover: '',
        tweetNum: -1,
        likeNum: -1,
        followingNum: -1,
        followerNum: -1,
        lastLoginAt: '',
        isFollowing: false
      },
      isProcessing: false,
      isSelf: false,
      socket: null,
      privateRoomId: 0,
      privateRoomAwait: {}
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    initialUser (newValue) {
      this.user = {
        ...this.user,
        ...newValue
      }
    },
    privateRoomId () {
      this.privateRoomAwait = {
        id: this.privateRoomId,
        userId: this.user.id,
        name: this.user.name,
        account: this.user.account,
        avatar: this.user.avatar
      }
      localStorage.setItem('privateRoomAwait', JSON.stringify(this.privateRoomAwait))
      this.linkToPrivateMessage()
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchUser(id)
    this.checkFollow(id)
    this.checkIsSelf()
  },
  updated() {
    this.$socket.on('join_private_room')
  },
  beforeRouteUpdate (to, from, next) {
    // this.$socket.on('join_private_room')
    const { id } = to.params
    this.fetchUser(id)
    this.checkFollow(id)
    this.checkIsSelf()
    next()
  },
  sockets: {
    connect: function() {
      console.log("連線成功")
    },
    disconnect(){
      console.log("斷開連線");
    },
    reconnect(){
      console.log("重新連線");
    },
    join_private_room(data) {
      console.log('加入room的data',data)
      this.privateRoomId = data
    }
  },
  methods: {
    async fetchUser(userId) {
      try {
        const { data } = await usersAPI.getUser({ userId })

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        const {
          id,
          account,
          name,
          email,
          introduction,
          avatar,
          cover,
          tweetNum,
          likeNum,
          followingNum,
          followerNum,
          lastLoginAt,
          isFollowing
        } = data
        this.user = {
          id,
          account,
          name,
          email,
          introduction,
          avatar,
          cover,
          tweetNum,
          likeNum,
          followingNum,
          followerNum,
          lastLoginAt,
          isFollowing
        }

      } catch (error) {
        console.error(error.message)
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試'
        })
      }
    },
    checkIsSelf() {
      if (this.user.id === this.currentUser.id) {
        this.isSelf = true
      } else {
        this.isSelf = false
      }
    },
    async checkFollow() {
      try {
        const { data } = await usersAPI.getFollowings({ userId: this.currentUser.id })
        data.map((followingId) => {
          if (followingId === this.currentUser.id) {
            this.isFollowing = true
          } else {
            this.isFollowing = false
          }
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法讀取跟隨狀態，請稍後再試',
        })
      }
    },
    async addFollowing () {
      try {
        const { data } = await usersAPI.addFollowing({ id: this.user.id })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.user.isFollowing = true
        this.user.followerNum++
        
        Toast.fire({
          icon: 'success',
          title: '跟隨成功'
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法新增跟隨，請稍後再試',
        })
      }
    },
    async deleteFollowing () {
      try {
        const { data } = await usersAPI.deleteFollowing({ userId: this.user.id })
        
        if(data.status === 'error') {
          throw new Error(data.message)
        }
        this.user.isFollowing = false
        this.user.followerNum--

        Toast.fire({
          icon: 'success',
          title: '取消跟隨'
        })
      } catch (error) {
        console.error(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法取消跟隨，請稍後再試'
        })
      }
    },
    async handleAfterSubmit (formData) {
      // for (let [name, value] of formData.entries()) {
      //   console.log(name + ': ' + value)
      // }
      try {
        this.isProcessing = true
        const { data } = await usersAPI.updateUser({
          userId: this.user.id,
          formData
        })
        
        if (data.status === 'error') {
          throw new Error(data.message)
        }

        $("#editProfileModal").modal('hide')

        Toast.fire({
          icon: 'success',
          title: '資料更新成功'
        })

        //即時更新
        const {name, introduction, avatar, cover}  = data
        this.user.name = name
        this.user.introduction = introduction
        this.user.avatar = avatar
        this.user.cover = cover

        this.isProcessing = false
        // this.$router.push({ name: 'user', params: { id: this.id } })
      } catch (error) {
        console.log('error', error)
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法更新個人資料，請稍後再試'
        })
      }
    },
    join_private_room() { 

      const User1Id = this.currentUser.id
      const User2Id = this.user.id

      this.$socket.emit('join_private_room', { User1Id,User2Id })

      console.log(`使用者${User1Id}加入私訊頁面，開始與${User2Id}聊天`)
      // console.log('進入與誰的私訊：', User2Id)
      // console.log('私人房號',this.privateRoom)
    },
    linkToPrivateMessage () {
      this.$router.push({ name: 'message-await', params: { id: this.privateRoomId } })
    }
  }
}
</script>


<style>

.user-profile {
  text-align: left;
}
.user-profile > div {
  display: flex;
  flex-wrap: wrap;
}
.user-profile-head {
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}
.user-cover {
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
  overflow: hidden;
}
.user-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.user-avatar {
  width: 140px;
  height: 140px;
  margin-top: -70px;
  margin-left: 20px;
}
.user-avatar img {
  border: 5px solid #fff;
}
.user-edit {
  margin-right: 20px;
}
.name {
  font-size: 19px;
}
.user-introduction {
  padding: 10px 20px;
}
.user-followships {
  font-size: 14px;
}
.user-following {
  margin-right: 20px;
}
</style>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 20% auto 30%;
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 20px;
}
.user-info {
  display: inline-block;
  padding: 0 20px;
}
.user-info span{
  display: block;
}
.user-followships {
  padding: 10px 20px;
}
.modal-header {
  position: relative;
  justify-content: flex-start;
  align-items: center;
}
.modal-header p {
  margin: 0 0 0 40px;
  font-weight: 700;
}
.modal-header .update-profile {
  position: absolute;
  right: 20px;
  padding: 0 10px;
  color: #fff;
  background-color: #FF6600;
}
.modal-body {
  padding: 0;
}
.close {
  margin: 0;
  padding: 0;
  opacity: 1;
}

.user-profile-edit {
  margin-bottom: 30px;
}
.tweet-textarea {
  font-size: 18px;
  color: #9197A3;
  border: none;
  outline: none;
  width: calc( 100% - 60px);
  resize: none;
}
.user-cover {
  position: relative;
}
.user-avatar {
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: 20px;
}
.upload-image {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: rgba(255, 255, 255, 20%);
}
.upload-image:hover img{
  transform: scale(1.2);
  transition: .3s ease;
}
.user-avatar label[for="upload-image-avatar"] {
  border-radius: 50%;
}
label[for="upload-image-cover"] img,
label[for="upload-image-avatar"] img {
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 0;
}
#upload-image-cover,
#upload-image-avatar {
  position: absolute;
  visibility: hidden;
}

.user-name,
.user-intro {
  position: relative;
  margin: 0 10px;
}
.user-name {
  margin-bottom: 20px;
}
.user-name label,
.user-intro label {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 15px;
  text-align: left;
}
.user-name-input,
.user-intro-textarea {
  width: 100%;
  border: 0;
  border-bottom: 2px solid #657786;
  background: #F5F8FA;
  outline: none;
}
.user-name-input {
  height: 70px;
  padding: 30px 10px 0 10px;
}
.user-intro-textarea {
  display: inherit;
  padding: 40px 10px 0 10px;
  resize: none;
}
.user-name span,
.user-intro span {
  display: block;
  font-size: 12px;
  text-align: right;
}

.tweet-button {
  align-self: flex-end;
  color: #fff;
  background-color: #FF6600;
}
.nav-item:hover,
.nav-item.active {
  color: #ff6600;
  text-decoration: none;
}
.is-following {
  color: #fff;
  background-color: #ff6600;
}
.btn-follow {
  margin-right: 20px;
}
.private-message {
  margin-right: 10px;
}
@media (max-width: 576px) {
  .user-avatar {
    width: 80px;
    height: 80px;
    margin-top: -35px;
  }
  .user-edit,
  .btn-follow {
    font-size: 14px;
    padding: 5px 15px;
  }
  .user-profile-head {
    margin-bottom: 0;
  }
}
</style>