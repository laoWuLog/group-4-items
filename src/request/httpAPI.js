import request from "./request";
import qs from "qs";

// 精品推荐
export const recommend = () => request.get("/cms/products/recommend"); //没有加{} return省略

// 查看购物车
export const getShopCarts = () =>
  request.get("/cms/shop/carts", {
    headers: { "x-auth-token": "xxx" },
  });

// 用户信息
export const getUserProfiles = () => {
  // return request.get("/cms/shop/userProfiles", {
  //   headers: { "x-auth-token": localStorage.getItem("token") },
  // });
  return request.get("/cms/shop/userProfiles"); //经过axios拦截器,这里不需要写headers
};

// 验证码
export const getSMS = (data) => {
  //注意:加上{}要返回return 不加的话就默认返回undefined
  return request.post("/cms/sendSMS", qs.stringify(data));
};

// 手机号验证码登录(含注册)
export const getPhoneRegin = (data) => {
  //注意:加上{}要返回return 不加的话就默认返回undefined
  return request.post("/cms/phoneRegin", qs.stringify(data));
};

//微信扫码登录
export const wechatPcLogin = (data) => {
 return request.post("/cms/wechatUsers/PCLogin", qs.stringify(data));
};
