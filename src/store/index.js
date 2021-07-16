import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      account: '',
      name: '',
      email: '',
      avatar: '',
      role: 'user'
    },
    isAuthenticated: false,
    token: ''
  },
  mutations: {
    setCurrentUser (state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.isAuthenticated = true
      state.token = localStorage.getItem('token')
    },
    revokeAuthentication (state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
      sessionStorage.removeItem('rooms')
      console.log('[RevokeAuthentication completed]')
    },
    setCurrentRoomId(state, newRoomId) {
      state.currentRoomId = newRoomId
    }
  },
  actions: {
    async fetchCurrentUser ({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser()

        if (data.statusText === 'error') {
          throw new Error(data.message)
        }

        const { id, account, name, email, avatar, role } = data

        commit('setCurrentUser', {
          id, account, name, email, avatar, role
        })

        return true
      } catch (error) {
        console.error(error.message)
        commit('revokeAuthentication')
        return false
      }
    }
  },
  modules: {
  }
})
