const state = {
  active: 0
}

const mutations = {
  SET_ACTIVE: (state, active) => {
    state.active = active
  }
}

const actions = {
  // user login
  setActive({ commit }, active) {
    return new Promise((resolve, reject) => {
      commit('SET_ACTIVE', active)
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
