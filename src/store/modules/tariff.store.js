/* eslint-disable no-unused-vars */

const state = {
  tariffs: [],
  tariffError: null,
  tariffLoading: null
}

const getters = {
  tariff: (state, getters, rootState) => `${rootState.host}/tariff`
}

const mutations = {
  TARIFF: (state, payload) => {
    state.tariffs = payload
  },
  ERROR: (state, payload) => {
    state.tariffError = payload
  },
  LOADING: (state, payload) => {
    state.tariffLoading = payload
  }
}
const actions = {
  async GET_TARIFS ({ getters, commit }) {
    commit('ERROR', null)
    commit('LOADING', true)
    try {
      const response = await (await fetch(
        getters.tariff,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: process.env.VUE_APP_AUTHORIZATION_KEY
          }
        }
      )).json()
      if (!response.error) {
        commit('TARIFF', response.tariffs)
        commit('LOADING', false)
      } else {
        commit('ERROR', response.error)
        commit('LOADING', false)
        console.error(response.error)
      }
    } catch (e) {
      commit('ERROR', e.message)
      commit('LOADING', false)
      console.error(e.message)
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
