import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import Login from '../views/Login.vue'

import Tweets from '../views/Tweets.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/regist',
    name: 'regist',
    component: () => import('../views/Regist.vue')
  },
  {
    path: '/tweets',
    name: 'tweets',
    component: Tweets
  },
  {
    path: '/tweets/:id',
    name: 'tweet',
    component: () => import('../views/Tweet.vue')
  },
  {
    path: '/users/:id',
    name: 'user',
    component: () => import('../views/User.vue')
  },
  {
    path: '/users/:id/edit',
    name: 'user-edit',
    component: () => import('../views/User.vue')
  },
  {
    path: '/users/:id/replied_tweets',
    name: 'user-replied-tweets',
    component: () => import('../views/User.vue')
  },
  {
    path: '/users/:id/likes',
    name: 'user-likes-tweets',
    component: () => import('../views/User.vue')
  },
  {
    path: '/users/:id/setting',
    name: 'account-setting',
    component: () => import('../views/AccountSetting.vue')
  },
  // {
  //   path: '/users/:id/followings',
  //   name: 'user-followings',
  //   component: () => import('../views/UserFollowships.vue')
  // },
  // {
  //   path: '/users/:id/followers',
  //   name: 'user-followers',
  //   component: () => import('../views/UserFollowships.vue')
  // },
  {
    path: '/admin/tweets',
    name: 'admin-tweets',
    component: () => import('../views/AdminTweets.vue')
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue')
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('../views/AdminLogin.vue')
  },
  //test for UserFollow part
  //test for UserFollow part
  {
    path: '/users/:id/followers',
    name: 'user-followers',
    component: () => import('../views/UserFollowers.vue')
  },
  {
    path: '/users/:id/followings',
    name: 'user-followings',
    component: () => import('../views/UserFollowings.vue')
  },
  //test for UserFollow part
  //test for UserFollow part
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const router = new VueRouter({
  routes
})

export default router
