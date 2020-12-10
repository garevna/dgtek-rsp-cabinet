/* eslint-disable no-unused-vars */

const state = {
  polygons: null,
  polygonsError: null,
  polygonsLoading: null
}

const getters = {
  polygons: (state, getters, rootState) => `${rootState.hostDka}/api/frontend/polygons`
}

const mutations = {
  POLYGONS: (state, payload) => {
    state.polygons = payload
  },
  ERROR: (state, payload) => {
    state.polygonsError = payload
  },
  LOADING: (state, payload) => {
    state.polygonsLoading = payload
  }
}
const actions = {
  async GET_POLYGONS ({ getters, commit }) {
    commit('ERROR', null)
    commit('LOADING', true)
    try {
      const response = await (await fetch(
        getters.polygons,
        { method: 'GET' }
      )).json()
      if (!response.error) {
        commit('POLYGONS', response)
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
