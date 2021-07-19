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
            <button class="btn update-profile" type="submit" :disabled="isProcessing">儲存</button>
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
                  name="cover" 
                  accept="image/*" 
                  multiple
                  class="form-control-file"
                  @change="handleFileChange">
                  <img :src="user.cover | emptyImage" alt="">
              </div>
              <div class="user-avatar avatar">
                <label for="upload-image-avatar" class="upload-image">
                  <img src="~@/assets/img/icon_upload.svg" alt="">
                </label>
                <input 
                  id="upload-image-avatar" 
                  type="file" 
                  name="avatar" 
                  accept="image/*" 
                  multiple
                  class="form-control-file"
                  @change="handleFileChange">
                  <img :src="user.avatar | emptyImage" alt="">
              </div>
              <div class="user-name">
                <label for="">名稱</label>
                
                <input 
                  v-model="user.name"
                  type="text" 
                  name="name"
                  required
                  maxlength="50" 
                  class="user-name-input">
                <span class="text-count">
                  {{ user.name ? user.name.length : 0 }}/50</span>
              </div>
              <div class="user-intro">
                <label for="">自我介紹</label>
                <textarea 
                  v-model="user.introduction"
                  name="introduction"
                  cols="30"
                  rows="5"
                  maxlength="160"
                  class="user-intro-textarea"></textarea>
                <span class="text-count">{{ user.introduction ? user.introduction.length : 0 }}/160</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";

export default {
  mixins: [emptyImageFilter],
  props: {
    initialUser: {
      type: Object,
      default: () => {
        return {
          id: 0,
          account: '',
          cover: '',
          avatar: '',
          name: '',
          introduction: '', 
          editModalShow: false,
          isProcessing: false
        }
      }
    },
    isProcessing: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      user: {
        ...this.initialUser
      }
    }
  },
  created () {
    this.fetchProfile()
  },
  methods: {
    fetchProfile () {
        this.user = {...this.initialUser}
    },
    handleFileChange (e) {
      const files = e.target.files

      if ( e.target.matches('#upload-image-cover') ) {
        if (files.length === 0 ) {
          this.cover = this.user.cover
        } else {
          const imageURL = window.URL.createObjectURL(files[0])
          this.user.cover = imageURL
        }
      } else if ( e.target.matches('#upload-image-avatar') ) {
        if (files.length === 0 ) {
          this.avatar = this.user.avatar
        } else {
          const imageURL = window.URL.createObjectURL(files[0])
          this.user.avatar = imageURL
        }
      }
    },
    handleSubmit (e) {
      const form = e.target
      const formData = new FormData(form)
      
      this.$emit('after-submit', formData)
    },
    handleEditModalShow (mode) {
      this.user = {...this.initialUser}
      if (mode === 'open') {
        this.editModalShow = true
      } else if (mode === 'close') {
        this.user = {...this.initialUser}
        this.editModalShow = false
      }
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

 @media (max-width: 576px) {
   .user-edit {
    font-size: 14px;
    padding: 5px 15px;
   }
 }
</style>