import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: null,
  },
  mutations: {
    //修改state里面的userinfo
    updateUserInfo(state, userinfo) {
      state.userinfo = userinfo
    }
  },
  actions: {
  },
  modules: {
  }
})
