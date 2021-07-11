<template>
  <div class="user-profile">
    <div class="user-profile-head">
      <div class="user-cover">
        <img :src="user.cover" alt="" />
      </div>
      <p class="user-avatar avatar">
        <img :src="user.avatar" alt="" />
      </p>

      <!-- <EditProfileModal
        :user="user"
        @after-submit="handleAfterSubmit"
      /> -->
  
      <!-- Button trigger modal -->
      <button 
        type="button" 
        class="btn user-edit" 
        data-toggle="modal" 
        data-target="#editProfileModal"
        @click="handleEditModalShow('open')"
      >
        編輯個人資料
      </button>
      <!-- Modal -->
      <div 
        v-if="isShowModal"
        class="modal fade" 
        id="editProfileModal" 
        data-backdrop="static" 
        data-keyboard="false" 
        tabindex="-1" 
        aria-labelledby="staticBackdropLabel" 
        aria-hidden="true" 
      >
        <div class="modal-dialog">
          <form class="modal-content" @submit.stop.prevent="handleSubmit">
            <div class="modal-header">
              <button 
                type="button" 
                class="close" 
                data-dismiss="modal" 
                aria-label="Close" 
                @click="handleEditModalShow('close')"
              >
                <img src="~@/assets/img/icon_close-og.svg" alt="">
              </button>
              <p>編輯個人資料</p>
              <button class="btn update-profile" type="submit">儲存</button>
            </div>
            <div class="modal-body">
              <div class="user-profile-edit">
                <div class="user-cover">
                  <label for="upload-image-cover" class="upload-image">
                    <img src="~@/assets/img/icon_upload.svg" alt="">
                  </label>
                  <input 
                    id="upload-image-cover" 
                    type="file" 
                    name="image-cover" 
                    accept="image/*" 
                    class="form-control-file"
                    @change="handleFileChange">
                  <img :src="profile.cover" alt="">
                </div>
                <div class="user-avatar avatar">
                  <label for="upload-image-avatar" class="upload-image">
                    <img src="~@/assets/img/icon_upload.svg" alt="">
                  </label>
                  <input 
                    id="upload-image-avatar" 
                    type="file" 
                    name="image-avatar" 
                    accept="image/*" 
                    class="form-control-file"
                    @change="handleFileChange">
                  <img :src="profile.avatar" alt="">
                </div>
                <div class="user-name">
                  <label for="">名稱</label>
                  <input 
                    v-model="profile.name"
                    type="text" 
                    maxlength="50" 
                    name="name"
                    class="user-name-input">
                  <span class="text-count">
                    {{ profile.name ? profile.name.length : 0 }}/50</span>
                </div>
                <div class="user-intro">
                  <label for="">自我介紹</label>
                  <textarea 
                    v-model="profile.introduction"
                    name="introduction"
                    cols="30"
                    rows="5"
                    maxlength="160"
                    class="user-intro-textarea"></textarea>
                  <span class="text-count">{{ profile.introduction ? profile.introduction.length : 0 }}/160</span>
                </div>
              </div>
            </div>
          </form>
        </div>
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
// import EditProfileModal from './../components/EditProfileModal.vue'
import $ from 'jquery'

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      profile: {
        cover: '',
        avatar: '',
        name: '',
        introduction: ''  
      },
      isShowModal: false
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchProfile(id)
  },
  methods: {
    fetchProfile (profileId) {
      console.log('Profile Id:', profileId)
      this.profile = {...this.user}
    },
    handleFileChange (e) {
      const files = e.target.files

      if ( e.target.matches('#upload-image-cover') ) {
        if (files.length === 0 ) {
          this.profile.cover = this.user.cover
        } else {
          const imageURL = window.URL.createObjectURL(files[0])
          this.profile.cover = imageURL
        }
      } else if ( e.target.matches('#upload-image-avatar') ) {
        if (files.length === 0 ) {
          this.profile.avatar = this.user.avatar
        } else {
          const imageURL = window.URL.createObjectURL(files[0])
          this.profile.avatar = imageURL
        }
      }
    },
    handleEditModalShow (mode) {
      if (mode === 'open') {
        this.$router.push({ name: 'user-edit' })
        this.isShowModal = true
      } else if (mode === 'close') {
        this.profile = {...this.user}
        this.isShowModal = false
        this.$router.push({
          name: 'user',
          params: { id: this.user.id }
        })
      }
    },
    handleSubmit (e) {
      const form = e.target  
      const formData = new FormData(form)
      this.$emit('after-submit', formData)

      $("#editProfileModal").modal('hide')
      this.isShowModal = false
      this.$router.push({
        name: 'user',
        params: { id: this.user.id }
      })
      this.user = {...this.profile}
    }
  }
}
</script>

<style>

.user-profile {
  text-align: left;
  border-width: 0 1px;
  border-style: solid;
  border-color: #e6ecf0;
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
.user-introduction,
.user-followships {
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
  }
</style>