<template>
  <div class="container">
    <Sidebar />
    <section class="account-setting">
      <h2 class="headbar">
        <div class="main-title">帳戶設定</div>
      </h2>
      <form @submit.stop.prevent="handleSubmit">
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
          <label class="input-label" for="passwordNew">新密碼</label>
          <input
            v-model="passwordNew"
            id="passwordNew"
            name="passwordNew"
            type="password"
            class="form-control"
            placeholder=""
            autocomplete="current-password"
            required
          />
        </div>

        <div class="form-label-group mb-3">
          <label class="input-label" for="passwordNewCheck">新密碼確認</label>
          <input
            v-model="passwordNewCheck"
            id="passwordNewCheck"
            name="passwordNewCheck"
            type="password"
            class="form-control"
            placeholder=""
            autocomplete="current-password"
            required
          />
        </div>

        <button class="save-btn btn" type="submit">
          {{ isProcessing ? '資料更新中...' : '儲存' }}
        </button>
      </form>
    </section>
  </div>
</template>


<script>
import { mapState } from 'vuex'
import Sidebar from "./../components/Sidebar.vue";
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'

export default {
  components: {
    Sidebar,
  },
  data () {
    return {
      id: -1,
      account: '',
      name: '',
      email: '',
      password: '',
      passwordNew:'',
      passwordNewCheck:'',
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    currentUser (user) {
      if (user.id === -1) return
      const { id } = this.$route.params
      this.setUser(id)
    }
  },
  created () {
    if (this.currentUser.id === -1) return
    const { id } = this.$route.params
    this.setUser(id)
  },
  beforeRouteUpdate (to, from, next) {
    if (this.currentUser.id === -1) return
    const { id } = to.params
    this.setUser(id)
    next()
  },
  methods: {
    setUser (userId) {
      const { 
        id,
        account,
        name,
        email,
        password,
        passwordNew,
        passwordNewCheck
      } = this.currentUser

      if (id.toString() !== userId.toString()) {
        this.$router.push({ name: 'not-found' })
        return
      }

      this.id = id,
      this.account = account
      this.name = name
      this.email = email
      this.password = password
      this.passwordNew = passwordNew
      this.passwordNewCheck = passwordNewCheck

    },
    async handleSubmit (e) {
      try {
        if (
          !this.account ||
          !this.name ||
          !this.email ||
          !this.password ||
          !this.passwordNew ||
          !this.passwordNewCheck
        ) {
          Toast.fire({
            icon: 'warning',
            title: '請確認已填寫所有欄位'
          })
          return
        }
        if (this.passwordNew !== this.passwordNewCheck) {
          Toast.fire({
            icon: 'warning',
            title: '兩次輸入的密碼不同'
          })
          this.passwordNewCheck = ''
          return
        }

        const form = e.target
        const formData = new FormData(form)
        // for (let [name, value] of formData.entries()) {
        //   console.log(name + ': ' + value)
        // }
        this.isProcessing = true

        const { data } = await usersAPI.updateUser({
          userId: this.id,
          formData
        })

        if (data.status === 'error') {
          throw new Error(data.message)
        } 

        Toast.fire({
          icon: 'success',
          title: '資料更新成功'
        })

        this.isProcessing = false

        this.$router.push({ name: 'user', params: { id: this.id } })
      } catch (error) {
        console.error(error.message)
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法更新使用者資料，請稍後再試'
        })
      }
    }
  }
}
</script>


<style scoped>
.container {
  display: grid;
  grid-template-columns: 20% auto;
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 0 0 20px;
}
.headbar {
  position: absolute;
  top: -50px;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 15px 20px;
  font-size: 18px;
  text-align: left;
  border-width: 0 1px 1px 1px;
  border-style: solid;
  border-color: #E6ECF0;
  background: #fff;
}
.account-setting {
  position: relative;
  margin-top: 50px;
}

.account-setting-wrap {
  overflow-y: scroll;
  max-height: calc(100vh - 62px);
}
form {
  border-width: 0 1px;
  border-style: solid;
  border-color: #e6ecf0;
  padding: 30px 20px
  ;
}
.form-label-group {
  border-bottom: 1px solid black;
  position: relative;
  max-width: 540px;
  max-height: 212px;
  border-radius: 4px;
}

.form-control {
  background: #f5f8fa;
  border: 0;
  height: 50px;
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
.save-btn {
  border-radius: 50px;
  color: #fff;
  background: #ff6600;
}
</style>