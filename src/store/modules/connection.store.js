/* eslint-disable no-unused-vars */
const ticketSentSuccessfully = 'Ticket sent successfully'

const state = {
  conectMessage: null,
  connectError: null,
  connectLoading: null
}

const getters = {
  connectionRequest: (state, getters, rootState) => `${rootState.host}/ticket/connection-request`,
  connectivityResearch: (state, getters, rootState) => `${rootState.host}/ticket/connectivity-research`
}

const mutations = {
  MESSAGE: (state, payload) => {
    state.conectMessage = payload
  },
  ERROR: (state, payload) => {
    state.connectError = payload
  },
  LOADING: (state, payload) => {
    state.connectLoading = payload
  }
}
const actions = {
  async REQUEST ({ getters, commit }, data) {
    commit('ERROR', null)
    commit('LOADING', true)
    try {
      const response = await (await fetch(
        getters.connectionRequest,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: process.env.VUE_APP_AUTHORIZATION_KEY
          },
          body: JSON.stringify(data)
        }
      )).json()
      if (!response.error) {
        commit('MESSAGE', ticketSentSuccessfully)
        commit('LOADING', false)
      } else {
        commit('ERROR', response.error)
        commit('LOADING', false)
        console.error(response.error)
      }
    } catch (e) {
      commit('ERROR', e)
      commit('LOADING', false)
      console.error(e)
    }
  },
  async RESEARCH ({ getters, commit }, data) {
    commit('ERROR', null)
    commit('LOADING', true)
    try {
      const response = await (await fetch(
        getters.connectivityResearch,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: process.env.VUE_APP_AUTHORIZATION_KEY
          },
          body: JSON.stringify(data)
        }
      )).json()
      if (!response.error) {
        commit('MESSAGE', ticketSentSuccessfully)
        commit('LOADING', false)
      } else {
        commit('ERROR', response.error)
        commit('LOADING', false)
        console.error(response.error)
      }
    } catch (e) {
      commit('ERROR', e)
      commit('LOADING', false)
      console.error(e)
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
