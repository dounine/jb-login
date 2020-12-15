import { createStore } from 'vuex'
import position from '../api/position'

export default createStore({
  state: {
    loading: true,
    token: null
  },
  mutations: {//sync
    setToken(state, value) {
      state.token = value
    },
    setLoading(state, value) {
      state.loading = value
    },
  },
  actions: {//async
    queryPositions({ commit }) {
      position.query('virtual')
        .then(response => {
          const convertPositions = response.data.data.map(item => {
            return {
              ...item,
              icon: require(`../assets/images/${item.name}.svg`),
            };
          });
          commit('setPositions', convertPositions)
          commit('setLoading', false)
        })
    }
  },
  modules: {
  },
  getters: {
  }
})
