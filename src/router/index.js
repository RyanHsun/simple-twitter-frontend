import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import Login from '../views/Login.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/users',
    name: 'regist',
    component: () => import('../views/Regist.vue')
  },
  {
    path: '/users/:id',
    name: 'account-setting',
    component: () => import('../views/AccountSetting.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  }
]

const router = new VueRouter({
  routes
})

export default router
