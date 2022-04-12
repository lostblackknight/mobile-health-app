import { login, getInfo, loginBySms } from '@/api/member'
import { getToken, setToken, removeToken, setRefreshToken, removeRefreshToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: [],
  status: 0
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_STATUS: (state, status) => {
    state.status = status
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { access_token, refresh_token } = response.data
        commit('SET_TOKEN', access_token)
        setToken(access_token)
        setRefreshToken(refresh_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  loginBySms({ commit }, userInfo) {
    const { phone, code } = userInfo
    return new Promise((resolve, reject) => {
      loginBySms({ phone: phone.trim(), code: code }).then(response => {
        const { access_token, refresh_token } = response.data
        commit('SET_TOKEN', access_token)
        setToken(access_token)
        setRefreshToken(refresh_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response
        const { roles, nickName, avatar, status } = data
        commit('SET_ROLES', roles)
        commit('SET_NAME', nickName)
        commit('SET_AVATAR', avatar)
        commit('SET_STATUS', status)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, dispatch }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      removeRefreshToken()
      resetRouter()
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      removeRefreshToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
