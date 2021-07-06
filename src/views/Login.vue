<template>
  <div class="container py-5">
    <form class="w-100">
      <img class="mb-4" src="../assets/logo.svg" alt="">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">
          登入Aphitter
        </h1>
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
        >
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
        >
      </div>

      <button
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
      >
        登入
      </button>

      <div class="text-right mb-3">
        <p>
          <router-link to="/users">註冊Aphitter</router-link>
          ·
          <a href="/signup">後台登入</a>

        </p>
      </div>

    </form>
  </div>
</template>



<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  }
}
</script>



<style scoped>
img {
  margin-top: 30px;
}
h1 {
  font-family: 'Noto Sans TC', sans-serif;
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
  background: #F5F8FA;
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