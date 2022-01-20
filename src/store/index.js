import Vue from "vue";
import Vuex from "vuex";
import { getUserProfiles } from "../request/httpAPI";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,
  },
  mutations: {
    // 获取用户信息
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  // 处理异步的操作
  actions: {
    //解构的写法
    getUserInfo({ commit }) {
      // getUserInfo(content) {

      // 返回promise对象形式
      return new Promise((resolve, reject) => {
        getUserProfiles().then((res) => {
          if (res.code === 0) {
            commit("updateUserInfo", res.data);
            // content.commit("updateUserInfo", res.data);
            resolve();
          } else {
            reject(res.message);
          }
        });
      });
    },
  },
  modules: {},
});
