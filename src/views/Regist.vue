<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <img class="mb-4" src="../assets/logo.svg" alt="" />
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">建立你的帳號</h1>
      </div>

      <div class="form-label-group mb-2">
        <label class="input-label" for="account">帳號</label>
        <input
          v-model="account"
          id="account"
          name="account"
          type="text"
          class="form-control"
          placeholder=""
          autocomplete="username"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-2">
        <label class="input-label" for="name">名稱</label>
        <input
          v-model="name"
          id="name"
          name="name"
          type="text"
          class="form-control"
          placeholder=""
          autocomplete="username"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-2">
        <label class="input-label" for="email">Email</label>
        <input
          v-model="email"
          id="email"
          name="email"
          type="email"
          class="form-control"
          placeholder=""
          autocomplete="username"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-3">
        <label class="input-label" for="password">密碼</label>
        <input
          v-model="password"
          id="password"
          name="password"
          type="password"
          class="form-control"
          placeholder=""
          autocomplete="current-password"
          required
        />
      </div>

      <div class="form-label-group mb-3">
        <label class="input-label" for="checkPassword">密碼確認</label>
        <input
          v-model="checkPassword"
          id="checkPassword"
          name="checkPassword"
          type="password"
          class="form-control"
          placeholder=""
          autocomplete="current-password"
          required
        />
      </div>

      <button class="btn btn-lg btn-block mb-3" type="submit" :disabled="isProcessing">
        註冊
      </button>

      <div class="text mb-3">
        <p>
          <router-link to="/login">取消</router-link>
        </p>
      </div>
    </form>
  </div>
</template>


<script>
import authorizationAPI from './../apis/authorization'
import { Toast } from './../utils/helpers'

export default {
  data () {
    return {
      account: '',
      name: '',
      email: '',
      password: '',
      checkPassword: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit () {
      try {
          if (!this.account || !this.name || !this.email || !this.password || !this.checkPassword) {
          Toast.fire({
            icon: "warning",
            title: "請填寫完整的資料",
          });
          return;
        }
        if (this.password !== this.checkPassword) {
          this.password = "";
          this.checkPassword = "";
          Toast.fire({
            icon: "warning",
            title: "兩次密碼不一樣，請確認",
          });
          return;
        }
        this.isProcessing = true
        const { data } = await authorizationAPI.regist({
        account: this.account,
        name: this.name,
        email: this.email,
        password: this.password,
        checkPassword: this.checkPassword,
        })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        Toast.fire({
          icon: "success",
          title: "註冊成功",
        });


        this.$router.push('/login')
      } catch (error) {
        console.log('error',error.response.data.message)
        this.isProcessing = false
        if(error.response.data.message === "Account was already used.") {
          this.account = ''
          this.name = ''
          this.email = ''
          this.password = ''
          this.checkPassword = ''
          Toast.fire({
          icon: 'warning',
          title: '帳號已被使用'
        })
        } else if (error.response.data.message === "Email was already used."){
          this.password = ''
          Toast.fire({
          icon: 'warning',
          title: '信箱已被使用'
        })
        } 
        else {
          Toast.fire({
          icon: 'warning',
          title: '註冊失敗，請稍後再試'
        })
        } 
        console.error(error.message)
      }
    }
  }
}
</script>


<style scoped>
img {
  margin-top: 30px;
}
h1 {
  font-family: "Noto Sans TC", sans-serif;
  font-size: 23px;
  line-height: 33px;
}
.form-label-group {
  border-bottom: 1px solid black;
  position: relative;
  max-width: 540px;
  max-height: 212px;
  margin: 0 auto;
  border-radius: 4px;
}

.form-control {
  background: #f5f8fa;
  height: 50px;
  border: 0;
  margin-top: 20px;
  padding-top: 30px;
}

.input-label {
  position: absolute;
  top: 5px;
  left: 10px;
  font-size: 15px;
  font-weight: 500;
  color: #657786;
}
.btn {
  border-radius: 50px;
  background: #ff6600;
  color: #fff;
  border: none;
  max-width: 540px;
  margin: 30px auto;
}
.text {
  display: flex;
  justify-content: center;
  max-width: 540px;
  max-height: 26px;
  margin: 20px auto;
}
</style>