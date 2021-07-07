<template>
  <div class="container">
    <Sidebar />
    <section class="account-setting">
      <div class="account-setting-wrap">
        <h2 class="title">帳號設定</h2>
        <form>
          <div class="text-center mb-4"></div>

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

          <button class="save-btn btn" type="submit">
            儲存
          </button>
        </form>
      </div>
    </section>
  </div>
</template>


<script>
import Sidebar from "./../components/Sidebar.vue";
export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      account: "",
      name: "",
      email: "",
      password: "",
      checkPassword: "",
    };
  },
};
</script>


<style scoped>
.container {
  display: grid;
  grid-template-columns: 20% auto;
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 20px;
}
.account-setting {
  position: relative;
  margin-top: 62px;
  border-width: 0 1px;
  border-style: solid;
  border-color: #e6ecf0;
}

.account-setting-wrap {
  overflow-y: scroll;
  max-height: calc(100vh - 62px);
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
  border: 0;
}

.input-label {
  position: absolute;
  top: 5px;
  left: 10px;
  font-size: 15px;
  font-weight: 500;
  color: #657786;
}
.save-btn {
  border-radius: 50px;
  color: #fff;
  background: #ff6600;
}
</style>