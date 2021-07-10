<template>
  <div>
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
                  name="image" 
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
                  name="image" 
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
                  class="user-name-input">
                <span class="text-count">
                  {{ profile.name ? profile.name.length : 0 }}/50</span>
              </div>
              <div class="user-intro">
                <label for="">自我介紹</label>
                <textarea 
                  v-model="profile.introduction"
                  name=""
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
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      profile: {
        cover: '',
        avatar: '',
        name: '',
        introduction: ''  
      },
      editModalShow: false
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
        this.editModalShow = true
      } else if (mode === 'close') {
        this.profile = {...this.user}
        this.editModalShow = false
      }
    },
    handleSubmit (e) {
      const form = e.target  
      const formData = new FormData(form)
      this.$emit('after-submit', formData)
    }
  }
}
</script>

<style scoped>
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
</style>