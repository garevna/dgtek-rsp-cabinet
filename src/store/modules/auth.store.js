/* eslint-disable no-unused-vars */

const state = {
  // user: null,
  user: {
    fullName: 'Thomas Bricker',
    login: 'thomas',
    companyName: 'Thomas & Computor',
    ABN: '61600 896 115',
    contactPhone: '8 800 5000 500',
    email: 'thomas@company.com',
    _id: 'test'
  },

  authError: null,
  authLoading: false
}

const getters = {
  getUserEndpoint: (state, getters, rootState) => `${rootState.host}/user/find_by_hash`,
  editUserEndpoint: (state, getters, rootState) => `${rootState.host}/user`
}

const mutations = {
  USER: (state, payload) => {
    state.user = payload
  },
  AUTH_ERROR: (state, payload) => {
    state.authError = payload
  },
  AUTH_LOADING: (state, payload) => {
    state.authLoading = payload
  }
}
const actions = {
  async GET_USER ({ getters, commit }, hash) {
    if (!hash) {
      console.error('hash user', hash)
      return
    }
    commit('AUTH_ERROR', null)
    commit('AUTH_LOADING', true)
    const response = await (await fetch(
      `${getters.getUserEndpoint}/${hash}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: process.env.VUE_APP_AUTHORIZATION_KEY
        }
      }
    )).json()
    if (!response.error) {
      commit('USER', response.user)
      commit('AUTH_LOADING', false)
    } else {
      commit('AUTH_ERROR', response.error)
      commit('AUTH_LOADING', false)
      // console.error(response.error)
    }
  },
  async EDIT_USER ({ getters, commit, state }, data) {
    if (!state.user?._id) {
      commit('AUTH_ERROR', 'Profile data missing')
      return
    }
    commit('AUTH_ERROR', null)
    commit('AUTH_LOADING', true)
    const response = await (await fetch(
      `${getters.editUserEndpoint}/${state.user._id}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: process.env.VUE_APP_AUTHORIZATION_KEY
        }
      }
    )).json()
    if (!response.error) {
      commit('USER', response.user)
      commit('AUTH_LOADING', false)
    } else {
      commit('AUTH_ERROR', response.error)
      commit('AUTH_LOADING', false)
      // console.error(response.error)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
