import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      token: '',
      name: ''
    }
  },
  mutations: {
    addToken (state, payload) {
      state.user.token = payload.token
      state.user.name = payload.name
    }
  },
  actions: {
    addToken (context, payload) {
      context.commit('addToken', payload)
    }
  }
})

export default store
