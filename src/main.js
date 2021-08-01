import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIo from 'vue-socket.io'

const token = localStorage.getItem('token')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(new VueSocketIo({
  // debug: true,
  // connection: 'https://twitter-project-2021.herokuapp.com/',
  connection: 'https://d32a1de89cf0.ngrok.io/',
  options: {
    query: {
      auth: token
    }
  },
  vuex: {}
}))
