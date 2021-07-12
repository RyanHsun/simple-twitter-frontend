<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <img class="mb-4" src="../assets/logo.svg" alt="" />
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">後台登入</h1>
      </div>

      <div class="form-label-group mb-2">
        <label class="input-label" for="email">帳號</label>
        <input
          v-model="email"
          id="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="請輸入註冊的信箱"
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
          placeholder="請輸入密碼"
          autocomplete="current-password"
          required
        />
      </div>

      <button
        class="btn btn-lg btn-block mb-3"
        type="submit"
        :disabled="isProcessing"
      >
        登入
      </button>

      <div class="text-right mb-3">
        <p>
          <router-link to="/login">前台登入</router-link>
        </p>
      </div>
    </form>
  </div>
</template>



<script>
import adminAPI from "../apis/admin"
import { Toast } from "./../utils/helpers"

export default {
  data() {
    return {
      email: "",
      password: "",
      isProcessing: false,
    }
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.email || !this.password) {
          Toast.fire({
            icon: "warning",
            title: "請填入 email 和 password",
          })
          return
        }
        this.isProcessing = true
        const response = await adminAPI.adminLogin({
          email: this.email,
          password: this.password,
        })
        const { data } = response

        if (data.status !== "success") {
          throw new Error(data.message)
        }
        // TODO: 向後端驗證使用者登入資訊是否合法

        // 將 token 存放在 localStorage 內
        localStorage.setItem("token", data.token)

        //呼叫setCurrentUser來做登入的動作
        this.$store.commit('setCurrentUser', data.User)

        // 成功登入後轉址到後台推特清單
        this.$router.push("/admin/tweets")

      } catch (error) {
        this.isProcessing = false
        this.password = ""
        Toast.fire({
          icon: "warning",
          title: "請確認您輸入了正確的帳號密碼",
        })
      }
    },
  },
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
.text-right {
  display: flex;
  justify-content: flex-end;
  max-width: 540px;
  max-height: 26px;
  margin: 41px auto;
}
</style>