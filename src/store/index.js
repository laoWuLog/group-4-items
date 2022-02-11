import Vue from 'vue'
import Vuex from 'vuex'
import { getUserProfiles } from '../request/httpApi'

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
    // 处理异步的操作
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserProfiles().then(res => {
          if (res.code === 0) {
            // 把用户数据存储到vuex(调用vuex里面的mutation方法updateUserInfo)
            commit('updateUserInfo', res.data);
            resolve(res.data);
          } else {
            reject(res.message);
          }
        })
      })
    }
  },
  modules: {
  }
})
