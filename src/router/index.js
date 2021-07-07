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
    redirect: '/tweets'
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
    path: '/users/:id/replied_tweets',
    name: 'user-tweets-replied',
    component: () => import('../views/User.vue')
  },
  {
    path: '/users/:id/likes_tweets',
    name: 'user-tweets-likes',
    component: () => import('../views/User.vue')
  },
  {
    path: '/users/:id/setting',
    name: 'account-setting',
    component: () => import('../views/AccountSetting.vue')
  },
  {
    path: '/users/:id/followings',
    name: 'user-followings',
    component: () => import('../views/UserFollowships.vue')
  },
  {
    path: '/users/:id/followers',
    name: 'user-followers',
    component: () => import('../views/UserFollowships.vue')
  },
  {
    path: '/admin/tweets',
    name: 'admin-tweets',
    component: () => import('../views/AdminTweets.vue')
  },
  {
    path: '/admin/users',
    name: 'admin-lusers',
    component: () => import('../views/AdminUsers.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
