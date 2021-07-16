import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import Login from '../views/Login.vue'
import Tweets from '../views/Tweets.vue'
import AdminLogin from '../views/AdminLogin.vue'
import store from './../store'

Vue.use(VueRouter)

const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser
  // console.log('currentUser:', currentUser)
  if (currentUser && currentUser.role !== 'admin') {
    next('/404')
    return
  }
  next()
}

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
    path: '/admin',
    name: 'admin-root',
    redirect: '/admin/login'
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: AdminLogin
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
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/tweets',
    name: 'admin-tweets',
    component: () => import('../views/AdminTweets.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch((err) => err)
}

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach(async (to, from, next) => {
  // get token from localStorage
  const currentUser = store.state.currentUser
  const token = localStorage.getItem('token')
  const tokenInStore = store.state.token
  const pathsWithoutAuthentication = ['login', 'regist', 'admin-login']

  // console.log('currentUser:', currentUser)

  let isAuthenticated = store.state.isAuthenticated

  if (token && token !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next('/login')
    return
  }

  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    if (currentUser.role === 'user') {
      next('/tweets')
    } else if (currentUser.role === 'admin') {
      next('/admin/tweets')
    }
    return
  }
  next()
})

export default router
