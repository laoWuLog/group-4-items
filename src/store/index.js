import Vue from 'vue'
import Vuex from 'vuex'
import {
  getUserProfiles
} from '../request/HttpApi'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: null
  },
  mutations: {
    // 修改state里面的userinfo
    updateUserInfo(state, userinfo) {
      state.userinfo = userinfo
    }
  },
  actions: {
    // 处理异步操作
    // getUserInfo(context)
    getUserInfo({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getUserProfiles().then(res => {
          if (res.code === 0) {
            // 把用户信息数据存储到vuex(调用vuex里面的mutations方法updateUesrInfo)
            // context.commit('updateUserInfo', res.data);
            // 第二种方法
            commit('updateUserInfo', res.data);
            resolve(res.data);
          }else{
            reject(res.message)
          }
        })
      })
    }
  },
  modules: {}
})