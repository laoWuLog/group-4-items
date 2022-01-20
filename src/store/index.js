// import { reject, resolve } from 'core-js/fn/promise'
import Vue from 'vue'
import Vuex from 'vuex'
import {
  getuserProfiles
} from '../request/httpApi'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: null
  },
  mutations: {
    updateUserInfo(state, userinfo) {
      state.userinfo = userinfo
    }
  },
  actions: {
    getUserInfo({commit}){
      return new Promise((resolve,reject)=>{
        getuserProfiles().then(res => {
            if (res.code === 0 ){
              // 把用户数据存储到vuex（调用vuex里面的mutations方法updateUserInfo）
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