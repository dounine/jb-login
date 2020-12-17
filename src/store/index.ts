import { createStore } from 'vuex'
import UserApi from '../api/user'
import variables from './settings.js'

export default createStore({
  state: {
    theme: variables.theme,
    autoLogin: localStorage.getItem('autoLogin'),
    username: localStorage.getItem('username') || '',
    phone: localStorage.getItem('phone') || '',
    loading: true,
    token: null
  },
  mutations: {//sync
    setToken(state, value) {
      state.token = value
      localStorage.setItem('token', value)
    },
    setUsername(state, value) {
      state.username = value
      console.log('setusername', value);

      localStorage.setItem('username', value)
    },
    setPhone(state, value) {
      state.phone = value
      localStorage.setItem('phone', value)
    },
    setAutoLogion(state, value) {
      state.autoLogin = value
      localStorage.setItem('autoLogin', value)
    },
    setLoading(state, value) {
      state.loading = value
    },
  },
  actions: {//async
    queryPositions({ commit }) {
      const data: API.LoginData = {
        loginType: 'password',
        username: '11111111111',
        password: 'hello',
      }
      UserApi.login(data)
        .then(response => {
          console.log(response);
        })
    }
  },
  modules: {
  },
  getters: {
  }
})
